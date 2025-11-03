import { Helmet } from "react-helmet-async";

interface TitleProps {
  pageTitle: string;
}

const Title = ({ pageTitle }: TitleProps) => {
  const fullTitle = `${pageTitle} | MDCT QMR`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

export default Title;
