import handler from "../../libs/handler-lib";
import aws4 from "aws4";
import https from "https";
import { aws4Interceptor } from "aws4-axios";
import axios from "axios";

export const getPDF = handler(async (event, context) => {
  // const opts = {
  //   host: "macpro-platform-dev.cms.gov",
  //   path: "/doc-conv/508html-to-508pdf",
  //   service: "execute-api",
  //   region: "us-east-1",
  //   headers: { "User-Agent": "Mozilla/5.0" },
  //   method: "POST",
  //   body: event.body!,
  // };

  // aws4.sign(opts);

  const interceptor = aws4Interceptor({
    region: "us-east-1",
    service: "execute-api",
  });

  axios.interceptors.request.use(interceptor);

  try {
    const test = await axios.post(
      "https://macpro-platform-dev.cms.gov/doc-conv/508html-to-508pdf",
      event.body!
    );
    console.log(test.data);
    return test.data;
  } catch (err) {
    console.log(err);
  }

  // console.log(res);

  // // make request to prince api
  // // const body = JSON.(event.body!);
  // console.log("hi there", process.env.AWS_ACCESS_KEY_ID);
  // try {
  //   const test = aws4.sign({
  //     host: "macpro-platform-dev.cms.gov",
  //     service: "execute-api",
  //     region: "us-east-1",
  //     method: "POST",
  //   });

  //   console.log("hello there", test.headers);

  //   const pdf = await axios.post(
  //     "https://macpro-platform-dev.cms.gov/doc-conv/508html-to-508pdf",
  //     {
  //       body: "testing",
  //     },
  //     {
  //       headers: {
  //         Authorization: test.headers?.Authorization as string,
  //         "X-Amz-Date": test.headers?.["X-Amz-Date"] as string,
  //         "X-Amz-Security-Token": test.headers?.[
  //           "X-Amz-Security-Token"
  //         ] as string,
  //       },
  //     }
  //     // body
  //   );
  //   return pdf.data;
  // } catch (err) {
  //   console.log(err);
  // }
});
