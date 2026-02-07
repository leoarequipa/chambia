# ChambIA - Principios de Diseño y Arquitectura

## 🎯 Reglas de Oro

### 📱 Mobile-First Absoluto
- **Botones grandes**: Mínimo 60px alto, 44px ancho
- **Thumb zone**: Navegación en zona inferior del teléfono
- **Una mano**: Todo accesible sin usar segunda mano
- **Texto grande**: Mínimo 16px para evitar zoom
- **Touch targets**: 48px mínimo recomendado por Material Design

### 🎨 Material Design 3 Nativo
- **Sistema de colores**: Primary, Secondary, Tertiary, Surface
- **Tipografía Roboto**: Escala completa Material (Headline, Title, Body, Label)
- **Elevación**: Sombras y profundidad según Material 3
- **Formas**: Bordes redondeados (12px-28px)
- **Animaciones**: Curvas de easing Material (200-400ms)

### 🗣️ Lenguaje Humano
- **Hablar como persona**: "¿Qué hiciste?" no "Descripción"
- **Español peruano**: "caño" no "tubería", "chamba" no "trabajo"
- **Frases cortas**: Máximo 6 palabras por línea
- **Emoji + texto**: 📸 "Toma foto" en lugar de "Cargar imagen"

### ⚡ Velocidad Extrema
- **< 2 segundos**: Carga inicial desde cache
- **< 2 taps** por acción principal
- **Skeleton screens**: Feedback visual inmediato durante carga
- **Sin esperas**: Cache local + animaciones fluidas

## 🚫 Lo Prohibido

### Formularios
- ❌ Más de 2 campos de texto
- ❌ Selector desplegable de 20 opciones
- ❌ Campos obligatorios no esenciales
- ❌ Validaciones complejas

### Documentación
- ❌ Subir DNI, carnet, licencias
- ❌ Pedir correo electrónico obligatorio
- ❌ Solicitar número de documento
- ❌ Requerir fotos específicas de documentos

### Interfaz
- ❌ Dashboards con gráficos complejos
- ❌ Métricas abstractas ("consistencia 78%")
- ❌ Terminología técnica ("endpoint", "API", "algoritmo")
- ❌ Inglés en cualquier parte visible

### Rendimiento
- ❌ Pantallas de loading sin skeleton
- ❌ Esperas de más de 2 segundos
- ❌ Re-renders innecesarios
- ❌ Carga de imágenes sin lazy loading

## ✅ Lo Obligatorio

### Proceso de Registro Simplificado
```
📸 Foto + ✍️ ¿Qué hiciste? = ✅ Guardado
```
1. **Foto del trabajo** (obligatorio) - Usa cámara nativa
2. **Descripción corta** (1 campo, obligatorio)
3. **Tipo detectado automáticamente** (invisible para usuario)
4. **Guardar** (1 tap)

### Navegación Inferior Fija
```
┌─────────┬─────────┬─────────┬─────────┐
│  🏠    │   ➕    │   📋    │   👤   │
│ Inicio  │  Nuevo  │Historial│ Perfil  │
└─────────┴─────────┴─────────┴─────────┘
```
- Siempre visible en todas las pantallas
- 4 pestañas principales
- Indicador visual de tab activo
- Accesible con una mano

### Feedback Positivo Constante
```
"Tu reputación subió +0.1 ⭐"
"¡Nueva insignia desbloqueada! 🏆"
"Tu perfil se ve más confiable ✨"
```

### Estados de Carga Profesionales
- **Skeleton screens**: En lugar de spinners
- **Stagger animations**: Elementos aparecen secuencialmente
- **Fade in up**: Animación de entrada suave
- **Scale in**: Feedback táctil inmediato

## 🎨 Sistema de Diseño

### Colores Material 3
```css
/* Primarios */
--md-sys-color-primary: #6750A4;
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #EADDFF;
--md-sys-color-on-primary-container: #21005D;

/* Secundarios */
--md-sys-color-secondary: #625B71;
--md-sys-color-secondary-container: #E8DEF8;

/* Superficies */
--md-sys-color-surface: #FEF7FF;
--md-sys-color-surface-variant: #E7E0EC;
--md-sys-color-background: #FEF7FF;
```

### Tipografía Material
```css
/* Headlines */
.md-headline-small { font-size: 24px; line-height: 32px; }

/* Titles */
.md-title-large { font-size: 22px; line-height: 28px; }
.md-title-medium { font-size: 16px; line-height: 24px; }

/* Body */
.md-body-large { font-size: 16px; line-height: 24px; }
.md-body-medium { font-size: 14px; line-height: 20px; }

/* Labels */
.md-label-large { font-size: 14px; line-height: 20px; font-weight: 500; }
```

