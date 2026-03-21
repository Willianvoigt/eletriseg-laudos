'use client'

import { Suspense } from 'react'
import { FormularioLaudo } from '@/components/formulario/FormularioLaudo'

export default function NovoLaudoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>}>
      <FormularioLaudo />
    </Suspense>
  )
}
