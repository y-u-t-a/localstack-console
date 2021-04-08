import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import BreadcrumbNavigation from './BreadcrumbNavigation'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    </header>
    <BreadcrumbNavigation />
    {children}
    <footer>
      <hr />
      <Link href="https://github.com/y-u-t-a/aws-mock">
        GitHub
      </Link>
    </footer>
  </div>
)

export default Layout
