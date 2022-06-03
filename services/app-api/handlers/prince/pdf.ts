import handler from "../../libs/handler-lib";
import axios from "axios";
import aws4 from "aws4";

export const getPDF = handler(async (event, context) => {
  // make request to prince api
  // const body = JSON.(event.body!);
  console.log("hi there", process.env.AWS_ACCESS_KEY_ID);
  try {
    const test = aws4.sign({
      host: "macpro-platform-dev.cms.gov",
      service: "execute-api",
      region: "us-east-1",
      method: "POST",
    });

    console.log("hello there", test.headers);

    const pdf = await axios.post(
      "https://macpro-platform-dev.cms.gov/doc-conv/508html-to-508pdf",
      {
        body: "testing",
      },
      {
        headers: {
          Authorization: test.headers?.Authorization as string,
          "X-Amz-Date": test.headers?.["X-Amz-Date"] as string,
          "X-Amz-Security-Token": test.headers?.[
            "X-Amz-Security-Token"
          ] as string,
        },
      }
      // body
    );
    return pdf.data;
  } catch (err) {
    console.log(err);
  }
});
