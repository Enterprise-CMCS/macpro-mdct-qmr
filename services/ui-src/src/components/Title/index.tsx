import { Helmet } from "react-helmet-async";

interface TitleProps {
  tabTitle: string;
}

export const Title = ({ tabTitle }: TitleProps) => {
  return (
    <Helmet>
      <title>{tabTitle}</title>
    </Helmet>
  );
};

export default Title;
