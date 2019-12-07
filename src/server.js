import "babel-polyfill";
import Routes from "./Routes";
import React from "react";
import createStore from "./helpers/createStore";
import { StaticRouter } from "react-router-dom";
import serialize from "serialize-javascript";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import proxy from "express-http-proxy";
import express from "express";
import { renderToString } from "react-dom/server";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use("/api", proxy("http://localhost:3000"))
  .get("/*", (req, res) => {
    const context = {};
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.url).map(({ route }) => {
      return route.loadData && route.loadData(store);
    });

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      Promise.all(promises).then(
        res.status(200).send(
          `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>TechHub Africa</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ""
          }
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${markup}</div>
          <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
          </script>
      </body>
  </html>`
        )
      );
    }
  });

export default server;
