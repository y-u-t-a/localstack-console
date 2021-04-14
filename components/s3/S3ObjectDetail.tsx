type Props = {
  bucket: string,
}

const S3ObjectDetail = (props:Props) => {
  return <p>バケット {props.bucket} のオブジェクトの詳細</p>
}

export default S3ObjectDetail