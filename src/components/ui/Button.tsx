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

  // Material Design 3 Button Styles
  const sizeClasses = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-4 text-sm',
    large: 'h-14 px-6 text-base',
  }

  const variants = {
    filled: `
      bg-[var(--md-sys-color-primary)] 
      text-[var(--md-sys-color-on-primary)]
      shadow-none
      hover:shadow-md
      active:shadow-none
    `,
    tonal: `
      bg-[var(--md-sys-color-secondary-container)] 
      text-[var(--md-sys-color-on-secondary-container)]
      shadow-none
      hover:shadow-sm
    `,
    outlined: `
      bg-transparent
      text-[var(--md-sys-color-primary)]
      border border-[var(--md-sys-color-outline)]
      hover:bg-[var(--md-sys-color-primary)]/5
    `,
    text: `
      bg-transparent
      text-[var(--md-sys-color-primary)]
      hover:bg-[var(--md-sys-color-primary)]/5
      px-3
    `,
    elevated: `
      bg-[var(--md-sys-color-surface)]
      text-[var(--md-sys-color-primary)]
      shadow-md
      hover:shadow-lg
      hover:bg-[var(--md-sys-color-primary)]/5
    `,
  }

  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-medium
    rounded-full
    transition-all
    duration-200
    select-none
    ripple
    md-state-layer
    disabled:opacity-40
    disabled:cursor-not-allowed
    disabled:hover:shadow-none
    active:scale-[0.98]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--md-sys-color-primary)]
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

// Material 3 FAB (Floating Action Button)
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
    primary: 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]',
    secondary: 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]',
    tertiary: 'bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-on-tertiary-container)]',
    surface: 'bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-primary)]',
  }

  const sizes = {
    small: 'w-10 h-10',
    standard: 'w-14 h-14',
    large: 'w-24 h-24',
  }

  const iconSizes = {
    small: 'w-5 h-5',
    standard: 'w-6 h-6',
    large: 'w-9 h-9',
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${sizes[size]}
        ${variants[variant]}
        rounded-[16px]
        shadow-lg
        hover:shadow-xl
        active:shadow-md
        active:scale-95
        transition-all
        duration-200
        flex
        items-center
        justify-center
        md-state-layer
        ripple
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--md-sys-color-primary)]
        focus-visible:ring-offset-2
        ${className}
      `}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </button>
  )
}

// Material 3 Icon Button
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
      ? 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]'
      : 'bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)]',
    tonal: selected
      ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]'
      : 'bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)]',
    outlined: selected
      ? 'bg-[var(--md-sys-color-inverse-surface)] text-[var(--md-sys-color-inverse-on-surface)] border border-[var(--md-sys-color-outline)]'
      : 'bg-transparent text-[var(--md-sys-color-on-surface-variant)] border border-[var(--md-sys-color-outline)]',
    standard: selected
      ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]'
      : 'bg-transparent text-[var(--md-sys-color-on-surface-variant)]',
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={`
        w-10
        h-10
        rounded-full
        flex
        items-center
        justify-center
        transition-all
        duration-200
        md-state-layer
        ripple
        hover:bg-black/5
        active:scale-95
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--md-sys-color-primary)]
        ${variants[variant]}
        ${className}
      `}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
    </button>
  )
}
