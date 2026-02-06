/**
 * Componentes y utilidades de accesibilidad
 */

import { ReactNode } from 'react'

/**
 * Skip Link para navegación por teclado
 * Permite saltar al contenido principal
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-orange-500 text-white px-4 py-2 rounded-lg z-[100] 
                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    >
      Saltar al contenido principal
    </a>
  )
}

/**
 * Envuelve el contenido principal y le asigna el ID para skip link
 */
export function MainContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <main id="main-content" className={className} role="main">
      {children}
    </main>
  )
}

/**
 * Componente para mensajes de estado en vivo (screen readers)
 */
export function LiveRegion({ 
  children, 
  politeness = 'polite',
  id 
}: { 
  children: ReactNode
  politeness?: 'polite' | 'assertive'
  id: string
}) {
  return (
    <div
      id={id}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  )
}

/**
 * Form field accesible con label, error y descripción
 */
interface AccessibleFieldProps {
  id: string
  label: string
  children: ReactNode
  error?: string
  description?: string
  required?: boolean
}

export function AccessibleField({
  id,
  label,
  children,
  error,
  description,
  required = false,
}: AccessibleFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const descId = description ? `${id}-description` : undefined
  const ariaDescribedBy = [descId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="mb-4">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="obligatorio">*</span>}
      </label>
      
      {description && (
        <p id={descId} className="text-sm text-gray-500 mb-1">
          {description}
        </p>
      )}
      
      {React.cloneElement(children as React.ReactElement, {
        id,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': !!error,
        'aria-required': required,
      })}
      
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Loading spinner accesible
 */
export function AccessibleSpinner({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
      <span className="sr-only">{label}</span>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  )
}

/**
 * Alert accesible
 */
interface AccessibleAlertProps {
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
}

export function AccessibleAlert({ children, type = 'info', title }: AccessibleAlertProps) {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }

  const role = type === 'error' ? 'alert' : 'status'

  return (
    <div
      role={role}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`p-4 rounded-lg border ${typeStyles[type]}`}
    >
      {title && <p className="font-bold mb-1">{title}</p>}
      {children}
    </div>
  )
}

/**
 * Modal accesible
 */
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  description?: string
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  description,
}: AccessibleModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 id="modal-title" className="text-xl font-bold mb-2">
          {title}
        </h2>
        {description && (
          <p id="modal-description" className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
