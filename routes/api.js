const axios = require('axios').default;
var cheerio = require("cheerio");

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

        // var link = "https://www.pff.com/news/fantasy-football-2021-half-point-ppr-rankings-tiers-erickson";

        // axios.get(link).then(function (response) {

        //     var $ = cheerio.load(response.data);

        //     $('table').each(function (i, element) {

        //         var rankArray = [];
        //         var playerArray = [];
        //         var teamArray = [];

        //         var rank = $(element).find("td:nth-child(1)").text();
        //         var player = $(element).find("td:nth-child(2)").text();
        //         var team = $(element).find("td:nth-child(3)").text();

        //         $("td:nth-child(1)").each(function (i, element) {
        //             rankArray[i] = $(this).text();
        //         });

        //         $("td:nth-child(2)").each(function (i, element) {
        //             playerArray[i] = $(this).text();
        //         });

        //         $("td:nth-child(3)").each(function (i, element) {
        //             teamArray[i] = $(this).text();
        //         });

        //         // console.log(rankArray);
        //         // console.log(playerArray);
        //         // console.log(teamArray);

        //         res.json(playerArray);

        //         // console.log(`Rank: ${rank}`);
        //         // console.log(`Player: ${player}`);
        //         //   result.player = $(element).find("td").text();
        //         //   result.image = $(element).find("img").attr("src");
        //         //   res.json(result);

        //     })
        // })


    });


}