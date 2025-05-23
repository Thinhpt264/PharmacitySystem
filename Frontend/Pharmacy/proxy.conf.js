module.exports = {
  "/api": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true
  },
  "/**": {
    target: "http://localhost:4200",
    secure: false,
    bypass: function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
        return "/index.html";
      }
    }
  }
};
