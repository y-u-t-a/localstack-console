import React from 'react'

interface Props {
  s3Buckets: Array<String>
}

export default class S3BucketList extends React.Component<Props> {
  render() {
    const listElm = this.props.s3Buckets.map(s3Bucket => {
      return (
        <li key={s3Bucket.toString()}>
          <a href={document.URL + "/" + s3Bucket.toString()}>{s3Bucket}</a>
        </li>
      )
    })
    return (
      <ul>
        {listElm}
      </ul>
    )
  }
}