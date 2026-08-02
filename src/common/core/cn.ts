import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cl = (active: boolean, className = 'active', or = '') => {
  if (active) return className
  return or
}
