window.addEventListener("load", function () {
  const origin = window.location.origin;

  window.ui = SwaggerUIBundle({
    url: origin + "/documentation-config",
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
  });
  
});
