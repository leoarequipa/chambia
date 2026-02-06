/**
 * Sistema de autenticación simple para ChambIA
 * Usa localStorage para persistir sesión
 */

import { saveToStorage, getFromStorage, STORAGE_KEYS } from './storage'

export interface User {
  id: string
  nombre: string
  email: string
  telefono: string
  oficio: string
  avatar?: string
  createdAt: string
}

export interface AuthSession {
  user: User
  isAuthenticated: boolean
  loginAt: string
}

const AUTH_KEY = 'chambia_auth_session'

/**
 * Registra un nuevo usuario
 */
export function registerUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    ...userData,
    id: generateUserId(),
    createdAt: new Date().toISOString(),
  }

  // Guardar sesión
  const session: AuthSession = {
    user: newUser,
    isAuthenticated: true,
    loginAt: new Date().toISOString(),
  }

  saveToStorage(AUTH_KEY, session)
  
  // También actualizar el perfil del trabajador
  saveToStorage(STORAGE_KEYS.PERFIL_REAL, {
    nombre: newUser.nombre,
    telefono: newUser.telefono,
    oficio: newUser.oficio,
    avatar: newUser.avatar || '',
    reputacion: 3.5,
    consistencia: 0,
    experiencia: 0,
    insignias: [],
    totalTrabajos: 0,
  })

  return newUser
}

/**
 * Inicia sesión (para usuarios existentes)
 * En este sistema simple, solo verificamos que exista el usuario
 */
export function loginUser(email: string): AuthSession | null {
  const session = getFromStorage<AuthSession>(AUTH_KEY, null)
  
  if (session && session.user.email === email) {
    const updatedSession: AuthSession = {
      ...session,
      isAuthenticated: true,
      loginAt: new Date().toISOString(),
    }
    saveToStorage(AUTH_KEY, updatedSession)
    return updatedSession
  }

  return null
}

/**
 * Cierra sesión
 */
export function logoutUser(): void {
  const session = getFromStorage<AuthSession>(AUTH_KEY, null)
  if (session) {
    saveToStorage(AUTH_KEY, {
      ...session,
      isAuthenticated: false,
    })
  }
}

/**
 * Obtiene la sesión actual
 */
export function getCurrentSession(): AuthSession | null {
  return getFromStorage<AuthSession>(AUTH_KEY, null)
}

/**
 * Verifica si hay un usuario autenticado
 */
export function isAuthenticated(): boolean {
  const session = getCurrentSession()
  return session?.isAuthenticated === true
}

/**
 * Obtiene el usuario actual
 */
export function getCurrentUser(): User | null {
  const session = getCurrentSession()
  return session?.user || null
}

/**
 * Actualiza datos del usuario
 */
export function updateUser(updates: Partial<User>): User | null {
  const session = getCurrentSession()
  
  if (!session || !session.user) return null

  const updatedUser: User = {
    ...session.user,
    ...updates,
  }

  const updatedSession: AuthSession = {
    ...session,
    user: updatedUser,
  }

  saveToStorage(AUTH_KEY, updatedSession)

  // Actualizar también el perfil
  saveToStorage(STORAGE_KEYS.PERFIL_REAL, {
    nombre: updatedUser.nombre,
    telefono: updatedUser.telefono,
    oficio: updatedUser.oficio,
    avatar: updatedUser.avatar || '',
  })

  return updatedUser
}

/**
 * Verifica si es la primera vez que se usa la app
 */
export function isFirstTime(): boolean {
  const session = getCurrentSession()
  return session === null
}

/**
 * Genera un ID único para el usuario
 */
function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Re-exportar tipos
export type { AuthSession as Session }
