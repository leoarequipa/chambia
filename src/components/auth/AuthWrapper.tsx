'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/onboarding']
    const isPublicRoute = publicRoutes.includes(pathname)

    // Verificar autenticación
    const authenticated = isAuthenticated()
    setIsAuth(authenticated)

    if (!authenticated && !isPublicRoute) {
      // Redirigir a onboarding si no está autenticado
      router.push('/onboarding')
    } else if (authenticated && isPublicRoute) {
      // Redirigir al home si está autenticado y está en ruta pública
      router.push('/')
    }

    setIsLoading(false)
  }, [pathname, router])

  // Rutas públicas siempre se muestran
  const publicRoutes = ['/onboarding']
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Solo mostrar contenido si está autenticado
  if (!isAuth) {
    return null // El useEffect ya redirigirá
  }

  return <>{children}</>
}
