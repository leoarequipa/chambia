// Sistema de almacenamiento local para ChambIA
// Guarda trabajos y fotos localmente usando localStorage

import { optimizeImage, checkStorageSpace, getImageSizeKB } from './imageUtils';

// ==================== CONSTANTES ====================
const STORAGE_KEYS = {
  PERFIL: 'chambia_perfil',
  TRABAJOS: 'chambia_trabajos',
  TRABAJOS_IDS: 'chambia_trabajos_ids',
  LAST_SYNC: 'chambia_last_sync',
  CACHE_VERSION: 'chambia_cache_v1'
};

// ==================== INTERFACES ====================
export interface Trabajo {
  id: string;
  title: string;
  description: string;
  type: string;
  zone: string;
  image: string; // base64
  imageBlob?: Blob; // Para almacenamiento más eficiente
  date: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  syncStatus: 'synced' | 'pending' | 'error';
}

export interface Perfil {
  id: string;
  nombre: string;
  oficio: string;
  avatar: string;
  reputacion: number;
  totalTrabajos: number;
  insignias: string[];
  createdAt: number;
  updatedAt: number;
}

// ==================== INITIAL DATA ====================
const defaultPerfil: Perfil = {
  id: '1',
  nombre: 'Juan Pérez',
  oficio: 'Gasfitero Profesional',
  avatar: 'https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=JUAN',
  reputacion: 3.5,
  totalTrabajos: 3,
  insignias: [],
  createdAt: Date.now(),
  updatedAt: Date.now()
};

const defaultTrabajos: Trabajo[] = [
  {
    id: '1',
    title: 'Instalación completa de baño',
    description: 'Instalación completa de sistema de agua y desagüe',
    type: 'Gasfitería',
    zone: 'Cayma',
    image: 'https://via.placeholder.com/400x200/27AE60/FFFFFF?text=Bañonuevo',
    date: 'Hace 2 días',
    status: 'Completado',
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
    syncStatus: 'synced'
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
    createdAt: Date.now() - 432000000,
    updatedAt: Date.now() - 432000000,
    syncStatus: 'synced'
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
    createdAt: Date.now() - 604800000,
    updatedAt: Date.now() - 604800000,
    syncStatus: 'synced'
  }
];

// ==================== STORAGE SERVICE ====================
class LocalStorageService {
  // Guardar perfil
  static savePerfil(perfil: Perfil): void {
    try {
      const data = {
        ...perfil,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.PERFIL, JSON.stringify(data));
      console.log('✅ Perfil guardado localmente');
    } catch (error) {
      console.error('❌ Error guardando perfil:', error);
    }
  }

