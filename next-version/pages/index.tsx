import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="AWS Mock">
    <h1>AWS Mock 😺</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
