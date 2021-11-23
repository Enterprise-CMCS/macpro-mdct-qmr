import { useEffect } from "react";
import "./index.module.scss";
import { RootStateOrAny, useSelector } from "react-redux";

export function Home(): JSX.Element {
  const isAuthenticated = useSelector((state: RootStateOrAny) => {
    if (state.user.attributes) {
      return true;
    }
    return false;
  });
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
    }

    onLoad();
  }, [isAuthenticated]);

  return (
    <div className="Home" data-testid="Home-Container">
      <div className="lander" data-testid="lander">
        <h1>APS Submission App</h1>
        <p>
          ACME's Amendment to Planned Settlement (APS) submission application
        </p>
      </div>
    </div>
  );
}