  // Obtener perfil
  static getPerfil(): Perfil | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PERFIL);
      if (data) {
        return JSON.parse(data);
      }
      // Si no existe, crear perfil por defecto
      this.savePerfil(defaultPerfil);
      return defaultPerfil;
    } catch (error) {
      console.error('❌ Error obteniendo perfil:', error);
      return defaultPerfil;
    }
  }

  // Guardar trabajos
  static saveTrabajos(trabajos: Trabajo[]): void {
    try {
      // Guardar trabajos completos con imágenes
      localStorage.setItem(STORAGE_KEYS.TRABAJOS, JSON.stringify(trabajos));
      localStorage.setItem(STORAGE_KEYS.TRABAJOS_IDS, JSON.stringify(trabajos.map(t => t.id)));
      
      // Calcular tamaño total
      const totalSize = trabajos.reduce((acc, t) => acc + (t.image?.length || 0), 0);
      console.log(`✅ ${trabajos.length} trabajos guardados localmente (${Math.round(totalSize / 1024)}KB en imágenes)`);
    } catch (error) {
      console.error('❌ Error guardando trabajos:', error);
      // Si es error de cuota, mostrar advertencia
      const space = checkStorageSpace();
      console.warn(`⚠️ Espacio insuficiente. Usado: ${space.usedKB}KB, Disponible: ${space.remainingKB}KB`);
      throw error;
    }
  }

  // Obtener trabajos
  static getTrabajos(): Trabajo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRABAJOS);
      if (data) {
        return JSON.parse(data);
      }
      // Si no existe, crear trabajos por defecto
      this.saveTrabajos(defaultTrabajos);
      return defaultTrabajos;
    } catch (error) {
      console.error('❌ Error obteniendo trabajos:', error);
      return defaultTrabajos;
    }
  }

  // Agregar un nuevo trabajo
  static async addTrabajo(trabajo: Omit<Trabajo, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'>): Promise<Trabajo> {
    const trabajos = this.getTrabajos();
    
    // Comprimir imagen si es base64
    let optimizedImage = trabajo.image;
    if (trabajo.image?.startsWith('data:image')) {
      try {
        const originalSize = getImageSizeKB(trabajo.image);
        if (originalSize > 500) { // Si es mayor a 500KB, comprimir
          console.log(`🗜️ Comprimiendo imagen de ${originalSize}KB...`);
          optimizedImage = await optimizeImage(trabajo.image, {
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 0.8
          });
          const newSize = getImageSizeKB(optimizedImage);
          console.log(`✅ Imagen comprimida: ${originalSize}KB → ${newSize}KB`);
        }
      } catch (error) {
        console.warn('⚠️ Error comprimiendo imagen, usando original:', error);
        optimizedImage = trabajo.image;
      }
    }
    
    const nuevoTrabajo: Trabajo = {
      ...trabajo,
      image: optimizedImage,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      syncStatus: 'pending'
    };

    trabajos.unshift(nuevoTrabajo); // Agregar al inicio
    
    try {
      this.saveTrabajos(trabajos);
      // Actualizar perfil
      this.updatePerfilAfterWork();
    } catch (error) {
      console.error('❌ Error guardando trabajo:', error);
      throw error;
    }
    
    return nuevoTrabajo;
  }

  // Actualizar perfil después de registrar trabajo
  private static updatePerfilAfterWork(): void {
    const perfil = this.getPerfil();
    if (perfil) {
      perfil.totalTrabajos += 1;
      perfil.reputacion = Math.min(5.0, perfil.reputacion + 0.1);
      
      // Verificar insignias
      if (perfil.totalTrabajos === 5 && !perfil.insignias.includes('Principiante Activo')) {
        perfil.insignias.push('Principiante Activo');
      } else if (perfil.totalTrabajos === 10 && !perfil.insignias.includes('Trabajador Dedicado')) {
        perfil.insignias.push('Trabajador Dedicado');
      }
      
      this.savePerfil(perfil);
    }
  }

  // Eliminar trabajo
  static deleteTrabajo(id: string): boolean {
    try {
      const trabajos = this.getTrabajos();
      const filtered = trabajos.filter(t => t.id !== id);
      this.saveTrabajos(filtered);
      console.log('✅ Trabajo eliminado');
      return true;
    } catch (error) {
      console.error('❌ Error eliminando trabajo:', error);
      return false;
    }
  }

  // Limpiar todo (debug)
  static clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('✅ Almacenamiento local limpiado');
    } catch (error) {
      console.error('❌ Error limpiando storage:', error);
    }
  }

  // Verificar espacio disponible
  static getStorageInfo(): { used: number; total: number; remaining: number } {
    try {
      let used = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length * 2; // UTF-16 = 2 bytes por caracter
        }
      }
      
      // localStorage típicamente tiene límite de 5-10 MB
      const total = 5 * 1024 * 1024; // 5 MB estimado
      return {
        used,
        total,
        remaining: total - used
      };
    } catch (error) {
      return { used: 0, total: 0, remaining: 0 };
    }
  }
}

// ==================== EXPORTS ====================
export { LocalStorageService, STORAGE_KEYS, defaultPerfil, defaultTrabajos };
export default LocalStorageService;
