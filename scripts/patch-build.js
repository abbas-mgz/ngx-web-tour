const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/ngx-web-tour');

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove extra generic arguments for Angular 13 compatibility
  // For Components: ɵɵComponentDeclaration<..., never, false, never> -> ɵɵComponentDeclaration<..., never>
  content = content.replace(/, false, never>;/g, '>;');
  
  // For Directives: ɵɵDirectiveDeclaration<..., never, never, false, never> -> ɵɵDirectiveDeclaration<..., never>
  // Note: The exact pattern might vary, so we look for the tail end of the generics
  content = content.replace(/, never, false, never>;/g, '>;');

  // 2. Fix Input definitions: { "alias": "name", "required": false } -> "name"
  // Pattern: "propName": { "alias": "aliasName", "required": ... }
  // We want: "propName": "aliasName"
  const inputPattern = /"([^"]+)":\s*{\s*"alias":\s*"([^"]+)",\s*"required":\s*[^}]+\s*}/g;
  content = content.replace(inputPattern, '"$1": "$2"');

  // 3. Ensure semicolons are present for properties in the type definition
  // The previous replacement might leave "prop": "alias" without a semicolon if it wasn't there or if we stripped it.
  // However, usually in .d.ts these are inside an object literal type, so they should be separated by semicolons or commas.
  // Angular 13 expects: { "prop": "alias"; ... }
  
  // Let's look for "prop": "alias" followed by a closing brace or another quote, and ensure it has a semicolon.
  // Actually, a safer way is to just replace "key": "value" with "key": "value"; globally within the context of these declarations,
  // but that's risky.
  
  // Let's refine the input replacement to include the semicolon directly.
  // The original code was likely: { "prop": { ... }; "prop2": { ... }; }
  // So replacing the object with the string should preserve the trailing punctuation if we are careful.
  // But my regex didn't capture the trailing punctuation.
  
  // Let's try to be more specific.
  // If we have: "tour": { "alias": "tour"; "required": false; };
  // We want: "tour": "tour";
  
  // The previous sed command was: s/: { "alias": "\([^"]*\)"; "required": [^}]* };/: "\1"/g
  // This matched the trailing }; and replaced it with just the alias string, missing the semicolon.
  
  // So let's do this:
  content = content.replace(/"([^"]+)":\s*{\s*"alias":\s*"([^"]+)",\s*"required":\s*[^}]+}/g, '"$1": "$2"');
  
  // Now we might have "prop": "alias"; or "prop": "alias" depending on the original file.
  // Let's ensure we have semicolons.
  // Find "prop": "alias" that is NOT followed by a semicolon.
  content = content.replace(/"([^"]+)":\s*"([^"]+)"(?!\s*;)/g, '"$1": "$2";');

  // 4. Fix double semicolons if any were introduced
  content = content.replace(/;;/g, ';');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${path.basename(filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.d.ts')) {
      patchFile(filePath);
    }
  });
}

console.log('Patching build artifacts for Angular 13 compatibility...');
if (fs.existsSync(distPath)) {
  walkDir(distPath);
  console.log('Patching complete.');
} else {
  console.error(`Dist directory not found: ${distPath}`);
  process.exit(1);
}
