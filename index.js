import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Array para armazenar postagens.
let postagens = [];

// Configurações do Express.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal: Renderiza a página inicial.
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Rota do blog(Exibe as postagens).
app.get("/blog", (req, res) => {
    res.render("blog.ejs", { postagens });
});

// Rota para criar uma nova postagem.
app.post("/criar-postagem", (req, res) => {
    const { title, content } = req.body;

    if (title && content) {
        postagens.push({ title, content });
    }
    res.redirect("/blog");
});

// Rota para remover uma postagem pelo índice.
app.post("/remover-postagem", (req, res) => {
    const index = parseInt(req.body.index, 10);

    if (!isNaN(index) && index >= 0 && index < postagens.length) {
        postagens.splice(index, 1);
    }
    res.redirect("/blog");
});

// Iniciar o servidor.
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
