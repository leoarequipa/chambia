# ChambIA - Principios de Diseño Simple

## 🎯 Reglas de Oro

### 📱 Mobile-First Absoluto
- **Botones grandes**: Mínimo 60px alto, 44px ancho
- **Thumb zone**: Navegación en zona inferior del teléfono
- **Una mano**: Todo accesible sin usar segunda mano
- **Texto grande**: Mínimo 16px para evitar zoom

### 🗣️ Lenguaje Humano
- **Hablar como persona**: "¿Qué hiciste?" no "Descripción"
- **Español peruano**: "caño" no "tubería", "chamba" no "trabajo"
- **Frases cortas**: Máximo 6 palabras por línea
- **Emoji + texto**: 📸 "Toma foto" en lugar de "Cargar imagen"

### ⚡ Velocidad Extrema
- **< 60 segundos** proceso completo
- **< 2 taps** por acción
- **Feedback inmediato**: Nada de pantallas de carga
- **Sin esperas**: Todo funciona offline hasta conexión

## 🚫 Lo Prohibido

### Formularios
- ❌ Más de 1 campo de texto
- ❌ Selector desplegable de 20 opciones
- ❌ Campos obligatorios no esenciales
- ❌ Validaciones complejas

### Documentación
- ❌ Subir DNI, carnet, licencias
- ❌ Pedir correo electrónico
- ❌ Solicitar número de documento
- ❌ Requerir fotos específicas

### Interfaz
- ❌ Dashboards con gráficos
- ❌ Métricas abstractas ("consistencia 78%")
- ❌ Terminología técnica ("endpoint", "API")
- ❌ Inglés en cualquier parte

## ✅ Lo Obligatorio

### Proceso de Registro
```
📸 Foto + ✍️ ¿Qué hiciste? = ✅ Guardado
```
1. **Foto del trabajo terminado** (obligatorio)
2. **Descripción corta** (1 campo, obligatorio)
3. **Tipo detectado automáticamente** (invisible para usuario)
4. **Guardar** (1 tap)

### Feedback Positivo
```
"Tu reputación subió +0.2 ⭐"
"¡Nueva insignia desbloqueada!"
"Tu perfil se ve más confiable"
```

### Perfil Minimalista
```
👷 Juan Pérez
⭐ 4.8 estrellas
📸 12 trabajos registrados
```

## 🎨 Diseño Visual

### Colores Emocionales
- **Naranja (#FF6B35)**: Confianza, energía, cercanía
- **Verde (#27AE60)**: Éxito, verificado, completo
- **Gris claro (#ECF0F1)**: Fondos, calma
- **Gris oscuro (#2C3E50)**: Texto, seriedad

### Tipografía Clara
- **Títulos**: 24px, bold, oscuro
- **Normal**: 16px, regular, legible
- **Ayuda**: 14px, gris, explicativo

### Espaciado Generoso
- **Botones**: 20px padding vertical
- **Cards**: 16px padding interno
- **Secciones**: 24px margen
- **Íconos**: 8px de separación

## 🔍 Ejemplos Prácticos

### ❌ Versión Compleja
```
Tipo de Trabajo: [Dropdown con 20 opciones]
Zona: [Listado de distritos]
Descripción: [Campo grande con validaciones]
Subir Documento: [Botón para DNI]
Correo Electrónico: [Campo obligatorio]
[Guardar] [Cancelar]
```

### ✅ Versión Simple
```
📸 Foto del trabajo

¿Qué hiciste?
[Arreglé el caño de la cocina]

[✅ Guardar Trabajo]
```

## 📊 Métricas Comprensibles

### ❌ Abstractas
- "Consistencia: 78.4%"
- "Experience score: 45/100"
- "Trust index: moderate"
- "AI confidence: 92%"

### ✅ Humanas
- "⭐ 4.8 estrellas"
- "📸 12 trabajos"
- "🏆 3 insignias"
- "📈 Tu reputación subió"

## 🔄 Flujos de Usuario

### Nuevo Trabajo
```
1. Abrir app (2s)
2. Tap "Registrar Trabajo" (1s)
3. Tap para tomar foto (1s)
4. Escribir "Arreglé caño" (10s)
5. Tap "Guardar" (1s)
6. Ver "Tu reputación subió" (3s)
TOTAL: 18 segundos
```

### Ver Perfil
```
1. Abrir app (2s)
2. Tap "Mi Perfil" (1s)
3. Ver foto, nombre, estrellas, trabajos (instantáneo)
TOTAL: 3 segundos
```

## 📱 Adaptación Android

### Navegación Física
- **Back button**: Regresa a pantalla anterior
- **Menu button**: Acceso rápido a acciones
- **Home button**: Siempre regresa al inicio

### Compatibilidad
- **Android 6+**: Versión mínima soportada
- **2G/3G**: Funciona con conexión lenta
- **Pantallas pequeñas**: Adaptado hasta 4"
- **Memoria limitada**: < 50MB la app

## 🎯 Testing Real

### Preguntas Clave
1. **¿Mi abuela lo puede usar sin ayuda?**
2. **¿Funciona con una mano sosteniendo un bebé?**
3. **¿Se entiende sin leer instrucciones?**
4. **¿Funciona en la calle con el sol?**
5. **¿Sirve si no sé usar apps?**

### Métricas de Éxito
- **Tiempo primer trabajo**: < 2 minutos
- **Tasa de finalización**: > 90%
- **Error de usuario**: < 5%
- **Satisfacción**: > 4.5/5 estrellas

---

ChambIA: Donde la simplicidad genera confianza.