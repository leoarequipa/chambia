import { Work, Worker, Zone, WorkType } from '@/types'

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

export const mockWorker: Worker = {
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
  },
  works: [
    {
      id: '1',
      title: 'Instalación completa de baño',
      description: 'Instalación completa de sistema de agua y desagüe',
      type: 'Gasfitería',
      zone: 'Cayma',
      image: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Bañonuevo',
      date: 'Hace 2 días',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Reparación de caño de agua',
      description: 'Reparación de caño roto en cocina',
      type: 'Gasfitería',
      zone: 'Cercado',
      image: 'https://via.placeholder.com/400x200/FF6B35/FFFFFF?text=Cocina',
      date: 'Hace 5 días',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Muro de ladrillos',
      description: 'Construcción de muro de 15m²',
      type: 'Construcción',
      zone: 'Miraflores',
      image: 'https://via.placeholder.com/400x200/2C3E50/FFFFFF?text=Construcción',
      date: 'Hace 1 semana',
      status: 'completed',
    },
  ],
}