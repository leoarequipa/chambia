# ChambIA - Aplicación Móvil para Trabajadores Informales

ChambIA es una aplicación móvil completa (PWA + APK Android) diseñada para trabajadores informales en Arequipa. Ayuda a construir reputación profesional registrando trabajos con fotos y mejorando el perfil automáticamente.

## 📱 Características Principales

### ✅ Funcionalidad Completa Implementada
- **🎨 Material Design 3**: Interfaz nativa de Android moderna
- **📸 Cámara Nativa**: Usa el plugin `@capacitor/camera` para captura real
- **🔐 Sistema de Permisos**: Gestión completa de permisos Android
- **⚡ Rendimiento Profesional**: Skeleton screens, animaciones 60fps, cache local
- **🧭 Navegación Inferior**: Barra fija tipo apps profesionales (Instagram/WhatsApp)
- **📊 Sistema de Reputación**: Perfil mejora automáticamente con cada trabajo
- **🏆 Insignias**: Recompensas por hitos alcanzados
- **💾 Offline**: Funciona sin conexión a internet

## 🚀 Instalación Rápida

### Opción 1: PWA (Web)
1. Abrir https://chambia.app en Chrome/Safari
2. Tocar "Añadir a pantalla de inicio"
3. ¡Listo! Funciona como app nativa

### Opción 2: APK Android (Nativa)
```bash
# Build y generar APK
./build-apk.sh

# Instalar en dispositivo
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 📋 Requisitos

### Para Desarrollo
- **Node.js**: 18.x o superior
- **npm**: 9.x o superior
- **Android SDK**: API 24+ (Android 7.0+)
- **JDK**: OpenJDK 21

### Para Usuarios
- **Android**: 7.0+ (API 24)
- **iOS**: 13.4+ (Safari)
- **Navegadores**: Chrome 80+, Safari 13.4+
- **Conexión**: Opcional (funciona offline)

## 🛠️ Configuración del Entorno

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar JDK (si no está instalado)
```bash
# Descargar OpenJDK 21
wget https://download.java.net/openjdk/jdk21/ri/openjdk-21+35_linux-x64_bin.tar.gz
tar -xzf openjdk-21+35_linux-x64_bin.tar.gz
export JAVA_HOME=$HOME/jdk-21
export PATH=$JAVA_HOME/bin:$PATH
```

### 3. Configurar Android SDK
```bash
# Crear archivo local.properties
echo "sdk.dir=/home/leono/Android/Sdk" > android/local.properties
```

## 📱 Uso

### Para Usuarios Finales
```
1. Abrir app
2. Tap en "Nuevo" (botón +)
3. Permitir acceso a cámara
4. Tomar foto del trabajo
5. Describir qué hiciste
6. Guardar
7. ¡Ver tu reputación subir!
```

### Flujo Principal
- **🏠 Inicio**: Dashboard con resumen del perfil
- **➕ Nuevo**: Registrar trabajo con foto y descripción
- **📋 Historial**: Lista completa de trabajos
- **👤 Perfil**: Información detallada y estadísticas

## 🏗️ Arquitectura del Proyecto

```
chambia/
├── android/                      # Proyecto Android nativo
│   ├── app/src/main/
│   │   ├── AndroidManifest.xml  # Permisos y configuración
│   │   └── java/com/chambia/app/
│   └── build.gradle
├── src/
│   ├── app/                     # Páginas Next.js
│   │   ├── page.tsx            # Home
│   │   ├── register-work/      # Registro de trabajos
│   │   ├── profile/            # Perfil de usuario
│   │   ├── history/            # Historial
│   │   ├── employer-view/      # Vista para empleadores
│   │   └── globals.css         # Estilos globales Material 3
│   ├── components/
│   │   ├── ui/                 # Componentes UI
│   │   │   ├── Button.tsx      # Botones Material 3
│   │   │   ├── Skeleton.tsx    # Skeleton screens
│   │   │   └── Camera.tsx      # Cámara nativa
│   │   └── layout/
│   │       └── BottomNav.tsx   # Navegación inferior
│   └── lib/
│       ├── permissions.ts       # Gestión de permisos Android
│       ├── intelligence.ts      # Sistema de reputación
│       └── data.ts             # Datos y estructuras
├── public/
│   ├── manifest.json           # Configuración PWA
│   ├── sw.js                   # Service Worker
│   └── icons/                  # Iconos PWA
├── capacitor.config.ts         # Configuración Capacitor
├── next.config.ts             # Configuración Next.js
└── build-apk.sh               # Script de build automático
```

## 🎨 Sistema de Diseño

### Material Design 3
- **Colores**: Sistema completo (Primary, Secondary, Tertiary, Surface)
- **Tipografía**: Roboto con escala Material
- **Componentes**: Buttons, FAB, Cards, Navigation Bar
- **Animaciones**: 60fps con curvas Material

### Paleta de Colores
```css
--md-sys-color-primary: #6750A4;
--md-sys-color-secondary: #625B71;
--md-sys-color-tertiary: #7D5260;
--md-sys-color-surface: #FEF7FF;
--md-sys-color-background: #FEF7FF;
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo

