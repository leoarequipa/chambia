interface AnalysisFeedbackProps {
  isAnalyzing?: boolean
  result?: {
    mensajePositivo: string
    nuevaInsignia?: string
    mejoraReputacion: number
  }
}

// Material Icons
const LoadingIcon = () => (
  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
)

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

export function AnalysisFeedback({ isAnalyzing, result }: AnalysisFeedbackProps) {
  if (isAnalyzing) {
    return (
      <div 
        className="mb-4 p-4 rounded-2xl flex items-center gap-4"
        style={{
          backgroundColor: 'var(--md-sys-color-primary-container)',
        }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ color: 'var(--md-sys-color-on-primary-container)' }}
        >
          <LoadingIcon />
        </div>
        <div>
          <p className="md-title-small" style={{ color: 'var(--md-sys-color-on-primary-container)' }}>
            Mejorando tu perfil...
          </p>
          <p className="md-body-medium opacity-70" style={{ color: 'var(--md-sys-color-on-primary-container)' }}>
            Un momento, por favor
          </p>
        </div>
      </div>
    )
  }

  if (!result) return null

  return (
    <>
      {/* Success Message */}
      <div 
        className="mb-4 p-4 rounded-2xl"
        style={{
          backgroundColor: 'var(--md-sys-color-secondary-container)',
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--md-sys-color-secondary)',
              color: 'var(--md-sys-color-on-secondary)',
            }}
          >
            <CheckCircleIcon />
          </div>
          <div className="flex-1">
            <p className="md-title-small" style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>
              {result.mensajePositivo}
            </p>
            {result.mejoraReputacion > 0 && (
              <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>
                <StarIcon />
                <span className="md-body-medium opacity-80">
                  Tu reputación subió +{result.mejoraReputacion}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Badge */}
      {result.nuevaInsignia && (
        <div 
          className="mb-4 p-4 rounded-2xl"
          style={{
            backgroundColor: 'var(--md-sys-color-tertiary-container)',
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--md-sys-color-tertiary)',
                color: 'var(--md-sys-color-on-tertiary)',
              }}
            >
              <TrophyIcon />
            </div>
            <div>
              <p className="md-title-small" style={{ color: 'var(--md-sys-color-on-tertiary-container)' }}>
                ¡Nueva insignia desbloqueada!
              </p>
              <p className="md-body-medium opacity-80" style={{ color: 'var(--md-sys-color-on-tertiary-container)' }}>
                {result.nuevaInsignia}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
