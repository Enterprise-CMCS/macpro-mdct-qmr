import { Helmet } from "react-helmet-async";

interface TitleProps {
  pageTitle: string;
}

export const Title = ({ pageTitle }: TitleProps) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default Title;
