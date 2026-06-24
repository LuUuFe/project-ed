const variantClasses = {
  default: 'border-border bg-[#222228] text-zinc-300',
  outline: 'border-border text-zinc-400',
  accent: 'border-accent/40 bg-accent/10 text-accent',
  success: 'border-success/30 bg-success/10 text-green-100',
  danger: 'border-danger/30 bg-danger/10 text-orange-100',
  warning: 'border-accent/30 bg-accent/10 text-accent',
}

export function Badge({ className = '', variant = 'default', children }) {
  return (
    <span className={`inline-block rounded-lg border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}