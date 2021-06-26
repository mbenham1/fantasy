$(document).ready(function () {

    let players = "";
    let draftedPlayers = [];
    // console.log(link);

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

        })

    })

    $("#availPlayersTable").on("click", "td", function () {

        // var which = $(this).attr("data-id");
        // console.log(which);
        var target = event.target || event.srcElement;

        var player = target.innerHTML;
        draftedPlayers.push(player);
        // console.log(draftedPlayers);

        var tr = $("<tr>").append(
            ("<td>'" + player + "</td>"),
        );
        $("#draftedTable").append(tr).addClass("line");

        // $(event.target).addClass("line");
        $(event.target).hide();

    })

}

)