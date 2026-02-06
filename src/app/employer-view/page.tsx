'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, IconButton } from '@/components/ui/Button'
import { BottomNav } from '@/components/layout/BottomNav'
import { mockWorker, mockWorkerWorks } from '@/lib/data'

// Material Icons
const ArrowBackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const VerifiedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const WorkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function EmployerViewPage() {
  const router = useRouter()

  const workImages = mockWorkerWorks.slice(0, 6).map(work => ({
    id: work.id,
    src: work.image,
    alt: work.title
  }))

  const handleContact = () => {
    alert('Contactar: +51 999 888 777')
  }

  return (
    <div className="container-mobile">
      {/* Top App Bar */}
      <header className="md-top-app-bar-small px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Link href="/">
              <IconButton 
                icon={<ArrowBackIcon />}
                ariaLabel="Volver"
                variant="standard"
              />
            </Link>
            <h1 className="md-title-large text-[var(--md-sys-color-on-surface)]">
              Perfil del Trabajador
            </h1>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--md-sys-color-tertiary-container)]">
            <span className="text-[var(--md-sys-color-on-tertiary-container)]">
              <VerifiedIcon />
            </span>
            <span className="md-label-small text-[var(--md-sys-color-on-tertiary-container)]">
              Verificado
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Profile Card */}
        <div className="md-card p-5 mb-4">
          <div className="flex items-center gap-4">
            <img 
              src={mockWorker.avatar}
              alt={mockWorker.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[var(--md-sys-color-outline-variant)]"
            />
            <div className="flex-1">
              <p className="md-headline-small text-[var(--md-sys-color-on-surface)]">
                {mockWorker.name}
              </p>
              <p className="md-body-large text-[var(--md-sys-color-on-surface-variant)]">
                {mockWorker.trade}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-[var(--md-sys-color-primary)]">
                  <StarIcon />
                  <span className="md-label-large font-bold">{mockWorker.reputation.toFixed(1)}</span>
                </div>
                <span className="text-[var(--md-sys-color-outline)]">•</span>
                <span className="md-label-medium text-[var(--md-sys-color-on-surface-variant)]">
                  {mockWorkerWorks.length} trabajos
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around mt-5 pt-4 border-t border-[var(--md-sys-color-outline-variant)]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <WorkIcon />
                <span className="md-title-medium font-bold">{mockWorkerWorks.length}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Trabajos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <CalendarIcon />
                <span className="md-title-medium font-bold">{mockWorker.stats.monthsActive}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Meses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-[var(--md-sys-color-on-surface)]">
                <MapPinIcon />
                <span className="md-title-medium font-bold">{mockWorker.stats.zonesCovered}</span>
              </div>
              <p className="md-body-small text-[var(--md-sys-color-on-surface-variant)]">Zonas</p>
            </div>
          </div>
        </div>

        {/* Works Gallery */}
        <div className="mb-6">
          <h3 className="md-title-medium text-[var(--md-sys-color-on-surface)] mb-3">
            Trabajos Recientes
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {workImages.map((image) => (
              <div 
                key={image.id} 
                className="md-card aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="rounded-2xl p-4 mb-6 bg-[var(--md-sys-color-secondary-container)]">
          <h3 className="md-title-small text-[var(--md-sys-color-on-secondary-container)] mb-3">
            ¿Por qué confiar?
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary)] flex items-center justify-center">
                <VerifiedIcon />
              </div>
              <p className="md-body-medium text-[var(--md-sys-color-on-secondary-container)]">
                Verificado con trabajos reales
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary)] flex items-center justify-center">
                <StarIcon />
              </div>
              <p className="md-body-medium text-[var(--md-sys-color-on-secondary-container)]">
                {mockWorker.reputation.toFixed(1)} estrellas de reputación
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--md-sys-color-secondary)] flex items-center justify-center">
                <MapPinIcon />
              </div>
              <p className="md-body-medium text-[var(--md-sys-color-on-secondary-container)]">
                Trabaja en Arequipa y zonas cercanas
              </p>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <Button 
          variant="filled"
          icon={<PhoneIcon />}
          onClick={handleContact}
          size="large"
          className="mb-3"
        >
          Contactar Ahora
        </Button>

        <Button 
          variant="outlined"
          onClick={() => router.push('/')}
          size="large"
        >
          Volver al Inicio
        </Button>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </div>
  )
}
