// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  color?: string
  className?: string
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  color,
  className = '' 
}: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90'
  
  const variantStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'border-2 bg-transparent'
  }
  
  const style = {
    backgroundColor: variant === 'outline' ? 'transparent' : color,
    borderColor: variant === 'outline' ? color : undefined,
    color: variant === 'outline' ? color : 'white'
  }
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}