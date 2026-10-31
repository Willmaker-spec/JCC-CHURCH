import { useLocation } from 'react-router-dom'

export { useLocation }

export function usePathname() {
  const { pathname } = useLocation()
  return pathname
}
