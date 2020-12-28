const http = require("http");
const url = require("url");
const { insertar, consultar, actualizar, eliminar } = require("./consultas");
const fs = require("fs");

const server = http.createServer(async(req, res) => {

    if ((req.url == "/") && (req.method === "GET")) {
        res.setHeader("content-type", "text/html");
        const html = fs.readFileSync("index.html", "utf8");
        res.end(html);
    };

    if ((req.url == "/cancion") && (req.method === "POST")) {
        let body = "";
        req.on("data", (datos) => {
            body += datos;
        });
        req.on("end", async() => {
            const data = JSON.parse(body);
            console.log(data);
            const datos = Object.values(data);
            console.log(datos); // es un arreglo
            const respuestaInsertar = await insertar(datos);
            res.end(JSON.stringify(respuestaInsertar));
        });
    };

    if ((req.url == "/canciones") && (req.method === "GET")) {
        const respuestaConsulta = await consultar();
        res.end(JSON.stringify(respuestaConsulta))
    };

    if ((req.url == "/cancion") && (req.method === "PUT")) {
        let body = "";
        req.on("data", (datos) => {
            body += datos;
        });
        req.on("end", async() => {
            const data = JSON.parse(body);
            console.log('data ', data);
            const datos = Object.values(data);
            console.log('datos ', datos); // es un arreglo
            const respuestaActualiza = await actualizar(datos);
            res.end(JSON.stringify(respuestaActualiza));
        });
    };

    if ((req.url.startsWith("/cancion")) && (req.method === "DELETE")) {
        let { id } = url.parse(req.url, true).query;
        const respuestaElimina = await eliminar(id);
        res.end(JSON.stringify(respuestaElimina));
    }
});

server.listen(3000, () => console.log("Server ON"));