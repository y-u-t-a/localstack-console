import React from 'react'
import AwsClients from '../common/AwsClients'

interface Props {}

interface State {
  s3Buckets: Array<String>
}

export default class S3BucketList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // state は constructor で初期化する
    this.state = {
      s3Buckets: []
    }
  }
  async componentDidMount() {
    // 初回の検索結果は componentDidMount でセットする
    this.setState({
      s3Buckets: await getS3Buckets()
    })
  }
  render() {
    const listElm = this.state.s3Buckets.map(s3Bucket => {
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

/**
 * S3 バケットリストを参照し、S3 バケットの名前の配列を返却
 */
async function getS3Buckets(): Promise<Array<String>> {
  const s3Buckets = await AwsClients.s3.listBuckets().promise()
  const s3BucketsName = s3Buckets.Buckets!.map(s3Bucket => s3Bucket.Name!)
  return s3BucketsName
}