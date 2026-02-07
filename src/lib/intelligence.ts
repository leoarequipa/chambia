// Sistema de inteligencia y reputación de ChambIA
// Trabaja con datos locales almacenados en el dispositivo

import { LocalStorageService, Perfil, Trabajo } from './storage';

// ==================== DETECCIÓN DE TIPO DE TRABAJO ====================
const WORK_TYPES = [
  { keywords: ['caño', 'tubería', 'grifo', 'fuga', 'agua', 'desagüe', 'inodoro', 'lavamanos'], type: 'Gasfitería' },
  { keywords: ['muro', 'pared', 'ladrillo', 'cemento', 'construcción', 'obra', 'cimiento', 'techo'], type: 'Construcción' },
  { keywords: ['luz', 'cable', 'toma', 'enchufe', 'corriente', 'eléctrico', 'foco', 'interruptor'], type: 'Electricidad' },
  { keywords: ['pintar', 'color', 'brocha', 'pintura', 'pared', 'rodillo', 'impermeabilizar'], type: 'Pintura' },
  { keywords: ['puerta', 'ventana', 'madera', 'cerrajería', 'bisagra', 'chapa', 'closet'], type: 'Carpintería' },
  { keywords: ['cerámica', 'porcelanato', 'azulejo', 'piso', 'albañilería'], type: 'Albañilería' },
  { keywords: ['jardín', 'planta', 'poda', 'césped', 'árbol', 'jardinero'], type: 'Jardinería' },
  { keywords: ['limpieza', 'aseo', 'lavar', 'trapear', 'desinfectar'], type: 'Limpieza' },
];

export function detectarTipoTrabajo(descripcion: string): string {
  const texto = descripcion.toLowerCase();
  
  for (const workType of WORK_TYPES) {
    if (workType.keywords.some(keyword => texto.includes(keyword))) {
      return workType.type;
    }
  }
  
  return 'Trabajo General';
}

// ==================== GESTIÓN DE PERFIL ====================
export function obtenerPerfilActual(): Perfil | null {
  return LocalStorageService.getPerfil();
}

export function actualizarPerfil(updates: Partial<Perfil>): Perfil | null {
  const perfil = LocalStorageService.getPerfil();
  if (perfil) {
    const updatedPerfil = {
      ...perfil,
      ...updates,
      updatedAt: Date.now()
    };
    LocalStorageService.savePerfil(updatedPerfil);
    return updatedPerfil;
  }
  return null;
}

// ==================== GESTIÓN DE TRABAJOS ====================
export function obtenerTrabajosComoWorks(): Trabajo[] {
  return LocalStorageService.getTrabajos();
}

export function obtenerTrabajoPorId(id: string): Trabajo | undefined {
  const trabajos = LocalStorageService.getTrabajos();
  return trabajos.find(t => t.id === id);
}

export async function agregarNuevoTrabajo(data: {
  title: string;
  description: string;
  type?: string;
  zone?: string;
  image: string;
}): Promise<{ trabajo: Trabajo; analysis: ReturnType<typeof analizarNuevoTrabajo> }> {
  // Detectar tipo automáticamente si no se proporcionó
  const tipoDetectado = data.type || detectarTipoTrabajo(data.description);
  
  // Crear trabajo
  const trabajo = await LocalStorageService.addTrabajo({
    title: data.title || tipoDetectado,
    description: data.description,
    type: tipoDetectado,
    zone: data.zone || 'Arequipa',
    image: data.image,
    date: 'Hace un momento',
    status: 'Completado'
  });

  // Analizar y retornar resultado
  const analysis = analizarNuevoTrabajo(trabajo);
  
  return { trabajo, analysis };
}

// ==================== ANÁLISIS DE TRABAJO ====================
export function analizarNuevoTrabajo(trabajo: Trabajo) {
  const perfil = LocalStorageService.getPerfil();
  
  if (!perfil) {
    return {
      resultado: {
        mensajeMotivador: ['¡Bienvenido a ChambIA!'],
        nuevaInsignia: undefined,
        mejoraReputacion: 0
      }
    };
  }

  const mensajesPositivos = [
    '¡Excelente trabajo! Tu reputación está subiendo 📈',
    '¡Bien hecho! Tu perfil se ve más confiable cada día ✨',
    '¡Gran trabajo! Sigue así 💪',
    '¡Profesional! Tu experiencia es valiosa ⭐',
    '¡Impresionante! Los empleadores notarán tu dedicación 🎯'
  ];

  const mensajePositivo = mensajesPositivos[Math.floor(Math.random() * mensajesPositivos.length)];
  
  // Verificar si hay nueva insignia
  const insigniaAnterior = perfil.insignias[perfil.insignias.length - 1];
  const nuevoPerfil = LocalStorageService.getPerfil(); // Recargar después de addTrabajo
  const nuevaInsignia = nuevoPerfil?.insignias.find(i => i !== insigniaAnterior);

  return {
    resultado: {
      mensajePositivo,
      nuevaInsignia,
      mejoraReputacion: 0.1,
      tipo: trabajo.type
    }
  };
}

// ==================== INSIGNIAS ====================
export function verificarNuevasInsignias(totalTrabajos: number, insigniasActuales: string[]): string[] {
  const nuevasInsignias: string[] = [];
  
  if (totalTrabajos >= 5 && !insigniasActuales.includes('Principiante Activo')) {
    nuevasInsignias.push('Principiante Activo');
  }
  
  if (totalTrabajos >= 10 && !insigniasActuales.includes('Trabajador Dedicado')) {
    nuevasInsignias.push('Trabajador Dedicado');
  }
  
  if (totalTrabajos >= 25 && !insigniasActuales.includes('Profesional Confiable')) {
    nuevasInsignias.push('Profesional Confiable');
  }
  
  if (totalTrabajos >= 50 && !insigniasActuales.includes('Experto Consistente')) {
    nuevasInsignias.push('Experto Consistente');
  }
  
  return nuevasInsignias;
}

// ==================== INICIALIZACIÓN ====================
export function inicializarDatos(): void {
  // Verificar si ya hay datos
  const perfil = LocalStorageService.getPerfil();
  const trabajos = LocalStorageService.getTrabajos();
  
  if (!perfil) {
    console.log('🆕 Inicializando perfil por primera vez');
    // El perfil por defecto se crea automáticamente en getPerfil
  }
  
  if (trabajos.length === 0) {
    console.log('🆕 Inicializando trabajos por primera vez');
    // Los trabajos por defecto se crean automáticamente en getTrabajos
  }
  
  console.log('✅ Datos inicializados correctamente');
  console.log('👤 Perfil:', LocalStorageService.getPerfil()?.nombre);
  console.log('📸 Trabajos:', LocalStorageService.getTrabajos().length);
}

// ==================== DATOS MOCK (compatibilidad) ====================
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
};

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
];

// ==================== DEBUG ====================
export function debugStorage(): void {
  console.log('=== DEBUG STORAGE ===');
  console.log('Perfil:', LocalStorageService.getPerfil());
  console.log('Trabajos:', LocalStorageService.getTrabajos().length);
  console.log('Storage info:', LocalStorageService.getStorageInfo());
  console.log('====================');
}

export function limpiarDatos(): void {
  LocalStorageService.clearAll();
  console.log('🧹 Datos limpiados. Recarga la app para reinicializar.');
}
