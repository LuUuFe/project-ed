import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

const variantClasses = {
  default: 'bg-surface border border-border hover:border-zinc-500 hover:text-white text-zinc-300',
  accent: 'bg-accent text-black hover:bg-yellow-300 hover:shadow-glow',
  success: 'bg-success text-black hover:bg-green-400 hover:shadow-glow',
  danger: 'bg-danger text-white hover:bg-red-500',
  outline: 'border border-border hover:border-zinc-500 text-zinc-300 hover:text-white',
  ghost: 'hover:bg-[#222228] text-zinc-400 hover:text-white',
}

const sizeClasses = {
  default: 'px-4 py-2 text-sm',
  sm: 'px-3 py-1.5 text-xs',
  lg: 'px-6 py-3 text-base',
}

export const Button = forwardRef(({
  className = '',
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
})
Button.displayName = 'Button'