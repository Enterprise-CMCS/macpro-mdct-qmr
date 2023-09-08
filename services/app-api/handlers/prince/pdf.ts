import handler from "../../libs/handler-lib";
import { aws4Interceptor } from "aws4-axios";
import axios from "axios";

export const getPDF = handler(async (event, _context) => {
  const interceptor = aws4Interceptor({
    region: "us-east-1",
    service: "execute-api",
  });

  axios.interceptors.request.use(interceptor);

  try {
    const pdf = await axios.post(process.env.princeUrl!, event.body!);
    return pdf.data;
  } catch (err) {
    console.log(err);
  }
});
