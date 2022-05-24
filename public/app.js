$(document).ready(function () {

    let players = "";
    let draftedPlayers = [];
    let iterate = 0;
    let timer = 60 * 5 + 1;
    let timer1;
    let teams = ["Michael", "Matt Reed", "Team 3", "Team 4", "Team 5"];
    let click = 0;
    let flipDraftOrder = false;
    let round = 1;
    let pick = 1;
    let playersObject = {};
    let teamViewBoolean = false;

    $("#scrape").on("click", function () {

        $.get("/scrape", function (data) {

            $("#scrape").hide();

            players = data;
            $("#players").text(data);

            for (var i = 121; i < 321; i++) {
                var tr = $("<tr>").append(

                    ("<td data-id='" + i + "'>'" + [i - 120] + ". " + data[i] + "</td>"),

                    );
                $("#availPlayersTable").append(tr);
            }

            $("#on-the-clock").show().text(teams[0]);
            $("#round").text(round);
            $("#pick").text(pick);
        })

    })

    $("#view-team").on("click", function() {

        $("#team-list").show();

        $.get("/teams", function(data) {
            playersObject = data;
            let teamList = [];
            let selectedTeam = $("#select-team option:selected").text();
            console.log(selectedTeam);

                for (var i=0; i < playersObject.length; i++) {

                    if (playersObject[i].team === selectedTeam) {
                        teamList = playersObject[i].player;
                        $("#right-side").hide();
                        $("#team-name").text(selectedTeam);
                        let li = $("<li>" + teamList + "</li>")
                        $("#team-list").append(li);
                        console.log(teamList);
                    }
                }
            
        })

    })

    $("#view-draft").on("click", function() {
        $("#right-side").show();
        $("#team-list").text("");
        $("#team-name").text("");
        $("#team-list").hide();
    })

    $("#availPlayersTable").on("click", "td", function () {

        click++;
        pick++;
        $("#pick").text(pick);

        if (click > 4) {
            round++;
            teams.reverse();
            click = 0;
            flipDraftOrder = !flipDraftOrder;
            $("#round").text(round);
        }

        // console.log(click);

        var date = new Date();
        date = moment(date).format("h:mm:ss a");

        iterate++;

        // var which = $(this).attr("data-id");

        var target = event.target || event.srcElement;

        var player = target.innerHTML;
        draftedPlayers.push(player);

        var tr = $("<tr>").prepend(
            ("<td>' [" + iterate + "]. " + player + " " + date + " " + teams[click === 0 ? 0 : click - 1] + "</td>"),
        );

        $("#draftedTable").prepend(tr).addClass("line");

        var id = teams[click === 0 ? 0 : click - 1];

        $.ajax({
            method: "POST",
            url: "/teams",
            data: {
                team: id,
                player: player
            }
        }) 
            .then(function (data) {
                // console.log(data);
            });

        $("#on-the-clock").text(teams[click]);

        $(event.target).addClass("line");
        $(event.target).hide();

        timer = 60 * 5 + 1;

        decrement();

    })

    function decrement() {

        clearInterval(timer1);
        timer--; 
        timer1 = setInterval(decrement, 1000);
        $("#timer").text(timer);
        if (timer === 0) {
            timer = 60 * 5 + 1;
        }
        
    }

    function populateSelector() {

        for ( var i=0; i < teams.length; i++ ) {
            let value = $("<option value=" + teams[i] + ">" + teams[i] + "</option>");
            $("#select-team").prepend(value);
        }

    }

    populateSelector();

})