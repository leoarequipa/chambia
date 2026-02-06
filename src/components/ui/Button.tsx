import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  ariaLabel?: string
  ariaPressed?: boolean
  ariaExpanded?: boolean
  ariaControls?: string
}

export function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaControls,
}: ButtonProps) {
  const baseClasses = 'w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 min-h-[60px] px-6 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'

  const variants = {
    primary: 'bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800',
    outline: 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-disabled={disabled}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
}