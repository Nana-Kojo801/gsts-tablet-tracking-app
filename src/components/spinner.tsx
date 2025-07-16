import { cn } from '@/lib/utils'
import { LoaderCircle, type LucideProps } from 'lucide-react'

const Spinner = ({ className, ...props }: LucideProps) => {
  return (
    <LoaderCircle className={cn('bg-primary animate-spin', className)} {...props} />
  )
}

export default Spinner