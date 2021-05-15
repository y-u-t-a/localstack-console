import { useRouter } from 'next/router'
import { Breadcrumbs, Link, Typography } from '@material-ui/core'

const BreadcrumbNavigation = () => {
  const path = useRouter().asPath
  const pathArray = path.split('/').filter(elm => elm.length > 0)
  if (pathArray.length === 0) {
      return (
        <Breadcrumbs>
          <Typography color="textPrimary">Home</Typography>
        </Breadcrumbs>
      )
  }
  return (
    <Breadcrumbs>
      <Link key='-1' href='/'>Home</Link>
      {pathArray.map((elm, index, array) => {
        if (index + 1 === array.length) {
          return <Typography key={index} color="textPrimary">{decodeURIComponent(elm)}</Typography>
        } else {
          const href = '/' + array.slice(0, index + 1).join('/')
          return <Link key={index} href={href}>{decodeURIComponent(elm)}</Link>
        }
      })}
    </Breadcrumbs>
  )
}

export default BreadcrumbNavigation