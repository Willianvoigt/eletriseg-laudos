'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepNames }: StepIndicatorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        {stepNames.map((name, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              textAlign: 'center',
              opacity: idx + 1 <= currentStep ? 1 : 0.5,
              transition: 'opacity 0.3s',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: idx + 1 <= currentStep ? '#0066cc' : '#ddd',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                fontWeight: 'bold',
              }}
            >
              {idx + 1}
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>{name}</span>
          </div>
        ))}
      </div>
      <div style={{ width: '100%', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px' }}>
        <div
          style={{
            height: '100%',
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: '#0066cc',
            borderRadius: '2px',
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  )
}
