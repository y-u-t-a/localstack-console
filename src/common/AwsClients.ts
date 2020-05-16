import AWS from 'aws-sdk'

/**
 * AWS の各サービスのクライアントをラップしたクラス  
 * インスタンス化を最小限にするために static で定義した
 */
export default class AwsClients {
  /** AWSサービスのエンドポイント localstack のデフォルトエンドポイントを格納 */
  private static endpoint = "http://localhost:4566"
  /** AWSサービスのリージョン localstack のデフォルトに合わせて us-east-1 を指定*/
  private static region = "us-east-1"
  /** LocalStack で使用するクレデンシャル（適当な文字列でOK） */
  private static credential = new AWS.Credentials({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    sessionToken: 'dummy'
  })

  /**
   * @see https://docs.aws.amazon.com/ja_jp/AWSJavaScriptSDK/latest/AWS/EC2.html
   */
  public static ec2 = new AWS.EC2({
    endpoint: AwsClients.endpoint,
    region: AwsClients.region,
    credentials: AwsClients.credential
  })

  /**
   * @see https://docs.aws.amazon.com/ja_jp/AWSJavaScriptSDK/latest/AWS/S3.html
   */
  public static s3 = new AWS.S3({
    endpoint: AwsClients.endpoint,
    region: AwsClients.region,
    credentials: AwsClients.credential
  })
}