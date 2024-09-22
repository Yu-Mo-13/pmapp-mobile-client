import AWS from 'aws-sdk';

export async function sendSms(phoneNumber: string, message: string) {
  // 環境変数からAWSの設定を読み込む
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const sns = new AWS.SNS();
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };

  try {
    const result = await sns.publish(params).promise();
    return result;
  } catch (error) {
    throw error;
  }
}
