import React from 'react'
import Const from '../common/Const'
import S3BucketList from './S3BucketList'
import AwsClients from '../common/AwsClients'

interface Props {}

interface State {
  s3Buckets: Array<String>
}

export default class S3 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // state はコンストラクタで初期化する
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
    document.title = `S3 | ${ Const.BASE_PAGE_TITLE }`
    return (
      <div>
        <h3>S3 バケット一覧</h3>
        <S3BucketList s3Buckets={this.state.s3Buckets} />
      </div>
    )
  }
}

async function getS3Buckets(): Promise<Array<String>> {
  const s3Buckets = await AwsClients.s3.listBuckets().promise()
  const s3BucketsName = s3Buckets.Buckets!.map(s3Bucket => s3Bucket.Name!)
  return s3BucketsName
}