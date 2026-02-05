interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'textarea'
  placeholder?: string
}

export function FormField({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  placeholder
}: FormFieldProps) {
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-slate-800 text-base">
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
          rows={3}
        />
      </div>
    )
  }

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold text-slate-800 text-base">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
      />
    </div>
  )
}

interface UploadAreaProps {
  hasImage: boolean
  onClick: () => void
}

export function UploadArea({ hasImage, onClick }: UploadAreaProps) {
  return (
    <div
      onClick={onClick}
      className={`border-3 ${hasImage ? 'border-green-500 bg-white' : 'border-dashed border-gray-400 bg-gray-100'} 
        rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-orange-500 
        hover:bg-orange-50 mb-4`}
    >
      {hasImage ? (
        <>
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-base">¡Foto lista!</p>
          <p className="text-gray-600 text-sm">Toca para cambiar</p>
        </>
      ) : (
        <>
          <div className="text-4xl mb-2">📷</div>
          <p className="font-bold text-base">Toma una foto</p>
          <p className="text-gray-600 text-sm">Toca aquí para capturar</p>
        </>
      )}
    </div>
  )
}