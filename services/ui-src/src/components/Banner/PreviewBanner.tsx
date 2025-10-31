import { useFormContext } from "react-hook-form";
import { Banner } from "./Banner";

// components
export const PreviewBanner = ({ ...props }: Props) => {
  // get the form context
  const form = useFormContext();

  // set banner preview data
  const formData = form.getValues();
  const bannerData = {
    title: formData["bannerTitle"] || "New banner title",
    description: formData["bannerDescription"] || "New banner description",
    link: formData["bannerLink"] || "",
  };

  return (
    <div className="ds-u-padding-top--2">
      <Banner bannerData={bannerData} {...props} />
    </div>
  );
};

interface Props {
  [key: string]: any;
}
