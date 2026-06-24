export function Card({ className = '', children }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-5 shadow-soft ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={`mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ className = '', children }) {
  return (
    <h3 className={`font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-400 ${className}`}>
      {children}
    </h3>
  )
}

export function CardContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}