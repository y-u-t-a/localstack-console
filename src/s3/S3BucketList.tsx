import React from 'react'
import AwsClients from '../common/AwsClients'
import { S3 } from 'aws-sdk'
import { Table, FormCheck } from 'react-bootstrap'

interface Props {}

interface State {
  s3Buckets: Array<S3.Bucket>
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
    const tabeleRows = this.state.s3Buckets.map(s3Bucket => {
      return (
        <tr>
          <td><FormCheck /></td>
          <td>{s3Bucket.Name}</td>
          <td>{s3Bucket.CreationDate!.toLocaleString()}</td>
        </tr>
      )
    })
    return (
      <Table>
        <thead>
          <tr>
            <td><FormCheck /></td>
            <td>バケット名</td>
            <td>作成日時</td>
          </tr>
        </thead>
        <tbody>
          {tabeleRows}
        </tbody>
      </Table>
    )
  }
}

/**
 * S3 バケットリストを参照し、S3 バケットの名前の配列を返却
 */
async function getS3Buckets(): Promise<Array<S3.Bucket>> {
  const s3Buckets = await AwsClients.s3.listBuckets().promise()
  return s3Buckets.Buckets!
}