### Componentes Nativos
- **Buttons**: Filled, Tonal, Outlined, Text, Elevated
- **FAB**: Floating Action Button para acciones principales
- **Cards**: Elevated, Filled, Outlined
- **Navigation Bar**: Inferior fija tipo Material 3
- **Top App Bar**: Con navegación y título

### Animaciones Profesionales
```css
/* Entrada suave */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Escalado */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Stagger delays */
.stagger-1 { animation-delay: 50ms; }
.stagger-2 { animation-delay: 100ms; }
.stagger-3 { animation-delay: 150ms; }
```

## 🎯 Arquitectura de Componentes

### Estructura de Carpetas
```
src/
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Home
│   ├── register-work/     # Registro
│   ├── profile/           # Perfil
│   ├── history/           # Historial
│   └── globals.css        # Estilos globales
├── components/
│   ├── ui/                # Componentes UI
│   │   ├── Button.tsx
│   │   ├── Skeleton.tsx   # Skeleton screens
│   │   └── Camera.tsx     # Cámara nativa
│   └── layout/
│       └── BottomNav.tsx  # Navegación inferior
├── lib/
│   ├── permissions.ts     # Gestión de permisos
│   ├── intelligence.ts    # Sistema de reputación
│   └── data.ts           # Datos y estructuras
```

### Patrones de Componentes
```typescript
// Componentes memoizados para rendimiento
const WorkCard = memo(function WorkCard({ trabajo, index }) {
  return (
    <div className={`animate-fade-in-up stagger-${index}`}>
      {/* Contenido */}
    </div>
  );
});

// Iconos como componentes memoizados
const CameraIcon = memo(() => (
  <svg>{/* ... */}</svg>
));
```

## 📊 Métricas Comprensibles

### ❌ Abstractas (Prohibido)
- "Consistencia: 78.4%"
- "Experience score: 45/100"
- "Trust index: moderate"
- "AI confidence: 92%"

### ✅ Humanas (Obligatorio)
- "⭐ 4.8 estrellas"
- "📸 12 trabajos"
- "🏆 3 insignias"
- "📈 Tu reputación subió"

## 🔄 Flujos de Usuario

### Nuevo Trabajo (Optimizado)
```
1. Abrir app (instantáneo desde cache)
2. Tap "Nuevo" en navegación inferior (1s)
3. Pantalla educativa de permisos (solo primera vez)
4. Cámara nativa de Android se abre (2s)
5. Tomar foto y confirmar (3s)
6. Escribir descripción corta (10s)
7. Tap "Guardar" (1s)
8. Ver animación de éxito (2s)
TOTAL: ~20 segundos
```

### Ver Perfil
```
1. Abrir app (instantáneo)
2. Tap "Perfil" en navegación (1s)
3. Ver datos con animaciones suaves (instantáneo)
TOTAL: 1 segundo
```

## 📱 Adaptación Android Nativa

### Navegación
- **Bottom Navigation Bar**: Fija en todas las pantallas
- **Back button**: Regresa a pantalla anterior
- **Tabs**: 4 secciones principales accesibles siempre

### Compatibilidad
- **Android 7.0+**: API 24 y superiores
- **Material Design 3**: Interfaz nativa moderna
- **Safe areas**: Soporte para notch y bordes redondeados
- **Memoria**: < 100MB RAM en uso

### Permisos Nativos
- **Cámara**: Acceso real al hardware de cámara
- **Almacenamiento**: Lectura de galería
- **Micrófono**: Opcional para videos futuros
- **Ubicación**: Opcional para geolocalización

## 🎯 Testing y Calidad

### Preguntas Clave
1. **¿Mi abuela lo puede usar sin ayuda?**
2. **¿Funciona con una mano sosteniendo herramientas?**
3. **¿Se entiende sin leer instrucciones?**
4. **¿Funciona en la calle con el sol brillante?**
5. **¿Sirve si no sé usar apps complejas?**

### Métricas de Éxito
- **Tiempo primer trabajo**: < 2 minutos
- **Tasa de finalización**: > 90%
- **Error de usuario**: < 5%
- **Satisfacción**: > 4.5/5 estrellas
- **Carga inicial**: < 2 segundos

## 🔧 Optimizaciones Implementadas

### Rendimiento
- ✅ Componentes memoizados (React.memo)
- ✅ Lazy loading de imágenes
- ✅ Cache local (localStorage)
- ✅ Animaciones GPU-accelerated
- ✅ Código splitting automático

### UX/UI
- ✅ Skeleton screens durante carga
- ✅ Animaciones escalonadas (stagger)
- ✅ Feedback táctil inmediato
- ✅ Transiciones suaves 60fps
- ✅ Estados de error amigables

---

**ChambIA**: Donde la simplicidad, el diseño nativo y el rendimiento generan confianza.

**Filosofía**: La mejor app es la que no necesita explicaciones.
