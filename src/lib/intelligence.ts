import { TrabajoAnalizado, AnalysisResult, analizarTrabajoCompletamente } from '@/lib/analyzer'
import { saveToStorage, getFromStorage, STORAGE_KEYS } from '@/lib/storage'

// Tipos para datos persistidos
interface TrabajoPersistido {
  tipo: string
  descripcion: string
  fecha: string
  imagen?: string
}

interface PerfilPersistido {
  nombre: string
  reputacion: number
  consistencia: number
  experiencia: number
  insignias: string[]
  totalTrabajos: number
  telefono?: string
  oficio?: string
  avatar?: string
}

// Valores por defecto
const DEFAULT_PERFIL: PerfilPersistido = {
  nombre: 'Juan Pérez',
  reputacion: 3.5,
  consistencia: 0,
  experiencia: 0,
  insignias: [],
  totalTrabajos: 0,
  telefono: '+51 999 888 777',
  oficio: 'Gasfitero Profesional',
  avatar: '',
}

const DEFAULT_TRABAJOS: TrabajoPersistido[] = [
  {
    tipo: 'Gasfitería',
    descripcion: 'Instalación de caño de agua en cocina',
    fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    tipo: 'Gasfitería',
    descripcion: 'Reparación de fuga en baño',
    fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    tipo: 'Construcción',
    descripcion: 'Levantado de muro en patio',
    fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Variables en memoria (se inicializan desde localStorage)
let trabajosAnterioresReales: TrabajoPersistido[] = []
let perfilReal: PerfilPersistido = { ...DEFAULT_PERFIL }
let isInitialized = false

/**
 * Inicializa los datos desde localStorage
 * Debe llamarse al iniciar la app
 */
export function inicializarDatos(): void {
  if (isInitialized) return
  
  try {
    // Cargar perfil
    perfilReal = getFromStorage<PerfilPersistido>(STORAGE_KEYS.PERFIL_REAL, DEFAULT_PERFIL)
    
    // Cargar trabajos
    const trabajosGuardados = getFromStorage<TrabajoPersistido[]>(STORAGE_KEYS.TRABAJOS_ANALIZADOS, [])
    
    // Si no hay trabajos guardados, usar los por defecto
    if (trabajosGuardados.length === 0) {
      trabajosAnterioresReales = [...DEFAULT_TRABAJOS]
      guardarTrabajos()
    } else {
      trabajosAnterioresReales = trabajosGuardados
    }
    
    isInitialized = true
    console.log('✅ Datos inicializados desde localStorage')
  } catch (error) {
    console.error('Error inicializando datos:', error)
    // Fallback a valores por defecto
    trabajosAnterioresReales = [...DEFAULT_TRABAJOS]
    perfilReal = { ...DEFAULT_PERFIL }
  }
}

/**
 * Guarda el perfil en localStorage
 */
function guardarPerfil(): void {
  saveToStorage(STORAGE_KEYS.PERFIL_REAL, perfilReal)
}

/**
 * Guarda los trabajos en localStorage
 */
function guardarTrabajos(): void {
  saveToStorage(STORAGE_KEYS.TRABAJOS_ANALIZADOS, trabajosAnterioresReales)
}

/**
 * Actualiza el perfil del trabajador
 */
export function actualizarPerfil(datos: Partial<PerfilPersistido>): void {
  inicializarDatos()
  perfilReal = { ...perfilReal, ...datos }
  guardarPerfil()
}

/**
 * Obtiene todos los trabajos registrados
 */
export function obtenerTrabajos(): TrabajoPersistido[] {
  inicializarDatos()
  return [...trabajosAnterioresReales].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  )
}

// Analiza nuevo trabajo basado en hechos reales
export async function analizarNuevoTrabajo(datosTrabajo: {
  titulo: string
  descripcion: string
  tipo: string
  imagen: string
}): Promise<{
  resultado: AnalysisResult
  nuevaReputacion: number
  insigniaDesbloqueada?: string
  mensajeMotivador: string[]
}> {
  inicializarDatos()
  
  // Preparar análisis con datos reales
  const trabajoAnalizado: TrabajoAnalizado = {
    titulo: datosTrabajo.titulo,
    descripcion: datosTrabajo.descripcion,
    imagen: datosTrabajo.imagen,
    tipoSeleccionado: datosTrabajo.tipo,
    trabajosAnteriores: trabajosAnterioresReales
  }

  // Analizar completamente
  const { resultado, analisisImagen } = await analizarTrabajoCompletamente(trabajoAnalizado)

  // Actualizar reputación basado en hechos
  const reputacionAnterior = perfilReal.reputacion
  perfilReal.reputacion = Math.min(5.0, perfilReal.reputacion + resultado.mejoraReputacion)
  perfilReal.consistencia = resultado.consistencia
  perfilReal.experiencia = resultado.experiencia
  perfilReal.totalTrabajos += 1

  // Añadir insignia si se ganó
  if (resultado.nuevaInsignia) {
    if (!perfilReal.insignias.includes(resultado.nuevaInsignia)) {
      perfilReal.insignias.push(resultado.nuevaInsignia)
    }
  }
  
  // Guardar perfil actualizado
  guardarPerfil()

  // Agregar trabajo real al historial
  trabajosAnterioresReales.push({
    tipo: datosTrabajo.tipo,
    descripcion: datosTrabajo.descripcion,
    fecha: new Date().toISOString(),
    imagen: datosTrabajo.imagen,
  })
  
  // Guardar trabajos actualizados
  guardarTrabajos()

  // Generar mensajes motivacionales basados en hechos reales
  const mensajes = generarMensajesPositivos(resultado, analisisImagen, reputacionAnterior)

  return {
    resultado,
    nuevaReputacion: perfilReal.reputacion,
    insigniaDesbloqueada: resultado.nuevaInsignia,
    mensajeMotivador: mensajes
  }
}

// Genera mensajes positivos basados en hechos reales
function generarMensajesPositivos(resultado: AnalysisResult, analisisImagen: any, reputacionAnterior: number): string[] {
  const mensajes: string[] = []

  // Mensaje sobre mejora real de reputación
  if (resultado.mejoraReputacion > 0.05) {
    mensajes.push("📈 Tu reputación está creciendo más rápido que antes")
  } else if (resultado.mejoraReputacion > 0.02) {
    mensajes.push("⭐ Tu trabajo está construyendo confianza en tu perfil")
  }

  // Mensaje sobre consistencia real
  if (resultado.consistencia > 80) {
    mensajes.push("🎯 Muy consistente en tu oficio, los empleadores lo notarán")
  } else if (resultado.consistencia > 60) {
    mensajes.push("🔧 Vamos bien, mantén el mismo tipo de trabajos para crecer más rápido")
  }

  // Mensaje sobre experiencia real
  if (resultado.experiencia > 70) {
    mensajes.push("👷 Tienes experiencia acumulada considerable")
  } else if (resultado.experiencia > 40) {
    mensajes.push("📊 Tu experiencia está creciendo con cada trabajo")
  }

  // Mensaje sobre imagen (basado en análisis real)
  if (analisisImagen.puntajeCalidad > 80) {
    mensajes.push("📸 Excelente calidad de foto, ayuda mucho")
  }

  // Mensaje sobre tipo detectado real
  if (resultado.tipoDetectado && resultado.tipoDetectado !== "Trabajo") {
    mensajes.push(`✅ Detectamos que es trabajo de ${resultado.tipoDetectado.toLowerCase()}`)
  }

  return mensajes
}

// Obtener perfil actualizado
export function obtenerPerfilActual() {
  inicializarDatos()
  return { ...perfilReal }
}

// Obtener trabajos para mostrar en formato Work
export function obtenerTrabajosComoWorks() {
  inicializarDatos()
  
  return trabajosAnterioresReales.map((trabajo, index) => ({
    id: `work_${index}_${Date.now()}`,
    title: trabajo.tipo,
    description: trabajo.descripcion,
    type: trabajo.tipo,
    zone: 'Arequipa',
    image: trabajo.imagen || '/images/work-placeholder.jpg',
    date: formatearFecha(trabajo.fecha),
    status: 'completed' as const,
  }))
}

// Formatear fecha relativa
function formatearFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO)
  const ahora = new Date()
  const diffTiempo = ahora.getTime() - fecha.getTime()
  const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24))
  
  if (diffDias === 0) return 'Hoy'
  if (diffDias === 1) return 'Ayer'
  if (diffDias < 7) return `Hace ${diffDias} días`
  if (diffDias < 30) return `Hace ${Math.floor(diffDias / 7)} semanas`
  
  return fecha.toLocaleDateString('es-PE', { 
    day: 'numeric', 
    month: 'short',
    year: diffDias > 365 ? 'numeric' : undefined
  })
}

// Simular progreso real de tiempo
export function simularProgresoReal() {
  inicializarDatos()
  
  if (perfilReal.reputacion > 0 && perfilReal.reputacion < 4.0) {
    perfilReal.reputacion += 0.1
    guardarPerfil()
    return true
  }
  return false
}

// Resetear datos (para testing)
export function resetearDatos(): void {
  trabajosAnterioresReales = [...DEFAULT_TRABAJOS]
  perfilReal = { ...DEFAULT_PERFIL }
  guardarPerfil()
  guardarTrabajos()
}
