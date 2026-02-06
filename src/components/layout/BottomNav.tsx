'use client'

import Link from 'next/link'

interface BottomNavProps {
  activeTab: 'home' | 'register-work' | 'profile' | 'history'
}

// Material Design 3 Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M6 19.5V10h-2l8-6 8 6h-2v9.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 6 19.5z" 
      fill={active ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12h6v10" 
      fill={active ? "currentColor" : "none"}
      stroke={active ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

const AddIcon = ({ active }: { active: boolean }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill={active ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2"
    />
    <line 
      x1="12" 
      y1="8" 
      x2="12" 
      y2="16" 
      stroke={active ? "white" : "currentColor"} 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line 
      x1="8" 
      y1="12" 
      x2="16" 
      y2="12" 
      stroke={active ? "white" : "currentColor"} 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
      fill={active ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle 
      cx="12" 
      cy="7" 
      r="4" 
      fill={active ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill={active ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2"
    />
    <polyline 
      points="12 6 12 12 16 14" 
      stroke={active ? "white" : "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export function BottomNav({ activeTab }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Inicio', icon: HomeIcon, href: '/' },
    { id: 'register-work' as const, label: 'Nuevo', icon: AddIcon, href: '/register-work' },
    { id: 'history' as const, label: 'Historial', icon: HistoryIcon, href: '/history' },
    { id: 'profile' as const, label: 'Perfil', icon: ProfileIcon, href: '/profile' },
  ]

  return (
    <nav className="bottom-nav-container">
      <div className="max-w-[430px] mx-auto h-full flex items-center justify-around px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex-1"
            >
              <div
                className={`
                  flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl
                  transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]' 
                    : 'text-[var(--md-sys-color-on-surface-variant)] hover:bg-black/5'
                  }
                `}
              >
                <span className={`
                  flex items-center justify-center transition-transform duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}>
                  <Icon active={isActive} />
                </span>
                <span className={`
                  text-xs font-medium
                  ${isActive ? 'opacity-100' : 'opacity-70'}
                `}>
                  {tab.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
