'use client'

interface TopBarProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function TopBar({ title = "ChambIA", showBackButton = false, onBack }: TopBarProps) {
  return (
    <div 
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2B 100%)',
        paddingTop: 'max(12px, env(safe-area-inset-top, 0px))',
        paddingBottom: '12px',
        paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="flex items-center justify-between h-12">
        {showBackButton ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        ) : (
          <div className="w-10" /> // Spacer
        )}
        
        <h1 className="text-xl font-bold text-white">
          {title}
        </h1>
        
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>
    </div>
  )
}
