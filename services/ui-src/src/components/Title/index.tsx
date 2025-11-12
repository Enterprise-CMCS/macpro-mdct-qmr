import { Helmet } from "react-helmet-async";

interface TitleProps {
  pageTitle: string;
}

export const Title = ({ pageTitle }: TitleProps) => {
  const fullTitle = `${pageTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};
