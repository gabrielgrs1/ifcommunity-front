//Função que coloca mascaras nos inputs
function mascarasDosInputs() {
    $('.telefone-mask').mask('(00) 00009-0000');
    $('.matricula-mask').mask('00000000000-0');
}

//Função para exibir animações nos formulários
function trocaTela(botao, formularioOut, formularioIn, formularioIn2) {
    $(botao).click(
        function (e) {
            e.preventDefault();
            $(formularioOut).fadeOut(300);
            setTimeout(function () {
                    $(formularioIn).fadeIn(300);
                    $(formularioIn2).fadeIn(300);
                },
                300
            );
        }
    );
}

//Função que ao clicar no botão mostrar senha ele mostra a senha
function mostrarSenha(inputSenha, botaoMostrar) {
    $(botaoMostrar).mousedown(function () {
        $(inputSenha).attr("type", "text");
    });
    $(botaoMostrar).mouseup(function () {
        $(inputSenha).attr("type", "password");
    });
}

//Função que mostra mensagem de sucesso quando email é enviado
function mensagemEmailEnviado() {
    $("#btn-esqueci-senha-submit").click(function () {
        $("#texto-enviado-email").text("Email enviado com sucesso, consulte sua caixa de email");
        setTimeout(function () {
            $("#texto-enviado-email").fadeOut(2000);
        }, 4000);
    });
}

function verificaMatricula() {
    $("#matricula").blur(function () {
        const campoMatricula = $("#matricula");
        const divErro = $("#erro-matricula");

        // if (verificaCPF()) {

        $.ajax({
            url: "https://ifcommunity.herokuapp.com/user/verify",
            type: "GET",
            crossDomain: true,
            timeout: 6000,
            data: {
                verifyString: campoMatricula.val()
            },
            beforeSend: function () {
                $("#loading-matricula").show();
            }
        })
            .done(function () {
                $("#loading-matricula").hide();

                campoMatricula.addClass("valid");
                campoMatricula.removeClass("invalid");
                campoMatricula.prop("aria-invalid", "false");

                return true;
            })
            .fail(function (jqXHR, textStatus, body) {
                $("#loading-matricula").hide();

                if (jqXHR["status"] === 500) {
                    alert("FUDEU QUE DEU PAU");
                } else if (jqXHR["status"] === 403) {
                    campoMatricula.addClass("invalid");
                    campoMatricula.removeClass("valid");
                    campoMatricula.prop("aria-invalid", "true");

                    divErro.text("Matricula já cadastrada!");
                    divErro.show();

                    return false;
                }
            });
        // }
    });
}

// Função que valida a parte da matricula que é CPF
// function verificaCPF(span) {
//     const campoMatricula = $("#matricula");
//     const erroMatricula = $("#erro-matricula");
//
//     if (campoMatricula.val() === "") {
//         return;
//     }
//
//     let digitoGerado = null;
//     let cpf = campoMatricula.val();
//     let strCpf = cpf.split('-');
//     cpf = strCpf[0];
//     const digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
//     let soma1 = 0, soma2 = 0;
//     let vlr = 11;
//
//     for (i = 0; i < 9; i++) {
//         soma1 += eval(cpf.charAt(i) * (vlr - 1));
//         soma2 += eval(cpf.charAt(i) * vlr);
//         vlr--;
//     }
//
//     soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
//     soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
//
//     if (cpf === "11111111111" || cpf === "22222222222" || cpf ===
//         "33333333333" || cpf === "44444444444" || cpf === "55555555555" || cpf ===
//         "66666666666" || cpf === "77777777777" || cpf === "88888888888" || cpf ===
//         "99999999999" || cpf === "00000000000") {
//         digitoGerado = null;
//     } else {
//         digitoGerado = (soma1 * 10) + soma2;
//     }
//
//     if (digitoGerado !== digitoDigitado) {
//         erroMatricula.text("Informe uma matrícula válida.");
//         erroMatricula.show();
//         return false;
//     }
//
//     erroMatricula.text("");
//     erroMatricula.hide;
//
//     return true;
// }

function validacaoFormulario(campo, span, regex, mensagem) {
    $(campo).on("blur", function () {
        if ($(campo).val().length === 0) {
            $(span).text("Campo obrigatório!");
            $(campo).addClass("erro-label-input");
            $(span).fadeIn(500);
        } else {
            if (regex.test(this.value) && campo !== "#matricula") {
                $(span).fadeOut(2000);
                $(campo).addClass("sucesso-label-input");
                $(campo).removeClass("erro-label-input");
            } else {
                $(span).text(mensagem);
                $(span).hide();
                $(span).fadeIn(500);
                $(campo).addClass("erro-label-input");
                $(campo).removeClass("sucesso-label-input");
            }

            if (campo === "#matricula") {
                if (!verificaCPF() || $(campo).val().length < 11 || !(/^[0-9]{11}-[1-9]{1,}$/.test($("#matricula").val()))) {
                    $(span).text("Insira uma matrícula valida");
                    $(campo).addClass("erro-label-input");
                    $(campo).removeClass("sucesso-label-input");
                } else if (verificaCPF() && /^[0-9]{11}-[1-9]{1,}$/.test($("#matricula").val()) && $("#erro-matricula").text() !== "Matricula já cadastrada!") {
                    $(span).fadeOut(2000);
                    $(campo).addClass("sucesso-label-input");
                    $(campo).removeClass("erro-label-input");
                }
            }

            if (/^[a-záàâãéèêíïóôõöúçñ]{3,}\s[a-záàâãéèêíïóôõöúçñ\s]+$/i.test($("#nome").val())
                && /^\(0?[1-9]{2}\)\s9?[0-9]{4}\-[0-9]{4}$/.test($("#telefone").val())
                && /^[0-9]{11}-[1-9]{1,}$/.test($("#matricula").val())
                && verificaCPF()) {
                $("#btn-cadastrar-proximo").removeClass("disabled");
            } else {
                $("#btn-cadastrar-proximo").addClass("disabled");
            }
        }
    });
}

