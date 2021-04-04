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
  const handleSubmit = (event:FormEvent) => {
    event.preventDefault()
    const body:S3Bucket = {
      Name: bucketName
    }
    fetch('/api/s3/new', {
      'method': 'POST',
      'body': JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
        router.push('/s3')
      } else {
        res.json().then(json => {
          setError(json.message)
        })
      }
    })
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