// Perfil simple para APK
let perfilActual = {
  nombre: 'Juan Pérez',
  reputacion: 3.5,
  totalTrabajos: 3,
  insignias: [] as string[],
}

export function obtenerPerfilActual() {
  return { ...perfilActual }
}

export function simularRegistroTrabajo() {
  perfilActual.reputacion = Math.min(5.0, perfilActual.reputacion + 0.1)
  perfilActual.totalTrabajos += 1
  
  // Añadir insignia aleatoria
  if (perfilActual.totalTrabajos === 5) {
    perfilActual.insignias.push('Principiante Activo')
  } else if (perfilActual.totalTrabajos === 10) {
    perfilActual.insignias.push('Trabajador Dedicado')
  }
  
  return {
    mejoraReputacion: 0.1,
    nuevaInsignia: perfilActual.insignias[perfilActual.insignias.length - 1],
    mensajeMotivador: ['¡Buen trabajo! Tu reputación está subiendo']
  }
}

export const mockWorker = {
  id: '1',
  name: 'Juan Pérez',
  trade: 'Gasfitero Profesional',
  avatar: 'https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=JUAN',
  reputation: 4.8,
  verified: true,
  phone: '+51 999 888 777',
  stats: {
    totalWorks: 12,
    monthsActive: 3,
    zonesCovered: 5,
  }
}

export function inicializarDatos() {
  // Datos ya inicializados
}

export function obtenerTrabajosComoWorks() {
  return mockWorkerWorks
}

export function analizarNuevoTrabajo(data: { titulo: string; descripcion: string; tipo: string; imagen: string }) {
  perfilActual.reputacion = Math.min(5.0, perfilActual.reputacion + 0.1)
  perfilActual.totalTrabajos += 1
  
  // Añadir insignia aleatoria
  if (perfilActual.totalTrabajos === 5) {
    perfilActual.insignias.push('Principiante Activo')
  } else if (perfilActual.totalTrabajos === 10) {
    perfilActual.insignias.push('Trabajador Dedicado')
  }
  
  return {
    resultado: {
      mejoraReputacion: 0.1,
      nuevaInsignia: perfilActual.insignias[perfilActual.insignias.length - 1],
      mensajeMotivador: ['¡Buen trabajo! Tu reputación está subiendo'],
      tipo: data.tipo
    }
  }
}

export const mockWorkerWorks = [
  {
    id: '1',
    title: 'Instalación completa de baño',
    description: 'Instalación completa de sistema de agua y desagüe',
    type: 'Gasfitería',
    zone: 'Cayma',
    image: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Bañonuevo',
    date: 'Hace 2 días',
    status: 'Completado',
  },
  {
    id: '2',
    title: 'Reparación de caño de agua',
    description: 'Reparación de caño roto en cocina',
    type: 'Gasfitería',
    zone: 'Cercado',
    image: 'https://via.placeholder.com/400x200/FF6B35/FFFFFF?text=Cocina',
    date: 'Hace 5 días',
    status: 'Completado',
  },
  {
    id: '3',
    title: 'Muro de ladrillos',
    description: 'Construcción de muro de 15m²',
    type: 'Construcción',
    zone: 'Miraflores',
    image: 'https://via.placeholder.com/400x200/2C3E50/FFFFFF?text=Construcción',
    date: 'Hace 1 semana',
    status: 'Completado',
  },
]