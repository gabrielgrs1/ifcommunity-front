function habilitaLikeDeslike() {
    $("#body-principal a.botao-curtida > i").click(function () {
        let switchLikeDeslike = $(this).parent("a").siblings().children("i").attr("id");
        const usuario = $(jQuery.parseJSON($.session.get("usuario")));
        const idAuthor = usuario["0"].userId;
        const idPost = $(this).closest("li").attr("id");
        let isLike = 0;
        let isExclude = 0;

        if ($(this).hasClass("like") === true) {
            isLike = 1;
            if ($(this).attr("id") === "true") {
                $(this).attr("id", false);
                isExclude = 1;
            } else {
                if (switchLikeDeslike == "true") {
                    $(this).parent("a").siblings().children("i").attr("id", false);
                }
                $(this).attr("id", true);

            }
        }

        if ($(this).hasClass("deslike") === true) {
            if ($(this).attr("id") === "true") {
                isExclude = 1;
                $(this).attr("id", false);
            } else {
                if (switchLikeDeslike == "true") {
                    $(this).parent("a").siblings().children("i").attr("id", false);
                }
                $(this).attr("id", true);
            }
        }

        ajaxToLikeDeslike(idPost, idAuthor, isExclude, isLike);
    });
}

function ajaxToLikeDeslike(idPost, idAuthor, isExclude, isLike) {
    $.ajax({
        url: "https://ifcommunity.herokuapp.com/post/like",
        type: "post",
        contentType: "application/json",
        crossDomain: true,
        data: JSON.stringify({
            idPost: idPost,
            idAuthor: idAuthor,
            isExclude: isExclude,
            isLike: isLike
        }),
        beforeSend: function () {
            $("#progressComentarios").show();
        }
    })
        .done(function (critica) {
            M.toast({html: critica, classes: "green"});

        })
        .fail(function (jqXHR, textStatus, postagem) {
            M.toast({html: "Erro ao reagir à postagem, contate um administrador!", classes: "red"});
            $(".preloader-wrapper").hide();
            if (jqXHR["status"] === 500) {
                console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
            } else if (jqXHR["status"] === 502) {
                console.log("Erro 502, não foi possível estabelecer conexão!");
            } else if (jqXHR["status"] === 404) {
                console.log("Erro 404, não foi encontrado o diretório solicitado!");
            }
        });
}
