function start_html_server() {
  const http = require("http");
  const fs = require("fs");

  const hostname = "0.0.0.0";
  const port = 8080;

  const server = http
    .createServer(function (request, response) {
      let extension = "." + request.url;
      let re = extension.match(/([.])\w+/g);
      let type = re === null ? ".html" : re[0];
      let path = extension === "./" ? "./index.html" : extension;
      let contentType = "";
      switch (type) {
        case ".html":
          contentType = "text/html";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".js":
          contentType = "text/javascript";
          break;
        case ".png":
          contentType = "images/png";
          encoding = "binary";
          break;
        case ".jpg":
          contentType = "images/jpg";
          encoding = "binary";
          break;
        case ".wav":
          contentType = "son/wav";
          encoding = "binary";
          break;
      }

      console.log(path);
      response.writeHead(200, { "Content-Type": contentType });
      response.write(fs.readFileSync(path, "utf8"));
      response.end();
    })
    .listen(port, hostname, () => {
      console.log("Server running at localhost:8080");
      console.log("or  http://web-r4ae1ecd4-18dd.docode.fi.qwasar.io:8080");
      console.log("or https://kougang.github.io/tetris-game/ ");
      /* console.log("Replace XXXXXXXXX by your current workspace ID"); */
      /* console.log("(look at the URL of this page and XXXXXXXXX.docode.YYYY.qwasar.io, XXXXXXXXX is your workspace ID and YYYY is your zone)"); */
    }); //https://r4ae1ecd4-18dd.docode.fi.qwasar.io/#/home/docode/project
}

start_html_server();
