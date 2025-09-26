export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export const cl = (active: boolean, className: string = 'active', or: string = '') => {
  return active ? className : or
}
