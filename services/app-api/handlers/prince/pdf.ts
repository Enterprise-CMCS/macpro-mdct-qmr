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
    headers: { "User-Agent": "Mozilla/5.0" },
    method: "POST",
    body: JSON.stringify({
      html: "PGh0bWwgbGFuZz0iZW4iPgogICAgICAgIDxoZWFkPgogICAgICAgICAgPHRpdGxlPkFQUyBwcmludCBwYWdlPC90aXRsZT4KICAgICAgICA8L2hlYWQ+CiAgICAgICAgPGJvZHk+CiAgICAgICAgICA8aW1nCiAgICAgICAgICAgIGFsdD0iU0Mgc3RhdGUgbG9nbyIKICAgICAgICAgICAgc3JjPSJodHRwczovL2kucGluaW1nLmNvbS9vcmlnaW5hbHMvYzQvNTIvMDQvYzQ1MjA0NDBiNzI3Njk1YjVhY2E4OWU3YWZhMmU3ZTMuanBnIgogICAgICAgICAgICB3aWR0aD0iNTAiCiAgICAgICAgICAvPgogICAgICAgICAgPHAgc3R5bGU9e3sgImJvcmRlci10b3AiOiAiMXB4IHNvbGlkIGJsYWNrIiB9fT4mbmJzcDs8L3A+CiAgICAgICAgICA8aDE+QW1lbmRtZW50IHRvIFBsYW5uZWQgU2V0dGxlbWVudCAoQVBTKTwvaDE+CiAgICAgICAgICA8cD4mbmJzcDs8L3A+CiAgICAgICAgICA8cD5BUEQtSUQ6IE5ELTAwMDE8L3A+CgkJICAgPHAgc3R5bGU9ImZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjsiPlN1Ym1pdHRlcjogSmVmZnJleSAmbWRhc2g7ICZsZHF1bzsg4oCUIOKAmCAtICYjOTc0NDsgJiN4MjYxMDsgJiN4MjYxMTsgU29iY2hhazwvcD4KICAgICAgICAgIDxwPlN1Ym1pdHRlciBFbWFpbDogamVmZnJleS5zb2JjaGFrQGdtYWlsLmNvbTwvcD4KICAgICAgICAgIDxwPlVyZ2VudD86IGZhbHNlPC9wPgogICAgICAgICAgPHA+Q29tbWVudHM6PC9wPgogICAgICAgIDwvYm9keT4KICAgICAgPC9odG1sPg==",
    }),
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
