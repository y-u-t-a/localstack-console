import React from 'react'
import AwsClients from '../common/AwsClients'
import { Container, Form, Button } from 'react-bootstrap'

interface Props {}

interface State {
  bucketName: string
}

export default class S3NewBucket extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      bucketName: ""
    }
  }
  submitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Submit するとすぐ画面遷移する挙動を抑止
    // S3 バケット作成
    AwsClients.s3.createBucket({
      Bucket: this.state.bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: "ap-southeast-1"
      },
    }, (err) => {
      if(err) {
        console.log(err.message)
      } else {
        window.location.href = '/s3' // S3 のトップページに移動
      }
    })
  }
  render() {
    return (
      <Container>
        <h1>S3 バケット作成</h1>
        <Form
          onSubmit={this.submitForm}
          >
          <Form.Group>
            <Form.Label>バケット名</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="mybucket"
              onChange={(e) => this.setState({bucketName: e.target.value})}
            />
            <Form.Text
              className="text-muted"
            >バケット名は一意である必要があり、スペース、または大文字を含めることはできません。</Form.Text>
          </Form.Group>
          <Form.Group className="float-right">
            <Button
              variant="light"
              href="/s3"
            >キャンセル</Button>
            <Button
              variant="primary"
              type="submit"
            >バケット作成</Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}