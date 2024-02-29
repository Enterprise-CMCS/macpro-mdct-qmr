import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "us-east-1" });

export function getSESEmailParams(email) {
  let emailParams = {
    Destination: {
      ToAddresses: email.ToAddresses,
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: email.Text,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: email.Subject,
      },
    },
    Source: email.Source,
  };

  return emailParams;
}

export async function sendEmail(params) {
  try {
    const result = await sesClient.send(new SendEmailCommand(params));
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
