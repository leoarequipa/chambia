# ChambIA APK Android - Guía Completa

Para generar un APK Android desde ChambIA (Next.js), necesitamos usar herramientas que conviertan la web app en una aplicación nativa.

## 🎯 Opciones Principales

### 1. **Capacitor (Recomendado)**
- ✅ Framework oficial de Ionic
- ✅ Compatible con Next.js
- ✅ Genera APK y AAB
- ✅ Soporte completo Android

### 2. **Cordova/PhoneGap**
- ✅ Clásico y probado
- ⚠️ Más complicado con Next.js
- ⚠️ Menos moderno

### 3. **PWA2APK**
- ✅ Simple y rápido
- ⚠️ Limitado en funcionalidades
- ⚠️ No es realmente nativo

---

## 🚀 Método 1: Capacitor (Recomendado)

### Paso 1: Instalar Capacitor
```bash
cd chambia-nextjs
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Paso 2: Inicializar Capacitor
```bash
npx cap init "ChambIA" "com.chambia.app"
```

### Paso 3: Construir la app
```bash
npm run build
```

### Paso 4: Agregar plataforma Android
```bash
npx cap add android
```

### Paso 5: Configurar Capacitor

Crear `capacitor.config.ts`:
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chambia.app',
  appName: 'ChambIA',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
```

### Paso 6: Sincronizar con Android
```bash
npx cap sync android
```

### Paso 7: Abrir Android Studio
```bash
npx cap open android
```

### Paso 8: Generar APK desde Android Studio
1. **Build → Generate Signed Bundle / APK**
2. **Seleccionar APK**
3. **Crear o usar keystore existente**
4. **Seleccionar release**
5. **Generar**

---

## 🛠️ Configuración Adicional

### Modificar `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "build:android": "npm run build && npx cap sync android",
    "run:android": "npx cap run android",
    "open:android": "npx cap open android"
  }
}
```

### Modificar `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: './'
};

export default nextConfig;
```

---

## 📱 Requisitos para APK

### Android Studio
- **Descargar**: https://developer.android.com/studio
- **SDK requerido**: API Level 24+ (Android 7.0+)
- **Java**: JDK 11 o superior

### Variables de Entorno
```bash
# Para Windows
set ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

# Para macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

---

## 🚀 Método 2: PWA2APK (Más Simple)

### Paso 1: Instalar PWA2APK
```bash
npm install -g pwa2apk
```

### Paso 2: Generar APK
```bash
pwa2apk build \
  --name "ChambIA" \
  --package-name "com.chambia.app" \
  --source "http://localhost:3000" \
  --icon "public/icons/icon-512x512.png" \
  --orientation portrait
```

### Limitaciones de PWA2APK
- ⚠️ Solo envuelve la web app
- ⚠️ Sin acceso a APIs nativas
- ⚠️ Rendimiento inferior
- ⚠️ Menos control sobre la experiencia

---

## 📱 Permisos Android

### Agregar a `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

---

## 🔧 Optimizaciones para APK

### 1. Reducir tamaño del APK
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  // ... otras configuraciones
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF6B35"
    }
  }
};
```

### 2. Modo offline
```javascript
// En service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('chambia-v1').then(cache => {
      return cache.addAll([
        '/',
        '/register-work',
        '/profile',
        '/history'
      ]);
    })
  );
});
```

---

## 📊 Build Types

### APK (Debug)
- ✅ Rápido de generar
- ✅ Para testing
- ⚠️ No para Play Store

### APK (Release)
- ✅ Optimizado
- ✅ Listo para distribución
- ⚠️ Requiere keystore

### AAB (Android App Bundle)
- ✅ Recomendado para Play Store
- ✅ Tamaño menor
- ✅ Optimización dinámica

---

## 🚀 Proceso Completo

```bash
# 1. Preparar proyecto
cd chambia-nextjs
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Inicializar
npx cap init "ChambIA" "com.chambia.app"

# 3. Construir web app
npm run build

# 4. Agregar plataforma
npx cap add android

# 5. Sincronizar
npx cap sync android

# 6. Abrir Android Studio
npx cap open android

# 7. En Android Studio:
# Build → Generate Signed Bundle / APK → APK → Release
```

---

## 🎯 Resultados

### APK Generado Contendrá:
- 📱 **WebView** con la web app de ChambIA
- 📸 **Acceso a cámara** para fotos
- 💾 **Storage local** para datos offline
- 🔔 **Notificaciones** (si implementa)
- 🎨 **Icono personalizado** 🛠️

### Ventajas del APK:
- ✅ **Sin navegador**: Experiencia más nativa
- ✅ **Play Store**: Se puede publicar
- ✅ **Offline completo**: Mayor control
- ✅ **Integración**: Comparte con otras apps

---

## 🔄 Actualizaciones

### Para actualizar el APK:
```bash
# 1. Modificar código
# 2. Reconstruir web app
npm run build

# 3. Sincronizar cambios
npx cap sync android

# 4. Generar nuevo APK
npx cap open android
# Build → Generate Signed Bundle / APK
```

---

## ⚠️ Consideraciones Importantes

### Seguridad
- 🔐 Usar keystore seguro
- 🔐 No subir keys a repositorios
- 🔐 Firmar siempre con misma clave

### Play Store
- 📋 Política de privacidad requerida
- 📋 Contenido apropiado
- 📋 Cumplir guidelines

### Testing
- 🧪 Probar en múltiples dispositivos
- 🧪 Verificar permisos
- 🧪 Testear funcionalidad offline

---

**Recomendación**: Usar **Capacitor** para el mejor balance entre facilidad de desarrollo y funcionalidad nativa.