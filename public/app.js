$(document).ready(function () {

    let players = "";
    let draftedPlayers = [];
    let iterate = 0;
    let timer = 60 * 5 + 1;
    let timer1;
    let teams = ["Michael", "Matt Reed", "Other"]
    // let click = 0;

    $("#scrape").on("click", function () {

        $.get("/scrape", function (data) {

            $("#scrape").hide();
            // console.log(data);
            players = data;
            $("#players").text(data);

            for (var i = 6; i < 206; i++) {
                var tr = $("<tr>").append(
                    ("<td data-id='" + i + "'>'" + [i - 5] + ". " + data[i] + "</td>"),
                );
                $("#availPlayersTable").append(tr);
            }

            $("#on-the-clock").text(teams[0]);

        })

    })

    $("#availPlayersTable").on("click", "td", function () {

        var date = new Date();
        date = moment(date).format("h:mm:ss a");

        iterate++;

        // var which = $(this).attr("data-id");
        // console.log(which);
        var target = event.target || event.srcElement;

        var player = target.innerHTML;
        draftedPlayers.push(player);
        // console.log(draftedPlayers);

        var tr = $("<tr>").prepend(
            ("<td>' [" + iterate + "]. " + player + " " + date + "</td>"),
        );
        $("#draftedTable").prepend(tr).addClass("line");

        // $(event.target).addClass("line");
        $(event.target).hide();

        timer = 60 * 5 + 1;

        decrement();

    })

    function decrement() {

        clearInterval(timer1);
        timer--; 
        timer1 = setInterval(decrement, 1000);
        $("#timer").text(timer);
        
    }

})