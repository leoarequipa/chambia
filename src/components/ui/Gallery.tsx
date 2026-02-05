interface GalleryProps {
  images: Array<{
    id: string
    src: string
    alt: string
  }>
}

export function Gallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {images.map((image) => (
        <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-sm">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}