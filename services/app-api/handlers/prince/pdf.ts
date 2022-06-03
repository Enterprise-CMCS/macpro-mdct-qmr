import handler from "../../libs/handler-lib";
import aws4 from "aws4";
import https from "https";

export const getPDF = handler(async (event, context) => {
  async function request(opts: any): Promise<any> {
    const body: any[] = [];
    const prom = new Promise((resolve, reject) => {
      https
        .request(opts, function (res) {
          res.on("data", (d) => {
            body.push(d);
          });
          res.on("error", (e) => {
            reject(e);
          });
          res.on("end", () => {
            const data = JSON.parse(Buffer.concat(body).toString());
            resolve(data);
          });
        })
        .end(opts.body || "");
    });

    return prom;
  }

  const opts = {
    host: "macpro-platform-dev.cms.gov",
    path: "/doc-conv/508html-to-508pdf",
    service: "execute-api",
    region: "us-east-1",
  };

  aws4.sign(opts);

  const res = await request(opts);

  console.log(res);

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
