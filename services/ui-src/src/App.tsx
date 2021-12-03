import { Routes } from "./Routes";
import * as QMR from "components";

const App = () => {
  return (
    <div id="app-wrapper">
      <QMR.Header />
      <Routes />
      <QMR.Footer />
    </div>
  );
};

export default App;
