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
  componentDidMount() {
    // 初回の検索結果は componentDidMount でセットする
    this.setState({
      s3Buckets: ["a", "b", "c"]
    })
  }
  render() {
    document.title = `S3 | ${ Const.BASE_PAGE_TITLE }`
    getS3Buckets()
    return (
      <div>
        <h3>S3 バケット一覧</h3>
        <S3BucketList s3Buckets={this.state.s3Buckets} />
      </div>
    )
  }
}

async function getS3Buckets() {
  const s3Buckets = await AwsClients.s3.listBuckets().promise()
  console.log(s3Buckets.Buckets!)
}