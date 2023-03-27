const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

// Config
    // Template Engine
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }))
        app.set("view engine", "handlebars") // AQUI ESTA DIZENDO AO EXPRESS QUE QUEREMOS USAR O HANDLEBARS COMO TEMPLATE ENGINE
    
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        //BODY PARSER FOI DESCONTINUADO, PODE SE USAR O PROPRIO EXPRESS!!!!

// ROTAS

    app.get("/", (req, res)=>{
        Post.findAll({order: [['id', 'DESC']]}).then((posts)=>{
            res.render('layouts/home.handlebars', {posts: posts});
        })
    })

    app.get("/cad", (req, res)=>{
        res.render("layouts/formulario.handlebars")
    });// PRECISA COLOCAR A PASTA ANTES DO ARQUIVO

    app.post("/add", (req,res)=>{
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(()=>{
            res.redirect("/");
        }).catch((erro)=>{
            res.send(`Houve um erro: ${erro}`);
        })
    });

    app.get("/deletar/:id", (req, res)=>{
        Post.destroy({where: {'id': req.params.id}}).then(()=>{
            res.redirect("/");
        }).catch((erro)=>{
            res.send("Esta postagem não existe");
        });
    });

    app.get("/editar/:id", (req, res)=>{
        Post.findByPk(req.params.id)
        .then( post=> {
            res.render("layouts/edicao.handlebars",{
                id:req.params.id,
                titulo:post.titulo,
                conteudo:post.conteudo
            })
        })
        .catch(erro=>{
            res.send('Post nao encontrado');
        })
    });

    app.post("/editado/:id", (req,res)=>{
        Post.update({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
        },
        {
            where: {id: req.params.id}
        }
        ).then(()=>{
            res.redirect("/");
        }).catch((erro)=>{
            res.send(`Houve um erro: ${erro}`);
        })
    });
    

// sempre o .listen precisa ser a ultima linha do codigo;
app.listen(8081, ()=>{
    console.log("Servidor rodando em http://localhost:8081")
});