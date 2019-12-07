import React from "react";
import Routes from "./Routes";
import { renderRoutes } from "react-router-config";
import Layout from "./components/layout/Layout";
import "./App.css";

const App = () => {
  return (
    <Layout>
      <div>{renderRoutes(Routes)}</div>
    </Layout>
  );
};

export default App;