function exibeRequisitosSenha() {
    $("#senha-cadastro").focus(function () {
        $(".requisitos-senha").show();
        $("#btn-cadastrar").addClass("btn-requisito-senha");

        $("#senha-cadastro").keyup(function () {
            // Valida primeiro requisito de senha
            if ($("#senha-cadastro").val().length >= 8 && /[A-Z]/.test($("#senha-cadastro").val())) {
                $("#requisito-senha-1").addClass("cor-verde");
            } else {
                $("#requisito-senha-1").removeClass("cor-verde");
            }

            // Valida segundo requisito de senha
            if (/[$@$!%*?&+-]/.test($("#senha-cadastro").val())) {
                $("#requisito-senha-2").addClass("cor-verde");
            } else {
                $("#requisito-senha-2").removeClass("cor-verde");
            }

            // Valida terceiro requisito de senha
            if (/[0-9]/.test($("#senha-cadastro").val())) {
                $("#requisito-senha-3").addClass("cor-verde");
            } else {
                $("#requisito-senha-3").removeClass("cor-verde");
            }

        });
    });

    $("#senha-cadastro").blur(function () {
        $(".requisitos-senha").hide();
        $("#btn-cadastrar").removeClass("btn-requisito-senha");
    });
}

// $("#form-cadastrar").submit(function (event) {
//     event.preventDefault();
//
//     const login = $("#login").val();
//     const senha = $("#senha-login").val();
//
//     $.ajax({
//         url: "https://ifcommunity.herokuapp.com/user/register",
//         type: "POST",
//         contentType: "application/json",
//         crossDomain: true,
//         timeout: 10000,
//         data: JSON.stringify({
//             "user": login,
//             "password": senha
//         }),
//         beforeSend: function () {
//             $("#progressLogin").show();
//         }
//     })
//         .done(function (usuario) {
//             $("#progressLogin").hide();
//
//             $.session.set("usuario", JSON.stringify(usuario));
//             location.replace("dashboard.html");
//         })
//         .fail(function (jqXHR, textStatus, body) {
//             $("#progressLogin").hide();
//
//             if (jqXHR["status"] === 403) {
//                 const divErro = $("#erro-login-span");
//                 const campoLogin = $("#login");
//                 const campoSenha = $("#senha-login");
//
//                 campoLogin.focus();
//
//                 campoLogin.addClass("invalid");
//                 campoLogin.removeClass("valid");
//                 campoLogin.prop("aria-invalid", "true");
//
//                 campoSenha.removeClass("valid");
//                 campoSenha.addClass("invalid");
//                 campoSenha.prop("aria-invalid", "true");
//
//                 divErro.text("Usuário ou senha incorreto!");
//                 divErro.show();
//             }
//         });
//
// })


$("#form-login").submit(function (event) {
    event.preventDefault();

    const login = $("#login").val();
    const senha = $("#senha-login").val();

    $.ajax({
        url: "https://ifcommunity.herokuapp.com/user/login",
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
        timeout: 10000,
        data: JSON.stringify({
            "user": login,
            "password": senha
        }),
        beforeSend: function () {
            $("#progressLogin").show();
        }
    })
        .done(function (usuario) {
            $("#progressLogin").hide();

            $.session.set("usuario", JSON.stringify(usuario));
            location.replace("dashboard.html");
        })
        .fail(function (jqXHR, textStatus, body) {
            $("#progressLogin").hide();

            if (jqXHR["status"] === 403) {
                const divErro = $("#erro-login-span");
                const campoLogin = $("#login");
                const campoSenha = $("#senha-login");

                campoLogin.focus();

                campoLogin.addClass("invalid");
                campoLogin.removeClass("valid");
                campoLogin.prop("aria-invalid", "true");

                campoSenha.removeClass("valid");
                campoSenha.addClass("invalid");
                campoSenha.prop("aria-invalid", "true");

                divErro.text("Usuário ou senha incorreto!");
                divErro.show();
            }
        });

})


//Call functions
$(function () {
    mascarasDosInputs();
    mensagemEmailEnviado();
    exibeRequisitosSenha();
});

trocaTela("#btn-esqueci-senha", "#form-login", "#form-esqueci-senha");
trocaTela("#btn-voltar-login", "#form-esqueci-senha", "#form-login");
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro");

validacaoFormulario("#nome", "#erro-nome", /^[a-záàâãéèêíïóôõöúçñ]{3,}\s[a-záàâãéèêíïóôõöúçñ\s]+$/i, "Informe um nome válido!");
validacaoFormulario("#telefone", "#erro-telefone", /^\(0?[1-9]{2}\)\s9?[0-9]{4}\-[0-9]{4}$/, "Informe um celular válido!");
validacaoFormulario("#matricula", "#erro-matricula", /^[0-9]{11}-[1-9]{1,}$ /, "Informe uma matrícula válida!");
validacaoFormulario("#login-cadastro", "#erro-usuario", /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,}[a-zA-Z0-9]$/, "Informe um usuário válido!");
validacaoFormulario("#senha-cadastro", "#erro-senha", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/, "Informe uma senha válida!");
validacaoFormulario("#email", "#erro-email", /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "Informe um email válido!");

mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");