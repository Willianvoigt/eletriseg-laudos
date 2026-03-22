'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export function StepIndicator({ currentStep, totalSteps, stepNames }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        {stepNames.map((name, idx) => {
          const stepNum = idx + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep

          return (
            <div key={idx} className="flex flex-col items-center flex-1 relative">
              {/* Linha conectora */}
              {idx > 0 && (
                <div className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                  stepNum <= currentStep ? 'bg-brand-400' : 'bg-gray-200'
                }`} />
              )}
              {/* Círculo */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand-400 text-white shadow-md shadow-brand-400/30'
                  : isCompleted
                    ? 'bg-brand-400 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {/* Label */}
              <span className={`mt-2 text-[10px] text-center leading-tight hidden sm:block ${
                isActive ? 'text-brand-600 font-medium' : 'text-gray-400'
              }`}>
                {name}
              </span>
            </div>
          )
        })}
      </div>
      {/* Barra de progresso */}
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
