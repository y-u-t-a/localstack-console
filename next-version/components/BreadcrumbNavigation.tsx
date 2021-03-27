import { useRouter } from 'next/router'

const BreadcrumbNavigation = () => {
  const path = useRouter().asPath
  return (
    <p>{path}</p>
  )
}

export default BreadcrumbNavigation