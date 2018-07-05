function habilitaLikeDeslike(){
    $('#body-principal a.botao-curtida > i').click(function(){
        var switchLikeDeslike = $(this).parent('a').siblings().children('i').attr('id');

        var idPost = $(this).closest('li').attr('id');
        // Qual o default? Tipo, pra tirar tanto o curtir quanto o descurtir?
        // Porque quando o cara tiver like e clicar direto no deslike, tem que remover o deslike e colocar o like...
        //Pensando assim, não entendi quando vou fazer delete, update e insert..
        //Qualquer coisa me liga.
        var isLike = 2;
        var isExclude = 2;

        var usuario = $(jQuery.parseJSON($.session.get('usuario')));
        var idAuthor = usuario["0"].userId;

        if($(this).hasClass('like') == true){
            if($(this).attr('id') == 'true'){
                $(this).attr('id', false);
                isExclude = 1;
                console.log(('tinha like e tirou'));
            } else {
                if (switchLikeDeslike == 'true'){
                    console.log(('deslike e like'));
                    $(this).parent('a').siblings().children('i').attr('id', false);
                }
                console.log(('like'));
                isLike = 1;
                $(this).attr('id', true);
            }
        }

        if($(this).hasClass('deslike') == true){
            if($(this).attr('id') == 'true'){
                console.log(('tinha deslike e tirou'));
                isExclude = 1;
                $(this).attr('id', false);
            } else {
                if (switchLikeDeslike == 'true'){
                    console.log(('like e deslike'));
                    $(this).parent('a').siblings().children('i').attr('id', false);
                }
                console.log(('deslike'));
                isLike = 0;
                $(this).attr('id', true);
            }
        }

        // Está comentado pra não ficar chamando banco a toa.
        // ajaxToLikeDeslike(idPost, idAuthor, isExclude, isLike);
    });
}

function ajaxToLikeDeslike(idPost, idAuthor, isExclude, isLike) {
    $.ajax({
        url: "https://ifcommunity.herokuapp.com/post/like",
        type: 'post',
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

        })
        .fail(function (jqXHR, textStatus, postagem) {
            M.toast({html: 'Erro ao reagir à postagem, contate um administrador!', classes: 'red'});
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
