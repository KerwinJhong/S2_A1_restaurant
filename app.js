const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const port = 3000;

//express template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

//routes setting
app.get("/", (req, res) => {
    //console.log(restaurantList.results)
    res.render("index", { restaurant: restaurantList.results });
});

app.get("/search", (req, res) => {
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name
            .toLowerCase()
            .includes(req.query.keyword.toLowerCase());
    });
    res.render("index", { restaurant: restaurants, keyword: req.query.keyword });
});

app.get("/restaurant/:restaurant_id", (req, res) => {
    const restaurant = restaurantList.results.find(
        restaurant => restaurant.id.toString() === req.params.restaurant_id
    );
    // console.log("movie", movie);
    res.render("show", { restaurant: restaurant });
});

// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.render("404");
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.render("500");
});

//start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listning on licalhost: ${port}`);
});