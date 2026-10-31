import { Link as RouterLink } from 'react-router-dom'

export default function NextLink({ href, ...props }) {
  const destination = href || '#'
  const isExternal = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(destination)

  if (isExternal) {
    return <a href={destination} {...props} />
  }

  return <RouterLink to={destination} {...props} />
}
