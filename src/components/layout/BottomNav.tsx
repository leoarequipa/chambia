'use client'

import Link from 'next/link'

interface BottomNavProps {
  activeTab: 'home' | 'register-work' | 'profile' | 'history'
}

// Modern Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} />
    <polyline points="9 22 9 12 15 12 15 22" stroke={active ? "white" : "currentColor"} />
  </svg>
)

const AddIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill={active ? "currentColor" : "none"} />
    <line x1="12" y1="8" x2="12" y2="16" stroke={active ? "white" : "currentColor"} />
    <line x1="8" y1="12" x2="16" y2="12" stroke={active ? "white" : "currentColor"} />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={active ? "currentColor" : "none"} />
    <circle cx="12" cy="7" r="4" fill={active ? "currentColor" : "none"} />
  </svg>
)

const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill={active ? "currentColor" : "none"} />
    <polyline points="12 6 12 12 16 14" stroke={active ? "white" : "currentColor"} />
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* Glassmorphism background - centered */}
      <div className="w-full max-w-[430px] pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl border-t border-[var(--neutral-200)] px-2 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="h-[72px] flex items-center justify-around">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon
              
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="flex-1 flex justify-center"
                >
                  <div
                    className={`
                      flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl
                      transition-all duration-200 ease-out cursor-pointer
                      active:scale-95
                      ${isActive 
                        ? 'text-[var(--primary-500)]' 
                        : 'text-[var(--text-tertiary)]'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-[var(--primary-100)]' 
                        : 'bg-transparent'
                      }
                    `}>
                      <Icon active={isActive} />
                    </div>
                    
                    {/* Label */}
                    <span className={`
                      text-[11px] font-medium transition-all duration-200
                      ${isActive ? 'opacity-100' : 'opacity-70'}
                    `}>
                      {tab.label}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
