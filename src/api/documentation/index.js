import express from "express";
import fs from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function setupSwaggerUI(app) {
  const serveSwaggerDef = function serveSwaggerDef(req, res) {
    res.sendFile(
      path.resolve(process.cwd(), "./src/documentation/openapi.json")
    );
  };

  app.get("/documentation-config", serveSwaggerDef);

  const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();

  const swaggerFiles = express.static(swaggerUiAssetPath);

  const patchIndex = function patchIndex(req, res) {
    let indexContent = fs
      .readFileSync(`${swaggerUiAssetPath}/index.html`)
      .toString();

    const root = parse(indexContent, {
      comment: false,
      lowerCaseTagName: false,
      blockTextElements: {
        script: true,
        noscript: true,
        style: true,
        pre: true,
      },
    });

    const body = root.querySelector("body");
    const bodyInnerHtml = body.innerHTML;
    body.set_content(
      bodyInnerHtml.concat(
        '<script src="/public/docs.js" charset="UTF-8"></script>'
      )
    );

    res.send(root.toString());
  };

  app.get("/documentation", (req, res) => {
    let targetUrl = req.originalUrl;
    if (!targetUrl.endsWith("/")) {
      targetUrl += "/";
    }
    targetUrl += "index.html";
    res.redirect(targetUrl);
  });

  app.get("/documentation/index.html", patchIndex);

  app.use("/documentation", swaggerFiles);
}

export default setupSwaggerUI;
