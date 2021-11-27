const axios = require('axios').default;
var cheerio = require("cheerio");
let players = [];

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        axios.get("https://www.si.com/fantasy/2021/06/25/top-200-ppr-redraft-rankings").then(function (response) {

            var $ = cheerio.load(response.data);

            $("ol").each(function (i, element) {
                var playerArray = []

                //   var result = {};
                //   result.player = $(element).find("li").text();
                //   console.log(result);

                $("li").each(function (i, element) {
                    playerArray[i] = $(this).text();
                });

                // console.log(playerArray);
                res.json(playerArray);

            })

        });

    });

    app.get("/teams", function(req, res) {
        res.json(players);
    });

    app.post("/teams", function(req, res) {

        players.push(req.body);
        console.log(players);

        res.json("Received");

    });

}