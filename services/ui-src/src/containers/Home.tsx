import { useState, useEffect } from "react";
import "containers/Home.scss";
import { RootStateOrAny, useSelector } from "react-redux";

export default function Home(): JSX.Element {
  const isAuthenticated = useSelector((state: RootStateOrAny) => {
    if (state.user.attributes) {
      return true;
    }
    return false;
  });
  const [, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function renderLander() {
    return (
      <div className="lander" data-testid="lander">
        <h1>APS Submission App</h1>
        <p>
          ACME's Amendment to Planned Settlement (APS) submission application
        </p>
      </div>
    );
  }
  return (
    <div className="Home" data-testid="Home-Container">
      {renderLander()}
    </div>
  );
}
