import handler from "../../libs/handler-lib";
import axios from "axios";

export const getPDF = handler(async (event, context) => {
  // make request to prince api
  // const body = JSON.(event.body!);
  console.log(event.body!);
  try {
    const pdf = await axios.post(
      "https://macpro-platform-dev.cms.gov/doc-conv/508html-to-508pdf"
      // body
    );
    return pdf.data;
  } catch (err) {
    console.log(err);
  }
});
