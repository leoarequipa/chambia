'use client'

import { memo } from 'react'

// Skeleton para tarjetas
export const CardSkeleton = memo(function CardSkeleton() {
  return (
    <div className="md-card rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[var(--md-sys-color-surface-variant)]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[var(--md-sys-color-surface-variant)] rounded w-3/4" />
          <div className="h-3 bg-[var(--md-sys-color-surface-variant)] rounded w-1/2" />
        </div>
      </div>
    </div>
  )
})

// Skeleton para grid de imágenes
export const ImageGridSkeleton = memo(function ImageGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="aspect-square rounded-2xl bg-[var(--md-sys-color-surface-variant)] animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  )
})

// Skeleton para lista
export const ListSkeleton = memo(function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="md-card rounded-2xl p-3 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-xl bg-[var(--md-sys-color-surface-variant)]" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-[var(--md-sys-color-surface-variant)] rounded w-3/4" />
              <div className="h-3 bg-[var(--md-sys-color-surface-variant)] rounded w-full" />
              <div className="h-3 bg-[var(--md-sys-color-surface-variant)] rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

// Skeleton para perfil
export const ProfileSkeleton = memo(function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="md-card rounded-3xl p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[var(--md-sys-color-surface-variant)]" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-[var(--md-sys-color-surface-variant)] rounded w-2/3" />
            <div className="h-4 bg-[var(--md-sys-color-surface-variant)] rounded w-1/2" />
            <div className="h-3 bg-[var(--md-sys-color-surface-variant)] rounded w-1/3" />
          </div>
        </div>
        <div className="flex justify-around mt-6 pt-4 border-t border-[var(--md-sys-color-outline-variant)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="h-6 w-12 mx-auto bg-[var(--md-sys-color-surface-variant)] rounded" />
              <div className="h-3 w-16 mx-auto bg-[var(--md-sys-color-surface-variant)] rounded" />
            </div>
          ))}
        </div>
      </div>
      <ImageGridSkeleton count={6} />
    </div>
  )
})

// Skeleton para página completa
export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-16 bg-[var(--md-sys-color-surface-variant)] rounded-2xl" />
      <div className="h-32 bg-[var(--md-sys-color-surface-variant)] rounded-2xl" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-24 bg-[var(--md-sys-color-surface-variant)] rounded-2xl" />
        <div className="h-24 bg-[var(--md-sys-color-surface-variant)] rounded-2xl" />
      </div>
      <div className="h-48 bg-[var(--md-sys-color-surface-variant)] rounded-2xl" />
    </div>
  )
})
