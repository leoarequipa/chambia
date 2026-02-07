import { ReactNode, useRef } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  ariaLabel?: string
  ariaPressed?: boolean
  ariaExpanded?: boolean
  ariaControls?: string
  size?: 'small' | 'medium' | 'large'
}

export function Button({
  children,
  variant = 'filled',
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaControls,
  size = 'medium',
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    button.style.setProperty('--x', `${x}px`)
    button.style.setProperty('--y', `${y}px`)
  }

  // Size classes
  const sizeClasses = {
    small: 'h-9 px-4 text-sm',
    medium: 'h-11 px-5 text-base',
    large: 'h-14 px-8 text-lg',
  }

  // Variant styles
  const variants = {
    filled: `
      bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)]
      text-white
      shadow-lg shadow-[var(--primary-500)]/25
      hover:shadow-xl hover:shadow-[var(--primary-500)]/30
      active:shadow-md
    `,
    tonal: `
      bg-[var(--neutral-100)]
      text-[var(--text-primary)]
      hover:bg-[var(--neutral-200)]
    `,
    outlined: `
      bg-transparent
      text-[var(--primary-500)]
      border-2 border-[var(--neutral-200)]
      hover:border-[var(--primary-300)]
      hover:bg-[var(--primary-50)]
    `,
    text: `
      bg-transparent
      text-[var(--primary-500)]
      hover:bg-[var(--primary-50)]
      px-3
    `,
    elevated: `
      bg-white
      text-[var(--text-primary)]
      shadow-md
      hover:shadow-lg
      hover:-translate-y-0.5
    `,
  }

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-semibold
    rounded-full
    transition-all
    duration-200
    select-none
    ripple
    pressable
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:shadow-none
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--primary-500)]
    focus-visible:ring-offset-2
    min-w-[48px]
  `

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={(e) => {
        handleRipple(e)
        onClick?.()
      }}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-disabled={disabled}
    >
      {icon && (
        <span 
          className="flex items-center justify-center w-5 h-5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="tracking-wide">{children}</span>
    </button>
  )
}

// Modern FAB (Floating Action Button)
interface FABProps {
  icon: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'surface'
  size?: 'small' | 'standard' | 'large'
  ariaLabel: string
  className?: string
}

export function FAB({
  icon,
  onClick,
  variant = 'primary',
  size = 'standard',
  ariaLabel,
  className = '',
}: FABProps) {
  const variants = {
    primary: 'bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] text-white shadow-lg shadow-[var(--primary-500)]/30',
    secondary: 'bg-gradient-to-br from-[var(--accent-secondary)] to-[#4F46E5] text-white shadow-lg shadow-indigo-500/30',
    tertiary: 'bg-gradient-to-br from-[var(--accent-tertiary)] to-[#7C3AED] text-white shadow-lg shadow-purple-500/30',
    surface: 'bg-white text-[var(--text-primary)] shadow-lg',
  }

  const sizes = {
    small: 'w-12 h-12',
    standard: 'w-14 h-14',
    large: 'w-16 h-16',
  }

  const iconSizes = {
    small: 'w-5 h-5',
    standard: 'w-6 h-6',
    large: 'w-7 h-7',
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${sizes[size]}
        ${variants[variant]}
        rounded-2xl
        hover:shadow-xl
        hover:-translate-y-1
        active:translate-y-0
        active:scale-95
        transition-all
        duration-200
        flex
        items-center
        justify-center
        pressable
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--primary-500)]
        focus-visible:ring-offset-2
        ${className}
      `}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </button>
  )
}

// Modern Icon Button
interface IconButtonProps {
  icon: ReactNode
  onClick?: () => void
  variant?: 'filled' | 'tonal' | 'outlined' | 'standard'
  selected?: boolean
  ariaLabel: string
  className?: string
}

export function IconButton({
  icon,
  onClick,
  variant = 'standard',
  selected = false,
  ariaLabel,
  className = '',
}: IconButtonProps) {
  const variants = {
    filled: selected
      ? 'bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] text-white shadow-md'
      : 'bg-[var(--neutral-100)] text-[var(--text-secondary)]',
    tonal: selected
      ? 'bg-[var(--primary-100)] text-[var(--primary-600)]'
      : 'bg-[var(--neutral-100)] text-[var(--text-secondary)]',
    outlined: selected
      ? 'bg-[var(--primary-50)] text-[var(--primary-600)] border-2 border-[var(--primary-500)]'
      : 'bg-transparent text-[var(--text-secondary)] border-2 border-[var(--neutral-200)]',
    standard: selected
      ? 'bg-[var(--primary-100)] text-[var(--primary-600)]'
      : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]',
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`
        w-11
        h-11
        rounded-xl
        flex
        items-center
        justify-center
        transition-all
        duration-200
        pressable
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--primary-500)]
        ${variants[variant]}
        ${className}
      `}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
    </button>
  )
}
