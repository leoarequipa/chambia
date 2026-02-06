import { Camera } from '@capacitor/camera';
import { Device } from '@capacitor/device';

export interface PermissionStatus {
  camera: 'granted' | 'denied' | 'prompt' | 'prompt-with-rationale' | 'limited';
  photos: 'granted' | 'denied' | 'prompt' | 'prompt-with-rationale' | 'limited';
}

export interface PermissionRequest {
  name: string;
  description: string;
  icon: string;
  critical: boolean;
}

export const PERMISSIONS_INFO: Record<string, PermissionRequest> = {
  camera: {
    name: 'Cámara',
    description: 'Necesitamos acceso a tu cámara para que puedas fotografiar tus trabajos y mostrar tu experiencia a potenciales clientes.',
    icon: '📸',
    critical: true,
  },
  photos: {
    name: 'Galería de fotos',
    description: 'Permítete seleccionar fotos de tu galería para complementar tu portafolio de trabajos.',
    icon: '🖼️',
    critical: false,
  },
  microphone: {
    name: 'Micrófono',
    description: 'Opcional: para grabar videos con audio explicando tus trabajos.',
    icon: '🎤',
    critical: false,
  },
  location: {
    name: 'Ubicación',
    description: 'Opcional: para mostrar en qué zonas trabajas y facilitar que clientes cercanos te encuentren.',
    icon: '📍',
    critical: false,
  },
};

class PermissionService {
  private static instance: PermissionService;
  private permissionCache: Map<string, PermissionStatus> = new Map();

  private constructor() {}

  static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService();
    }
    return PermissionService.instance;
  }

  /**
   * Verifica el estado de los permisos de cámara
   */
  async checkCameraPermissions(): Promise<PermissionStatus> {
    try {
      const status = await Camera.checkPermissions();
      return {
        camera: status.camera,
        photos: status.photos,
      };
    } catch (error) {
      console.error('Error checking camera permissions:', error);
      return {
        camera: 'prompt',
        photos: 'prompt',
      };
    }
  }

  /**
   * Solicita permisos de cámara
   */
  async requestCameraPermissions(): Promise<PermissionStatus> {
    try {
      const status = await Camera.requestPermissions({
        permissions: ['camera', 'photos'],
      });
      
      // Cachear el resultado
      this.permissionCache.set('camera', status);
      
      return {
        camera: status.camera,
        photos: status.photos,
      };
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return {
        camera: 'denied',
        photos: 'denied',
      };
    }
  }

  /**
   * Verifica si tenemos permiso de cámara
   */
  async hasCameraPermission(): Promise<boolean> {
    const status = await this.checkCameraPermissions();
    return status.camera === 'granted';
  }

  /**
   * Solicita permisos con flujo educativo
   * Muestra primero por qué necesitamos el permiso antes de solicitarlo al sistema
   */
  async requestPermissionsWithEducation(
    permissionType: 'camera' | 'photos' | 'microphone' | 'location'
  ): Promise<boolean> {
    const info = PERMISSIONS_INFO[permissionType];
    
    if (!info) {
      console.warn(`No info found for permission: ${permissionType}`);
      return false;
    }

    // Verificar estado actual
    const currentStatus = await this.checkCameraPermissions();
    
    if (permissionType === 'camera' && currentStatus.camera === 'granted') {
      return true;
    }
    
    if (permissionType === 'photos' && currentStatus.photos === 'granted') {
      return true;
    }

    // Si ya fue denegado permanentemente, no podemos solicitar de nuevo
    if (currentStatus.camera === 'denied') {
      // El usuario debe ir a configuración
      return false;
    }

    // Solicitar al sistema
    const newStatus = await this.requestCameraPermissions();
    
    if (permissionType === 'camera') {
      return newStatus.camera === 'granted';
    }
    
    if (permissionType === 'photos') {
      return newStatus.photos === 'granted';
    }

    return false;
  }

  /**
   * Obtiene información del dispositivo
   */
  async getDeviceInfo(): Promise<{
    platform: string;
    osVersion: string;
    model: string;
  }> {
    try {
      const info = await Device.getInfo();
      return {
        platform: info.platform || 'web',
        osVersion: info.osVersion || 'unknown',
        model: info.model || 'unknown',
      };
    } catch (error) {
      console.error('Error getting device info:', error);
      return {
        platform: 'web',
        osVersion: 'unknown',
        model: 'unknown',
      };
    }
  }

  /**
   * Limpia el cache de permisos
   */
  clearCache(): void {
    this.permissionCache.clear();
  }
}

export const permissionService = PermissionService.getInstance();
export default permissionService;
