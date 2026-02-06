/**
 * Utilidades para persistencia de datos en localStorage
 * Optimizado para PWA móvil
 */

const STORAGE_KEYS = {
  WORKER_PROFILE: 'chambia_worker_profile',
  WORKS_HISTORY: 'chambia_works_history',
  TRABAJOS_ANALIZADOS: 'chambia_trabajos_analizados',
  PERFIL_REAL: 'chambia_perfil_real',
  APP_SETTINGS: 'chambia_settings',
} as const

/**
 * Guarda datos en localStorage
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`Error saving to localStorage [${key}]:`, error)
    return false
  }
}

/**
 * Obtiene datos de localStorage
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) return defaultValue
    return JSON.parse(serialized) as T
  } catch (error) {
    console.error(`Error reading from localStorage [${key}]:`, error)
    return defaultValue
  }
}

/**
 * Elimina datos de localStorage
 */
export function removeFromStorage(key: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage [${key}]:`, error)
    return false
  }
}

/**
 * Limpia todo el almacenamiento de la app
 */
export function clearAllStorage(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}

/**
 * Obtiene el espacio utilizado en localStorage (en bytes)
 */
export function getStorageSize(): number {
  if (typeof window === 'undefined') return 0
  
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length * 2 // UTF-16 = 2 bytes por carácter
    }
  }
  return total
}

/**
 * Formatea el tamaño en bytes a formato legible
 */
export function formatStorageSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Exportar claves para uso en otros módulos
export { STORAGE_KEYS }
