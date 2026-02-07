// Utilidades para manejo de imágenes
// Optimiza imágenes para almacenamiento local

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
}

const DEFAULT_OPTIONS: ImageOptimizationOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  format: 'image/jpeg'
};

/**
 * Comprime y optimiza una imagen base64
 */
export async function optimizeImage(
  base64Image: string, 
  options: ImageOptimizationOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo aspect ratio
      let { width, height } = img;
      
      if (width > opts.maxWidth!) {
        height = (height * opts.maxWidth!) / width;
        width = opts.maxWidth!;
      }
      
      if (height > opts.maxHeight!) {
        width = (width * opts.maxHeight!) / height;
        height = opts.maxHeight!;
      }
      
      // Crear canvas para redimensionar
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo obtener contexto 2D'));
        return;
      }
      
      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir a base64 comprimido
      const optimizedBase64 = canvas.toDataURL(opts.format, opts.quality);
      
      // Calcular reducción
      const originalSize = Math.round(base64Image.length / 1024);
      const optimizedSize = Math.round(optimizedBase64.length / 1024);
      console.log(`📸 Imagen optimizada: ${originalSize}KB → ${optimizedSize}KB (${Math.round((1 - optimizedSize/originalSize) * 100)}% reducción)`);
      
      resolve(optimizedBase64);
    };
    
    img.onerror = () => {
      reject(new Error('Error al cargar imagen'));
    };
    
    img.src = base64Image;
  });
}

/**
 * Verifica si una imagen base64 es válida
 */
export function isValidBase64Image(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  
  // Verificar prefijo data:image
  if (!str.startsWith('data:image/')) {
    // Si no tiene prefijo, verificar si es base64 puro
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    const base64Content = str.replace(/^data:image\/\w+;base64,/, '');
    return base64Regex.test(base64Content);
  }
  
  return true;
}

/**
 * Obtiene el tamaño aproximado de una imagen base64 en KB
 */
export function getImageSizeKB(base64Image: string): number {
  if (!base64Image) return 0;
  
  // Remover prefijo data:image si existe
  const base64Content = base64Image.replace(/^data:image\/\w+;base64,/, '');
  
  // Calcular tamaño: base64 es ~4/3 del tamaño binario real
  const sizeInBytes = (base64Content.length * 3) / 4;
  return Math.round(sizeInBytes / 1024);
}

/**
 * Crea una versión thumbnail de una imagen
 */
export async function createThumbnail(
  base64Image: string, 
  maxSize: number = 200
): Promise<string> {
  return optimizeImage(base64Image, {
    maxWidth: maxSize,
    maxHeight: maxSize,
    quality: 0.6,
    format: 'image/jpeg'
  });
}

/**
 * Verifica si hay suficiente espacio en localStorage
 */
export function checkStorageSpace(): { 
  available: boolean; 
  usedKB: number; 
  remainingKB: number;
  totalKB: number;
} {
  try {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length * 2; // UTF-16 = 2 bytes por carácter
      }
    }
    
    // localStorage típicamente tiene límite de 5-10 MB
    const total = 5 * 1024 * 1024; // 5 MB
    const remaining = total - used;
    
    return {
      available: remaining > 100 * 1024, // Necesitamos al menos 100KB libres
      usedKB: Math.round(used / 1024),
      remainingKB: Math.round(remaining / 1024),
      totalKB: Math.round(total / 1024)
    };
  } catch (error) {
    return {
      available: false,
      usedKB: 0,
      remainingKB: 0,
      totalKB: 0
    };
  }
}

/**
 * Guarda una imagen en localStorage con manejo de errores
 */
export function saveImageToStorage(key: string, base64Image: string): boolean {
  try {
    // Verificar espacio disponible
    const space = checkStorageSpace();
    const imageSize = getImageSizeKB(base64Image);
    
    if (imageSize > space.remainingKB) {
      console.warn(`⚠️ No hay suficiente espacio para guardar imagen (${imageSize}KB > ${space.remainingKB}KB disponibles)`);
      return false;
    }
    
    localStorage.setItem(key, base64Image);
    console.log(`✅ Imagen guardada: ${key} (${imageSize}KB)`);
    return true;
  } catch (error) {
    console.error('❌ Error guardando imagen:', error);
    return false;
  }
}

/**
 * Obtiene una imagen de localStorage
 */
export function getImageFromStorage(key: string): string | null {
  try {
    const image = localStorage.getItem(key);
    if (image && isValidBase64Image(image)) {
      return image;
    }
    return null;
  } catch (error) {
    console.error('❌ Error obteniendo imagen:', error);
    return null;
  }
}

/**
 * Limpia imágenes antiguas si el espacio es bajo
 */
export function cleanupOldImages(): void {
  const space = checkStorageSpace();
  
  if (space.remainingKB < 500) { // Menos de 500KB libres
    console.log('🧹 Limpiando imágenes antiguas para liberar espacio...');
    
    // Aquí podrías implementar lógica para eliminar imágenes antiguas
    // Por ahora solo mostramos una advertencia
    console.warn(`⚠️ Espacio bajo en localStorage: ${space.remainingKB}KB disponibles`);
  }
}
