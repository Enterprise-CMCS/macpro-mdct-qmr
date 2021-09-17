import React, { useState, useEffect } from "react";
import "./Home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector((state) => {
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
      <div className="lander">
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
