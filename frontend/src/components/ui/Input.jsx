import { forwardRef } from 'react'

export const Input = forwardRef(({
  className = '',
  label,
  icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className="block text-xs font-medium text-zinc-400">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20 ${icon ? 'pl-9' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  )
})
Input.displayName = 'Input'