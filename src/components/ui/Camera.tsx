'use client'

import { useState, useRef, useCallback } from 'react'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onCancel: () => void
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Intentar usar la cámara trasera en móviles
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('No se pudo acceder a la cámara. Asegúrate de dar permisos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      // Configurar canvas con las dimensiones del video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Dibujar el frame actual del video en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convertir a base64 con compresión
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  const retakePhoto = useCallback(() => {
    setCapturedImage(null)
    startCamera()
  }, [startCamera])

  const confirmPhoto = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage)
    }
  }, [capturedImage, onCapture])

  // Iniciar cámara automáticamente al montar
  useState(() => {
    startCamera()
  })

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black">
        <button
          onClick={() => {
            stopCamera()
            onCancel()
          }}
          className="text-white p-2"
          aria-label="Cerrar cámara"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-white font-semibold">Tomar Foto</span>
        <div className="w-10" />
      </div>

      {/* Error */}
      {error && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
            <p className="text-white">Iniciando cámara...</p>
          </div>
        </div>
      )}

      {/* Vista previa de la cámara */}
      {!error && !isLoading && !capturedImage && (
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={() => setIsLoading(false)}
          />
          
          {/* Guía de enfoque */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-white/50 rounded-lg">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 -mt-1 -ml-1" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500 -mt-1 -mr-1" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500 -mb-1 -ml-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 -mb-1 -mr-1" />
            </div>
          </div>

          {/* Controles */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <button
              onClick={capturePhoto}
              className="w-20 h-20 rounded-full bg-white border-4 border-orange-500 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Tomar foto"
            >
              <div className="w-16 h-16 rounded-full bg-orange-500" />
            </button>
          </div>
        </div>
      )}

      {/* Vista previa de la foto capturada */}
      {capturedImage && (
        <div className="flex-1 relative">
          <img
            src={capturedImage}
            alt="Foto capturada"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
          
          {/* Controles */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 bg-gray-600 text-white rounded-full font-semibold"
            >
              Volver a tomar
            </button>
            <button
              onClick={confirmPhoto}
              className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold"
            >
              Usar foto
            </button>
          </div>
        </div>
      )}

      {/* Canvas oculto para procesamiento */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
