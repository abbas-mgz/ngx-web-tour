# Angular Compatibility Guide

## Supported Versions

**ngx-web-tour** is compatible with Angular versions **13.0.0 and above**.

## Version Matrix

| ngx-web-tour | Angular | RxJS | TypeScript |
|--------------|---------|------|------------|
| 1.0.0+ | 13.0.0+ | 6.5.0+ or 7.0.0+ | 4.4+ |

## Tested Versions

The library has been tested with:
- ✅ Angular 13.x
- ✅ Angular 14.x
- ✅ Angular 15.x
- ✅ Angular 16.x
- ✅ Angular 17.x
- ✅ Angular 18.x
- ✅ Angular 19.x

## Why Angular 13+?

Angular 13 introduced:
- Improved Ivy compilation
- Better standalone components support (Angular 14+)
- Modern TypeScript features
- Enhanced performance

Our library uses modern Angular features while maintaining backward compatibility with Angular 13+.

## Migration from Older Angular Versions

If you're using Angular 12 or below, you'll need to upgrade your Angular version first:

```bash
# Upgrade to Angular 13
ng update @angular/core@13 @angular/cli@13

# Then install ngx-web-tour
npm install ngx-web-tour
```

## RxJS Compatibility

- **RxJS 6.5.0+**: Fully supported
- **RxJS 7.x**: Fully supported (recommended)
- **RxJS 8.x**: Compatible (if used with Angular 16+)

## TypeScript Compatibility

- Minimum: TypeScript 4.4
- Recommended: TypeScript 4.8+ (for Angular 15+)
- Maximum: TypeScript 5.7+ (for Angular 19+)

## Package Manager Support

Works with:
- npm 6+
- yarn 1.x or 2.x+
- pnpm 6+

## Installation Examples

### Angular 13-14
```bash
npm install ngx-web-tour
```

### Angular 15+
```bash
npm install ngx-web-tour
```

### Angular 17+ (Standalone)
```typescript
// You can use it with standalone components
import { TourDirective } from 'ngx-web-tour';

@Component({
  standalone: true,
  imports: [TourDirective],
  // ...
})
```

## Known Issues

### None currently reported

If you encounter any compatibility issues, please [report them on GitHub](https://github.com/yourusername/ngx-web-tour/issues).

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Feature Availability by Version

All features are available in Angular 13+:

- ✅ Basic Tour
- ✅ Tooltip Component
- ✅ Backdrop Highlight
- ✅ Auto-positioning
- ✅ Progress Tracking
- ✅ State Management
- ✅ Multiple Tours
- ✅ Responsive Design
- ✅ Custom Configuration

## Tips for Older Angular Versions

If using **Angular 13-14**, note that:
- Standalone components are not available (use NgModule)
- Some TypeScript features may require polyfills

If using **Angular 15+**, you can:
- Use standalone components
- Take advantage of improved tree-shaking
- Benefit from faster compilation

## Future Compatibility

We are committed to:
- Supporting new Angular versions as they release
- Maintaining backward compatibility with Angular 13+
- Following Angular's best practices and recommendations

## Support

For version-specific issues:
1. Check this compatibility guide
2. Review the [documentation](./README.md)
3. Search [existing issues](https://github.com/yourusername/ngx-web-tour/issues)
4. Create a new issue with version details
