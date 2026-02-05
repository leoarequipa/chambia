interface AnalysisFeedbackProps {
  isAnalyzing?: boolean
  result?: {
    mensajePositivo: string
    nuevaInsignia?: string
    mejoraReputacion: number
  }
}

export function AnalysisFeedback({ isAnalyzing, result }: AnalysisFeedbackProps) {
  if (isAnalyzing) {
    return (
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <div>
            <p className="font-semibold text-blue-800 text-base">Mejorando tu perfil...</p>
            <p className="text-sm text-blue-600">Un momento, por favor</p>
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

  return (
    <>
      {/* Mensaje principal - positivo y motivador */}
      <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-3">
          <div className="text-2xl">✨</div>
          <div>
            <p className="font-semibold text-green-800 text-base">{result.mensajePositivo}</p>
            {result.mejoraReputacion > 0 && (
              <p className="text-sm text-green-600">
                Tu reputación subió +{result.mejoraReputacion} ⭐
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Insignia desbloqueada - si aplica */}
      {result.nuevaInsignia && (
        <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <p className="font-semibold text-yellow-800 text-base">¡Nueva insignia!</p>
              <p className="text-sm text-yellow-600">{result.nuevaInsignia}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}