# Build
npm run build            # Build producción
./build-apk.sh           # Generar APK Android

# Capacitor
npx cap sync android     # Sincronizar con Android
npx cap open android     # Abrir en Android Studio

# Calidad
npm run lint             # ESLint
npm run type-check       # TypeScript
```

## 📦 Dependencias Principales

### Framework
- **Next.js**: 16.1.6 (React framework)
- **React**: 19.2.3
- **TypeScript**: 5.x

### UI y Estilos
- **Tailwind CSS**: 4.x
- **Material Design 3**: Implementación completa

### Capacitor (Nativo)
```json
{
  "@capacitor/camera": "^8.0.0",      // Cámara nativa
  "@capacitor/device": "^8.0.0",      // Información del dispositivo
  "@capacitor/splash-screen": "^8.0.0" // Pantalla de inicio
}
```

## 🔐 Permisos de Android

### Configurados en AndroidManifest.xml
```xml
<!-- Cámara -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="true" />

<!-- Almacenamiento -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />

<!-- Micrófono -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<!-- Ubicación -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Notificaciones -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

## 🎯 Sistema de Reputación

### Cómo Funciona
1. **Usuario registra trabajo**: Foto + descripción corta
2. **Detección automática**: IA identifica tipo de trabajo
3. **Cálculo instantáneo**: +0.1 estrellas por trabajo
4. **Insignias**: Desbloqueadas por hitos (5, 10 trabajos...)
5. **Cache local**: Datos guardados en localStorage

### Mensajes al Usuario
- "¡Excelente trabajo! Tu reputación está subiendo ⭐"
- "¡Nueva insignia desbloqueada! 🏆"
- "Tu perfil se ve más confiable cada día ✨"

## 📊 Rendimiento

### Métricas
- **Tiempo de carga**: < 2 segundos
- **Animaciones**: 60fps
- **Tamaño APK**: ~8.7 MB
- **Memoria**: < 100 MB RAM
- **Compatibilidad**: Android 7.0+

### Optimizaciones
- ✅ Componentes memoizados (React.memo)
- ✅ Skeleton screens
- ✅ Lazy loading de imágenes
- ✅ Cache local (localStorage)
- ✅ Animaciones GPU-accelerated

## 🚀 Deploy

### Vercel (PWA)
```bash
npm run build
vercel --prod
```

### APK (Android)
```bash
# Build completo
./build-apk.sh

# APK generado en:
android/app/build/outputs/apk/debug/app-debug.apk
```

## 📝 Documentación Adicional

- **[APK-Android.md](APK-Android.md)**: Guía completa de generación de APK
- **[INTELIGENCIA.md](INTELIGENCIA.md)**: Sistema de reputación e IA
- **[PRINCIPIOS.md](PRINCIPIOS.md)**: Principios de diseño y arquitectura
- **[PWA.md](PWA.md)**: Características y optimizaciones PWA

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Material Design**: Sistema de diseño de Google
- **Capacitor**: Framework de apps híbridas
- **Next.js**: Framework de React
- **Tailwind CSS**: Framework de CSS utilitario

---

**ChambIA**: Donde tu trabajo genera confianza.

**Versión**: 1.0.0  
**Fecha**: 2025  
**Autor**: ChambIA Team

---

<p align="center">
  <strong>⭐ Star este repo si te es útil ⭐</strong>
</p>
