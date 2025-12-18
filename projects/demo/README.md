# NgxWebTour Demo Application

This is a demo application showcasing the **ngx-web-tour** library features.

## 🚀 Running the Demo

### 1. Build the Library First

```bash
npm run build
```

This will build the library to `dist/ngx-web-tour`.

### 2. Start the Demo Server

```bash
ng serve demo --open
```

Or simply:

```bash
npm start
```

The demo will automatically open in your browser at `http://localhost:4200/`

## 🎯 What's Included

The demo application showcases:

### Welcome Tour
- Basic tour functionality
- Multiple step navigation
- Auto-positioning
- Progress tracking

### Features Tour
- Advanced positioning options
- Backdrop and highlight
- Custom button text
- State management
- RxJS observables

## 🎨 Features Demonstrated

1. **Smart Positioning** - Auto-detects best tooltip position
2. **Backdrop Highlight** - Dark overlay with element highlight
3. **Progress Tracking** - Visual progress bar
4. **Navigation Controls** - Next, Previous, Done buttons
5. **State Management** - Track tour state in real-time
6. **Responsive Design** - Works on all screen sizes
7. **Custom Configuration** - Customizable buttons and behavior

## 📝 Code Structure

```
projects/demo/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Main component with tour logic
│   │   ├── app.component.html    # Demo template with tour steps
│   │   ├── app.component.scss    # Styles for demo
│   │   └── app.config.ts         # App configuration
│   ├── index.html                # Main HTML file
│   └── main.ts                   # Bootstrap file
```

## 🔧 How It Works

### 1. Import the Library

```typescript
import { TourDirective, TourService } from 'ngx-web-tour';
```

### 2. Add Tour Steps

```html
<div
  tour="welcome-tour"
  tourTitle="Welcome!"
  tourText="This is a tour step"
  [tourPriority]="1"
>
  Content
</div>
```

### 3. Start the Tour

```typescript
this.tourService.start('welcome-tour');
```

## 🎮 Interactive Controls

The demo provides buttons to:
- **Start Welcome Tour** - Basic tour example
- **Start Features Tour** - Advanced features showcase
- **End Tour** - Manually end the current tour
- **View Tour Status** - Real-time state tracking

## 💡 Try It Yourself

1. Click "Start Welcome Tour" or "Start Features Tour"
2. Follow the tooltips by clicking "Next"
3. Go back with "Previous"
4. Notice the backdrop highlighting
5. Watch the progress bar
6. Try clicking the close button
7. End the tour anytime

## 🛠️ Customization

You can customize the demo by:

1. **Adding New Tours**
   ```html
   <div tour="my-custom-tour" tourText="..." [tourPriority]="1">
   ```

2. **Changing Configuration**
   ```typescript
   this.tourService.configure({
     backdrop: true,
     backdropColor: 'rgba(0, 0, 0, 0.7)',
     // ... more options
   });
   ```

3. **Modifying Styles**
   Edit `app.component.scss` to change the demo appearance

## 📱 Responsive Testing

To test on different screen sizes:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select different device sizes
4. Notice how tooltips auto-position

## 🐛 Troubleshooting

### Port Already in Use
```bash
ng serve demo --port 4201
```

### Library Not Found
Make sure you've built the library first:
```bash
npm run build
```

### Changes Not Reflecting
If you modify the library, rebuild it:
```bash
npm run build
ng serve demo
```

## 📚 Learn More

- [Main Documentation](../../README.md)
- [Library README](../ngx-web-tour/README.md)
- [Examples](../../EXAMPLES.md)
- [API Documentation](../ngx-web-tour/README.md)

## 🎉 Have Fun!

Explore the demo, try different features, and see how easy it is to create beautiful product tours with ngx-web-tour!
