'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  baseOpacity: number
  phase: number
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const maxDistance = 200
    const particleCount = 80
    const color = { r: 74, g: 155, b: 158 } // brand teal

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      // Use setTransform to avoid cumulative scaling
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      particles = []
      const width = window.innerWidth
      const height = window.innerHeight

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius: Math.random() * 2.5 + 0.8,
          baseOpacity: Math.random() * 0.35 + 0.15,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const time = Date.now() * 0.001

      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.3
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles with pulsing effect
      for (const p of particles) {
        // Pulsing animation: sine wave from -1 to 1 normalized to 0 to 1
        const pulse = Math.sin(time * 2 + p.phase) * 0.5 + 0.5

        // Size and opacity pulse
        const radius = p.baseRadius + pulse * 1.8
        const opacity = p.baseOpacity + pulse * 0.3

        // Draw core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
        ctx.fill()

        // Draw pulsing glow (expands and contracts)
        const glowRadius = radius * (3 + pulse * 1.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowRadius
        )
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(74, 155, 158, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Update positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      animationId = requestAnimationFrame(draw)
    }

    // Initial setup
    resize()
    createParticles()
    draw()

    const handleResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
