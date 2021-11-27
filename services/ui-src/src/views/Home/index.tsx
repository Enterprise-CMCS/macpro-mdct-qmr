import "./index.module.scss";

export function Home(): JSX.Element {
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
