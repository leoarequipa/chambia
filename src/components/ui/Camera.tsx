'use client'

import { useState, useCallback, useEffect, memo } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { permissionService, PERMISSIONS_INFO } from '@/lib/permissions'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onCancel: () => void
}

// Material Icons memoizados
const CloseIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
))

const CameraIcon = memo(() => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
))

const PermissionIcon = memo(() => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <circle cx="12" cy="11" r="3"/>
  </svg>
))

const SettingsIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
))

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<'checking' | 'granted' | 'denied' | 'requesting'>('checking')
  const [showPermissionRationale, setShowPermissionRationale] = useState(false)

  // Verificar permisos al montar
  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    setPermissionStatus('checking')
    const status = await permissionService.checkCameraPermissions()
    
    if (status.camera === 'granted' || status.camera === 'limited') {
      setPermissionStatus('granted')
      // Abrir cámara inmediatamente
      openNativeCamera()
    } else if (status.camera === 'denied') {
      setPermissionStatus('denied')
      setError('Los permisos de cámara fueron denegados permanentemente.')
    } else {
      // prompt o prompt-with-rationale
      setShowPermissionRationale(true)
      setPermissionStatus('requesting')
    }
  }

  const requestPermissions = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const status = await permissionService.requestCameraPermissions()
      
      if (status.camera === 'granted' || status.camera === 'limited') {
        setPermissionStatus('granted')
        setShowPermissionRationale(false)
        openNativeCamera()
      } else {
        setPermissionStatus('denied')
        setError('No se pudo obtener permiso para usar la cámara.')
      }
    } catch (err) {
      console.error('Error requesting permissions:', err)
      setError('Error al solicitar permisos.')
      setPermissionStatus('denied')
    } finally {
      setIsLoading(false)
    }
  }

  const openNativeCamera = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const image = await Camera.getPhoto({
        quality: 85,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        width: 1920,
        height: 1080,
        correctOrientation: true,
        promptLabelHeader: 'Tomar Foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Cámara',
        promptLabelPicture: 'Galería',
      })

      if (image.dataUrl) {
        onCapture(image.dataUrl)
      } else {
        setError('No se pudo capturar la imagen')
        setPermissionStatus('requesting')
        setShowPermissionRationale(true)
      }
    } catch (err: any) {
      console.error('Error opening camera:', err)
      
      // Si el usuario canceló, volver a la pantalla anterior
      if (err.message && err.message.includes('User cancelled')) {
        onCancel()
        return
      }
      
      // Si es error de permisos
      if (err.message && (err.message.includes('permission') || err.message.includes('Permission'))) {
        setPermissionStatus('denied')
        setError('Se requieren permisos de cámara para continuar.')
      } else {
        setError('No se pudo abrir la cámara. Intenta de nuevo.')
        setPermissionStatus('requesting')
        setShowPermissionRationale(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const openSettings = () => {
    // Abrir configuración de la app en Android
    if (typeof window !== 'undefined' && (window as any).Capacitor) {
      // En Capacitor, intentar abrir settings
      try {
        const { App } = require('@capacitor/app')
        App.openUrl({ url: 'app-settings:' })
      } catch (e) {
        console.error('Could not open settings:', e)
        setError('Por favor, ve a Configuración > Aplicaciones > ChambIA > Permisos y habilita la cámara.')
      }
    }
  }

  // Pantalla de solicitud de permisos educativa
  if (showPermissionRationale && permissionStatus === 'requesting') {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--md-sys-color-background)] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center mb-6">
            <span className="text-[var(--md-sys-color-on-primary-container)]">
              <PermissionIcon />
            </span>
          </div>
          
          <h2 className="md-headline-small text-[var(--md-sys-color-on-surface)] text-center mb-2">
            Permiso de Cámara
          </h2>
          
          <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)] text-center mb-8 max-w-sm">
            {PERMISSIONS_INFO.camera.description}
          </p>
          
          <div className="space-y-3 w-full max-w-sm">
            <button
              onClick={requestPermissions}
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] md-label-large font-medium shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Solicitando...' : 'Permitir acceso'}
            </button>
            
            <button
              onClick={onCancel}
              className="w-full py-4 px-6 rounded-full text-[var(--md-sys-color-on-surface-variant)] md-label-large font-medium active:bg-[var(--md-sys-color-surface-variant)] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de error o carga
  return (
    <div className="fixed inset-0 z-50 bg-[var(--md-sys-color-background)] flex flex-col">
      {/* Top App Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--md-sys-color-outline-variant)]">
        <button
          onClick={onCancel}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--md-sys-color-on-surface)] md-state-layer"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>
        
        <span className="md-title-medium text-[var(--md-sys-color-on-surface)]">Cámara</span>
        
        <div className="w-10" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        {isLoading ? (
          <div className="text-center">
            <div className="md-circular-progress mx-auto mb-4" />
            <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">Abriendo cámara...</p>
          </div>
        ) : (
          <div className="text-center p-6 rounded-2xl max-w-sm bg-[var(--md-sys-color-error-container)] animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--md-sys-color-error)]">
              <span className="text-white">
                <CameraIcon />
              </span>
            </div>
            <p className="md-body-large mb-4 text-[var(--md-sys-color-on-error-container)]">
              {error || 'No se pudo acceder a la cámara'}
            </p>
            <div className="space-y-2">
              {permissionStatus === 'denied' ? (
                <button
                  onClick={openSettings}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                >
                  <SettingsIcon />
                  <span>Abrir Configuración</span>
                </button>
              ) : (
                <button
                  onClick={checkPermissions}
                  className="w-full px-6 py-3 rounded-full font-medium bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                >
                  Intentar de nuevo
                </button>
              )}
              <button
                onClick={onCancel}
                className="w-full px-6 py-3 rounded-full font-medium text-[var(--md-sys-color-on-error-container)]"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
