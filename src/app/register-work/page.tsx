'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, IconButton } from '@/components/ui/Button'
import { AnalysisFeedback } from '@/components/ui/AnalysisFeedback'
import { CameraCapture } from '@/components/ui/Camera'
import { BottomNav } from '@/components/layout/BottomNav'
import { agregarNuevoTrabajo, inicializarDatos, detectarTipoTrabajo } from '@/lib/intelligence'

// Material Icons memoizados
const ArrowBackIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
))

const CameraIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
))

const CheckIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
))

const EditIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
))

export default function RegisterWorkPage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    inicializarDatos()
  }, [])

  const handleImageCapture = useCallback((imageData: string) => {
    setCapturedImage(imageData)
    setShowCamera(false)
  }, [])

  const handleCameraCancel = useCallback(() => {
    setShowCamera(false)
  }, [])

  const handleSave = useCallback(async () => {
    if (!capturedImage) {
      setError('Por favor, toma una foto del trabajo')
      return
    }

    if (!description.trim()) {
      setError('Por favor, describe qué hiciste')
      return
    }

    if (description.trim().length < 5) {
      setError('La descripción es muy corta. Sé más específico.')
      return
    }

    setError(null)
    setIsAnalyzing(true)
    setShowAnalysis(true)

    try {
      // Crear título a partir de la descripción (primeras 3 palabras)
      const titulo = description.split(' ').slice(0, 3).join(' ')
      
      // Guardar trabajo localmente
      const { analysis } = await agregarNuevoTrabajo({
        title: titulo,
        description: description,
        image: capturedImage
      })

      setAnalysisResult(analysis)
      
      setTimeout(() => {
        router.push('/')
      }, 2500)

    } catch (error) {
      console.error('Error:', error)
      setError('Error al guardar. Inténtalo de nuevo')
      setIsAnalyzing(false)
      setShowAnalysis(false)
    }
  }, [capturedImage, description, router])

  if (showCamera) {
    return (
      <CameraCapture 
        onCapture={handleImageCapture}
        onCancel={handleCameraCancel}
      />
    )
  }

  return (
    <div className="container-mobile">
      {/* Top App Bar */}
      <header className="md-top-app-bar-small px-4 animate-fade-in">
        <div className="flex items-center gap-4 w-full">
          <Link href="/">
            <IconButton 
              icon={<ArrowBackIcon />}
              ariaLabel="Volver"
              variant="standard"
            />
          </Link>
          <h1 className="md-title-large text-[var(--md-sys-color-on-surface)]">
            Nuevo Trabajo
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Error */}
        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] animate-fade-in">
            <p className="md-body-medium">{error}</p>
          </div>
        )}

        {/* Analysis Feedback */}
        <AnalysisFeedback 
          isAnalyzing={isAnalyzing}
          result={analysisResult?.resultado}
        />

        {!showAnalysis && (
          <>
            {/* Image Capture */}
            <div className="mb-6 animate-fade-in-up stagger-1">
              <label className="md-label-large text-[var(--md-sys-color-on-surface)] block mb-2">
                Foto del trabajo
              </label>
              
              {capturedImage ? (
                <div className="md-card rounded-2xl overflow-hidden relative">
                  <img
                    src={capturedImage}
                    alt="Trabajo capturado"
                    className="w-full h-56 object-cover"
                  />
                  <button
                    onClick={() => setShowCamera(true)}
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-primary)] md-body-medium shadow-lg active:scale-95 transition-transform"
                  >
                    <EditIcon />
                    <span>Cambiar</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full h-56 rounded-2xl border-2 border-dashed border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface-variant)] flex flex-col items-center justify-center md-state-layer active:scale-95 transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center mb-3 animate-scale-in">
                    <CameraIcon />
                  </div>
                  <span className="md-body-large font-medium text-[var(--md-sys-color-on-surface)]">
                    Tocar para tomar foto
                  </span>
                </button>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 animate-fade-in-up stagger-2">
              <label className="md-label-large text-[var(--md-sys-color-on-surface)] block mb-2">
                ¿Qué hiciste?
              </label>
              <div className="bg-[var(--md-sys-color-surface-variant)] rounded-2xl overflow-hidden">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Arreglé el caño de la cocina..."
                  className="w-full px-4 py-4 bg-transparent md-body-large resize-none focus:outline-none text-[var(--md-sys-color-on-surface)]"
                  rows={3}
                  disabled={isAnalyzing}
                />
                <div className="px-4 pb-2 text-right">
                  <span className={`md-label-small ${description.length > 180 ? 'text-[var(--md-sys-color-error)]' : 'text-[var(--md-sys-color-on-surface-variant)]'}`}>
                    {description.length}/200
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="animate-fade-in-up stagger-3">
              <Button 
                variant="filled"
                icon={<CheckIcon />}
                onClick={handleSave}
                disabled={isAnalyzing}
                size="large"
                className="mb-3"
              >
                {isAnalyzing ? 'Guardando...' : 'Guardar Trabajo'}
              </Button>

              <Link href="/" className="block">
                <Button 
                  variant="text"
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </Link>
            </div>

            {/* Tip */}
            <div className="mt-6 p-4 rounded-2xl bg-[var(--md-sys-color-tertiary-container)] animate-fade-in-up stagger-4">
              <p className="md-body-medium text-[var(--md-sys-color-on-tertiary-container)]">
                💡 Cada foto que subes hace tu perfil más confiable
              </p>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="register-work" />
    </div>
  )
}
