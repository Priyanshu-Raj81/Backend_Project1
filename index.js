const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

const { v4: uuidv4 } = require('uuid'); //create unique id for all indivisual posts


const methodoverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method")); //Override already written content

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));  //set path of view folder (ejs file)
app.use(express.static(path.join(__dirname,"public"))); //set path of public folder (css, js)

//create array
let posts = [
{ 
    id:uuidv4(),
    username: "Prince",
    content: "Hard work important ket to achieve success",
},

{
    id: uuidv4(),
    username: "Rahul",
    content: "I love coding.",
},

{
    id: uuidv4(),
    username: "Saurav",
    content: "I got selected for my 1st internship",
},
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4(); //generate unique id according to new submission
    posts.push({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id}= req.params;
    //find post depending upon id using find function
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});

});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});