import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import { S3Bucket } from '../../interfaces'

const NewS3BucketPage = () => {
  const router = useRouter()
  const [bucketName, setbucketName] = useState('')
  const [error, setError] = useState('')
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'bucket-name':
        setbucketName(event.target.value);
        break;
      default:
        break
    }
  }
  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault()
    const requestBody:S3Bucket = {
      Name: bucketName
    }
    const response = await fetch('/api/s3/new', {
      'method': 'POST',
      'body': JSON.stringify(requestBody)
    })
    if (response.ok) {
      router.push('/s3')
    } else {
      const responseBody = await response.json()
      setError(responseBody.message)
    }
  }
  return (
    <Layout title="S3 | AWS Mock">
      <p>バケット作成</p>
      <form onSubmit={handleSubmit}>
        <input
          name='bucket-name'
          value={bucketName}
          onChange={handleChange}
          autoFocus
        />
        <button type='submit'>作成</button>
      </form>
      <p>{error}</p>
    </Layout>
  )
}

export default NewS3BucketPage