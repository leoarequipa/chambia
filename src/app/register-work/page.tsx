'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AnalysisFeedback } from '@/components/ui/AnalysisFeedback'
import { CameraCapture } from '@/components/ui/Camera'
import { BottomNav } from '@/components/layout/BottomNav'
import { analizarNuevoTrabajo, inicializarDatos } from '@/lib/intelligence'

export default function RegisterWorkPage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Inicializar datos al cargar
  useEffect(() => {
    inicializarDatos()
  }, [])

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setShowCamera(false)
  }

  const handleCameraCancel = () => {
    setShowCamera(false)
  }

  const handleSave = async () => {
    // Validaciones
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
      // Detectar tipo automáticamente desde descripción
      const workType = detectarTipoTrabajo(description)
      
      // Analizar trabajo basado en hechos reales
      const analysis = await analizarNuevoTrabajo({
        titulo: workType,
        descripcion: description,
        tipo: workType,
        imagen: capturedImage // Imagen real capturada
      })

      setAnalysisResult(analysis)
      
      // Mostrar feedback y redirigir
      setTimeout(() => {
        router.push('/')
      }, 3000)

    } catch (error) {
      console.error('Error:', error)
      setError('Error al guardar. Inténtalo de nuevo')
      setIsAnalyzing(false)
      setShowAnalysis(false)
    }
  }

  // Detectar tipo de trabajo real desde descripción
  const detectarTipoTrabajo = (desc: string): string => {
    const texto = desc.toLowerCase()
    
    if (texto.includes('caño') || texto.includes('tubería') || texto.includes('grifo') || texto.includes('fuga') || texto.includes('agua')) 
      return 'Gasfitería'
    if (texto.includes('muro') || texto.includes('pared') || texto.includes('ladrillo') || texto.includes('cemento') || texto.includes('construcción')) 
      return 'Construcción'
    if (texto.includes('luz') || texto.includes('cable') || texto.includes('toma') || texto.includes('enchufe') || texto.includes('corriente')) 
      return 'Electricidad'
    if (texto.includes('pintar') || texto.includes('color') || texto.includes('brocha') || texto.includes('pintura')) 
      return 'Pintura'
    if (texto.includes('puerta') || texto.includes('ventana') || texto.includes('madera') || texto.includes('cerrajería'))
      return 'Carpintería'
    
    return 'Trabajo General'
  }

  // Si la cámara está activa, mostrar solo el componente de cámara
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
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">📸 Nuevo Trabajo</h1>
        <p className="text-gray-600 text-base">Muestra lo que hiciste hoy</p>
      </header>

      <main id="main-content" className="main-content py-6" role="main" aria-label="Formulario de registro de trabajo">
        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Feedback del análisis */}
        <AnalysisFeedback 
          isAnalyzing={isAnalyzing}
          result={analysisResult?.resultado}
        />

        {!showAnalysis && (
          <>
            {/* Área de captura de imagen */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-slate-800 text-base">
                Foto del trabajo
              </label>
              
              {capturedImage ? (
                <div className="relative">
                  <img
                    src={capturedImage}
                    alt="Trabajo capturado"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setShowCamera(true)}
                    className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    Cambiar foto
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-4xl mb-2">📷</div>
                  <span className="text-gray-600 font-medium">Tocar para tomar foto</span>
                  <span className="text-gray-400 text-sm mt-1">Usa la cámara de tu celular</span>
                </button>
              )}
            </div>

            {/* Campo de descripción */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-slate-800 text-base">
                ¿Qué hiciste?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Arreglé el caño de la cocina que tenía fuga"
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                rows={3}
                disabled={isAnalyzing}
              />
              <p className="text-gray-400 text-sm mt-1">
                {description.length}/200 caracteres
              </p>
            </div>

            <Button 
              variant="primary"
              icon="✅"
              onClick={handleSave}
              disabled={isAnalyzing}
              className="mb-3"
            >
              {isAnalyzing ? 'Mejorando tu perfil...' : 'Guardar Trabajo'}
            </Button>

            <Link href="/">
              <Button 
                variant="outline"
                disabled={isAnalyzing}
                className="w-full"
              >
                Cancelar
              </Button>
            </Link>

            {/* Tip */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Cada foto que subes hace tu perfil más confiable
              </p>
            </div>
          </>
        )}
      </main>

      <BottomNav activeTab="register-work" />
    </div>
  )
}
