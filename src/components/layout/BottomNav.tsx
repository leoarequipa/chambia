'use client'

import { useState } from 'react'
import Link from 'next/link'

interface BottomNavProps {
  activeTab: string
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: '🏠', href: '/' },
    { id: 'register-work', label: 'Añadir', icon: '➕', href: '/register-work' },
    { id: 'profile', label: 'Perfil', icon: '👤', href: '/profile' },
    { id: 'history', label: 'Todos', icon: '📋', href: '/history' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-[430px] mx-auto px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors
                ${activeTab === tab.id ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}