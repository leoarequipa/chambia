// Sistema inteligente de ChambIA - Todo se basa en hechos reales
// El usuario siente: "Mi perfil mejora mientras trabajo"

export interface AnalysisResult {
  tipoDetectado: string
  experiencia: number
  consistencia: number
  mejoraReputacion: number
  mensajePositivo?: string
  nuevaInsignia?: string
}

export interface TrabajoAnalizado {
  titulo: string
  descripcion: string
  imagen: string
  tipoSeleccionado: string
  trabajosAnteriores: {
    tipo: string
    descripcion: string
    fecha: string
  }[]
}

class AnalizadorChambIA {
  // Palabras clave según el trabajo real
  private readonly PALABRAS_REALES = {
    gasfiteria: [
      'caño', 'tubería', 'grifo', 'fuga', 'instalación', 'agua', 
      'desagüe', 'cocina', 'baño', 'lavatorio', 'ducha', 'tanque'
    ],
    construccion: [
      'muro', 'pared', 'ladrillo', 'cemento', 'concreto', 'columna',
      'vigas', 'techo', 'estructura', 'cimientos', 'encofrado'
    ],
    electricidad: [
      'cable', 'luz', 'interruptor', 'toma', 'corriente', 'instalación',
      'break', 'fusible', 'llave', 'lámpara', 'aplique'
    ],
    pintura: [
      'pintar', 'color', 'pared', 'techo', 'impermeabilizante', 'brocha',
      'rodillo', 'sellador', 'textura', 'acabado'
    ]
  }

  // Analiza trabajo basado en hechos reales
  analizarTrabajo(trabajo: TrabajoAnalizado): AnalysisResult {
    const tipoDetectado = this.detectarTipoReal(trabajo.titulo, trabajo.descripcion)
    const consistencia = this.calcularConsistenciaReal(trabajo.tipoSeleccionado, tipoDetectado, trabajo.trabajosAnteriores)
    const experiencia = this.calcularExperienciaReal(trabajo.trabajosAnteriores)
    const mejoraReputacion = this.calcularMejoraReputacion(consistencia, experiencia)
    
    return {
      tipoDetectado,
      experiencia,
      consistencia,
      mejoraReputacion,
      mensajePositivo: this.getMensajeMotivacional(mejoraReputacion, experiencia),
      nuevaInsignia: this.verificarInsignias(experiencia, consistencia)
    }
  }

  // Detecta el tipo real desde lo que escribió el trabajador
  private detectarTipoReal(titulo: string, descripcion: string): string {
    const texto = `${titulo} ${descripcion}`.toLowerCase()
    
    for (const [tipo, palabras] of Object.entries(this.PALABRAS_REALES)) {
      const coincidencias = palabras.filter(palabra => texto.includes(palabra)).length
      if (coincidencias >= 2) return this.formatearNombreTipo(tipo)
    }
    
    return 'Trabajo'
  }

  // Calcula consistencia basada en hechos reales
  private calcularConsistenciaReal(tipoUsuario: string, tipoDetectado: string, trabajosAnteriores: any[]): number {
    let puntaje = 0
    
    // ¿Coincide lo que dice con lo que realmente es?
    if (this.normalizarTipo(tipoUsuario) === this.normalizarTipo(tipoDetectado)) {
      puntaje += 30
    }
    
    // ¿Es consistente con trabajos anteriores?
    if (trabajosAnteriores.length > 0) {
      const tiposRecientes = trabajosAnteriores.slice(-5).map(t => this.normalizarTipo(t.tipo))
      const tipoMasFrecuente = this.getMasFrecuente(tiposRecientes)
      
      if (this.normalizarTipo(tipoUsuario) === tipoMasFrecuente) {
        puntaje += 40
      }
      
      // ¿Se especializa en un oficio?
      const frecuenciaTipo = tiposRecientes.filter(t => t === this.normalizarTipo(tipoUsuario)).length
      puntaje += (frecuenciaTipo / tiposRecientes.length) * 30
    }
    
    return Math.min(100, puntaje)
  }

  // Calcula experiencia real basada en trabajos hechos
  private calcularExperienciaReal(trabajosAnteriores: any[]): number {
    if (trabajosAnteriores.length === 0) return 0
    
    const ahora = new Date()
    let experienciaTotal = 0
    
    trabajosAnteriores.forEach((trabajo, indice) => {
      const fechaTrabajo = new Date(trabajo.date)
      const diasAtras = Math.floor((ahora.getTime() - fechaTrabajo.getTime()) / (1000 * 60 * 60 * 24))
      
      // Trabajos recientes valen más
      const pesoReciente = Math.max(0.3, 1 - (diasAtras / 365))
      
      // Trabajos consistentes suman más
      const pesoConsistente = 1 + (indice * 0.1)
      
      experienciaTotal += pesoReciente * pesoConsistente
    })
    
    return Math.min(100, experienciaTotal)
  }

