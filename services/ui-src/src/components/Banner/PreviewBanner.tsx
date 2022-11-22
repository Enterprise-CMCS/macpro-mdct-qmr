// components
import { Banner } from "./Banner";

export const PreviewBanner = ({ ...props }: Props) => {
  // set banner preview data
  const formData = props.watched;
  const bannerData = {
    title: formData[0] || "New banner title",
    description: formData[1] || "New banner description",
    link: formData[2] || "",
  };

  return <Banner bannerData={bannerData} {...props} />;
};

interface Props {
  [key: string]: any;
}
