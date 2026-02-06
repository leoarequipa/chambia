import { Work, Worker, Zone, WorkType } from '@/types'
import { getFromStorage, STORAGE_KEYS } from '@/lib/storage'

export const workTypes: WorkType[] = [
  { id: '1', name: 'Gasfitería', icon: '🔧' },
  { id: '2', name: 'Construcción', icon: '🏗️' },
  { id: '3', name: 'Electricidad', icon: '⚡' },
  { id: '4', name: 'Pintura', icon: '🎨' },
  { id: '5', name: 'Otros', icon: '🛠️' },
]

export const zones: Zone[] = [
  { id: '1', name: 'Cercado de Arequipa', district: 'Arequipa' },
  { id: '2', name: 'Cayma', district: 'Arequipa' },
  { id: '3', name: 'Cerro Colorado', district: 'Arequipa' },
  { id: '4', name: 'Yanahuara', district: 'Arequipa' },
  { id: '5', name: 'Miraflores', district: 'Arequipa' },
  { id: '6', name: 'Sachaca', district: 'Arequipa' },
  { id: '7', name: 'Paucarpata', district: 'Arequipa' },
  { id: '8', name: 'Jacobs Hunter', district: 'Arequipa' },
  { id: '9', name: 'Tiabaya', district: 'Arequipa' },
  { id: '10', name: 'Otros distritos', district: 'Arequipa' },
]

// Función para obtener el trabajador desde localStorage
export function getWorker(): Worker {
  if (typeof window === 'undefined') {
    return getDefaultWorker()
  }
  
  try {
    const perfil = getFromStorage(STORAGE_KEYS.PERFIL_REAL, null)
    const trabajos = getFromStorage(STORAGE_KEYS.TRABAJOS_ANALIZADOS, [])
    
    if (!perfil) {
      return getDefaultWorker()
    }
    
    // Mapear trabajos persistidos a formato Work
    const works: Work[] = trabajos.map((trabajo: any, index: number) => ({
      id: `work_${index}`,
      title: trabajo.tipo,
      description: trabajo.descripcion,
      type: trabajo.tipo,
      zone: 'Arequipa',
      image: trabajo.imagen || '/images/work-placeholder.jpg',
      date: formatearFecha(trabajo.fecha),
      status: 'completed',
    }))
    
    return {
      id: '1',
      name: perfil.nombre,
      trade: perfil.oficio || 'Trabajador Profesional',
      avatar: perfil.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(perfil.nombre)}&background=FF6B35&color=fff&size=120`,
      reputation: perfil.reputacion,
      verified: true,
      phone: perfil.telefono || '+51 999 888 777',
      stats: {
        totalWorks: perfil.totalTrabajos,
        monthsActive: calcularMesesActivo(trabajos),
        zonesCovered: 5,
      },
      works: works,
    }
  } catch (error) {
    console.error('Error getting worker from storage:', error)
    return getDefaultWorker()
  }
}

// Worker por defecto (cuando no hay datos)
function getDefaultWorker(): Worker {
  return {
    id: '1',
    name: 'Juan Pérez',
    trade: 'Gasfitero Profesional',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=FF6B35&color=fff&size=120',
    reputation: 3.5,
    verified: true,
    phone: '+51 999 888 777',
    stats: {
      totalWorks: 3,
      monthsActive: 1,
      zonesCovered: 5,
    },
    works: [
      {
        id: '1',
        title: 'Instalación de caño de agua',
        description: 'Instalación en cocina',
        type: 'Gasfitería',
        zone: 'Arequipa',
        image: '/images/work-placeholder.jpg',
        date: 'Hace 2 días',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Reparación de fuga',
        description: 'Reparación en baño',
        type: 'Gasfitería',
        zone: 'Arequipa',
        image: '/images/work-placeholder.jpg',
        date: 'Hace 5 días',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Levantado de muro',
        description: 'Muro en patio',
        type: 'Construcción',
        zone: 'Arequipa',
        image: '/images/work-placeholder.jpg',
        date: 'Hace 7 días',
        status: 'completed',
      },
    ],
  }
}

// Calcular meses activo basado en el trabajo más antiguo
function calcularMesesActivo(trabajos: any[]): number {
  if (trabajos.length === 0) return 1
  
  const fechas = trabajos.map(t => new Date(t.fecha).getTime())
  const masAntiguo = Math.min(...fechas)
  const ahora = Date.now()
  const diffMeses = Math.floor((ahora - masAntiguo) / (1000 * 60 * 60 * 24 * 30))
  
  return Math.max(1, diffMeses)
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

// Mantener mockWorker para compatibilidad, pero usar getWorker() preferentemente
export const mockWorker: Worker = getDefaultWorker()