  // Mejora de reputación basada en hechos, no opiniones
  private calcularMejoraReputacion(consistencia: number, experiencia: number): number {
    let mejora = 0
    
    // Base por ser consistente en su oficio
    mejora += (consistencia / 100) * 0.05
    
    // Bonus por experiencia acumulada
    mejora += (experiencia / 100) * 0.03
    
    // Si es muy consistente y con experiencia, mayor impacto
    if (consistencia > 80 && experiencia > 60) {
      mejora += 0.02
    }
    
    return Math.round(mejora * 100) / 100
  }

  // Mensajes que motivan sin tecnicismos
  private getMensajeMotivacional(mejora: number, experiencia: number): string {
    if (mejora >= 0.08) {
      return "¡Excelente trabajo! Tu reputación está subiendo rápidamente 📈"
    } else if (mejora >= 0.05) {
      return "¡Bien hecho! Tu perfil se ve más confiable cada día ✨"
    } else if (mejora >= 0.02) {
      return "Sigue así, tu experiencia está creciendo 🌱"
    } else if (experiencia < 20) {
      return "Todos empezamos así, sigue registrando tus trabajos 💪"
    } else {
      return "Trabajo guardado. Tu perfil sigue mejorando 📝"
    }
  }

  // Insignias basadas en logros reales
  private verificarInsignias(experiencia: number, consistencia: number): string | undefined {
    if (experiencia >= 80 && consistencia >= 85) return "Experto Consistente"
    if (experiencia >= 60 && consistencia >= 70) return "Profesional Confiable"
    if (experiencia >= 40 && consistencia >= 60) return "Trabajador Dedicado"
    if (experiencia >= 20) return "Principiante Activo"
    return undefined
  }

  // Utilidades internas
  private formatearNombreTipo(tipo: string): string {
    const tipos: Record<string, string> = {
      gasfiteria: 'Gasfitería',
      construccion: 'Construcción',
      electricidad: 'Electricidad',
      pintura: 'Pintura'
    }
    return tipos[tipo] || 'Trabajo'
  }

  private normalizarTipo(tipo: string): string {
    const normalizado = tipo.toLowerCase().replace('í', 'i').replace('ó', 'o')
    return normalizado === 'otros' ? 'otros' : normalizado
  }

  private getMasFrecuente(arr: string[]): string {
    const frecuencia: Record<string, number> = {}
    arr.forEach(item => {
      frecuencia[item] = (frecuencia[item] || 0) + 1
    })
    return Object.keys(frecuencia).reduce((a, b) => frecuencia[a] > frecuencia[b] ? a : b)
  }
}

// Exportar para usar en toda la app
export const analizadorChambIA = new AnalizadorChambIA()

// Función que analiza imagen sin mostrar tecnicismos
export async function analizarImagen(imagenUrl: string): Promise<{
  puntajeCalidad: number
  objetosDetectados: string[]
  esTrabajoProfesional: boolean
}> {
  // Simulación de análisis real de imagen
  // En producción llamaría a servicio de visión por computadora
  
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulación natural
  
  // Simulación basada en contenido real
  const tieneIndicadoresProfesionales = 
    imagenUrl.includes('Baño') || 
    imagenUrl.includes('Cocina') || 
    imagenUrl.includes('Construcción')
  
  return {
    puntajeCalidad: tieneIndicadoresProfesionales ? 85 : 65,
    objetosDetectados: tieneIndicadoresProfesionales ? ['herramientas', 'trabajo profesional'] : ['imagen general'],
    esTrabajoProfesional: tieneIndicadoresProfesionales
  }
}

// Función principal que integra todo - el usuario solo ve resultados positivos
export async function analizarTrabajoCompletamente(trabajo: TrabajoAnalizado): Promise<{
  resultado: AnalysisResult
  analisisImagen: Awaited<ReturnType<typeof analizarImagen>>
  tiempoTotalMs: number
}> {
  const tiempoInicio = Date.now()
  
  // Análisis simultáneo (rápido y eficiente)
  const [resultado, analisisImagen] = await Promise.all([
    Promise.resolve(analizadorChambIA.analizarTrabajo(trabajo)),
    analizarImagen(trabajo.imagen)
  ])
  
  const tiempoTotal = Date.now() - tiempoInicio
  
  return {
    resultado,
    analisisImagen,
    tiempoTotalMs: tiempoTotal
  }
}