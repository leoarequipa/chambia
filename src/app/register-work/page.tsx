'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { UploadArea } from '@/components/ui/Form'
import { AnalysisFeedback } from '@/components/ui/AnalysisFeedback'
import { BottomNav } from '@/components/layout/BottomNav'
import { analizarNuevoTrabajo } from '@/lib/intelligence'

export default function RegisterWorkPage() {
  const router = useRouter()
  const [hasImage, setHasImage] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [description, setDescription] = useState('')

  const handleImageUpload = () => {
    setHasImage(!hasImage)
  }

  const handleSave = async () => {
    if (!hasImage || !description.trim()) {
      alert('Por favor, toma una foto y di qué hiciste')
      return
    }

    setIsAnalyzing(true)
    setShowAnalysis(true)

    try {
      // Detectar tipo automáticamente desde descripción
      const workType = detectarTipoTrabajo(description)
      
      // Crear imagen del trabajo
      const imageUrl = `https://via.placeholder.com/400x200/${Math.random().toString(16).substr(2, 6).toUpperCase()}/FFFFFF?text=${encodeURIComponent(workType)}`

      // Analizar trabajo basado en hechos reales
      const analysis = await analizarNuevoTrabajo({
        titulo: workType,
        descripcion: description,
        tipo: workType,
        imagen: imageUrl
      })

      setAnalysisResult(analysis)
      
      // Mostrar feedback y redirigir
      setTimeout(() => {
        alert('¡Trabajo guardado! 🎉 Tu perfil está mejorando')
        router.push('/')
      }, 3000)

    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar. Inténtalo de nuevo')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Detectar tipo de trabajo real desde descripción
  const detectarTipoTrabajo = (desc: string): string => {
    const texto = desc.toLowerCase()
    
    if (texto.includes('caño') || texto.includes('tubería') || texto.includes('grifo')) 
      return 'Gasfitería'
    if (texto.includes('muro') || texto.includes('pared') || texto.includes('ladrillo')) 
      return 'Construcción'
    if (texto.includes('luz') || texto.includes('cable') || texto.includes('toma')) 
      return 'Electricidad'
    if (texto.includes('pintar') || texto.includes('color')) 
      return 'Pintura'
    
    return 'Trabajo'
  }

  return (
    <div className="container-mobile">
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-orange-500 mb-2">📸 Nuevo Trabajo</h1>
        <p className="text-gray-600 text-base">Muestra lo que hiciste hoy</p>
      </header>

      <main className="main-content py-6">
        {/* Feedback del análisis - solo resultados positivos */}
        <AnalysisFeedback 
          isAnalyzing={isAnalyzing}
          result={analysisResult?.resultado}
        />

        {!showAnalysis && (
          <>
            <UploadArea hasImage={hasImage} onClick={handleImageUpload} />

            {/* Solo un campo - el usuario se enfoca en lo importante */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-slate-800 text-base">
                ¿Qué hiciste?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Arreglé el caño de la cocina"
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                rows={3}
              />
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

            {/* Mensaje simple y humano */}
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