
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine Tailwind classes safely (removes duplicates)
 * Example: cn('p-4', 'p-2') → 'p-2'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}