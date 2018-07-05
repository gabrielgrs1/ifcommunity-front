//Função que coloca mascaras nos inputs
function mascarasDosInputs() {
    $(".telefone-mask").mask("(00) 00009-0000");
    $(".matricula-mask").mask("00000000000-0");
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

function validaCPF(strCPF) {
    let Soma;
    let Resto;
    strCPF = strCPF.split("-")[0];
    Soma = 0;
    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;

    return Resto === parseInt(strCPF.substring(10, 11));
}

function validaFormParte1() {
    const campoNome = $("#nome");
    const erroNome = $("#erro-nome");
    const campoTelefone = $("#telefone");
    const erroTelefone = $("#erro-telefone");
    const campoMatricula = $("#matricula");
    const erroMatricula = $("#erro-matricula");

    campoNome.blur(function () {
        if (campoNome.val() === "") {
            erroNome.show();
            erroNome.text("Campo obrigatório");
            campoNome.addClass("erro-label-input");
            campoNome.removeClass("sucesso-label-input");
        } else {
            erroNome.hide();
            campoNome.removeClass("erro-label-input");
            campoNome.addClass("sucesso-label-input");

            if (/^[a-záàâãéèêíïóôõöúçñ]{3,}\s[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(campoNome.val())) {
                erroNome.hide();
                campoNome.removeClass("erro-label-input");
                campoNome.addClass("sucesso-label-input");
            } else {
                erroNome.text("Informe um nome válido");
                erroNome.show();
                campoNome.addClass("erro-label-input");
                campoNome.removeClass("sucesso-label-input");
            }
        }
    });

    campoTelefone.blur(function () {
        if (campoTelefone.val() === "") {
            erroTelefone.show();
            erroTelefone.text("Campo obrigatório");
            campoTelefone.addClass("erro-label-input");
            campoTelefone.removeClass("sucesso-label-input");
        } else {
            erroTelefone.hide();
            campoTelefone.removeClass("erro-label-input");
            campoTelefone.addClass("sucesso-label-input");

            if (/^\(0?[1-9]{2}\)\s9?[0-9]{4}-[0-9]{4}$/.test(campoTelefone.val())) {
                erroTelefone.hide();
                campoTelefone.removeClass("erro-label-input");
                campoTelefone.addClass("sucesso-label-input");
            } else {
                erroTelefone.text("Informe um celular válido");
                erroTelefone.show();
                campoTelefone.addClass("erro-label-input");
                campoTelefone.removeClass("sucesso-label-input");
            }
        }
    });

    campoMatricula.blur(function () {
        if (campoMatricula.val() === "") {
            erroMatricula.show();
            erroMatricula.text("Campo obrigatório");
            campoMatricula.addClass("erro-label-input");
            campoMatricula.removeClass("sucesso-label-input");
        } else {
            erroMatricula.hide();
            campoMatricula.removeClass("erro-label-input");
            campoMatricula.addClass("sucesso-label-input");

            if (!/^[0-9]{11}-[1-9]+$/.test(campoMatricula.val()) || !validaCPF(campoMatricula.val())) {
                erroMatricula.text("Informe uma matricula válida");
                erroMatricula.show();
                campoMatricula.addClass("erro-label-input");
                campoMatricula.removeClass("sucesso-label-input");
            } else if (/^[0-9]{11}-[1-9]+$/.test(campoMatricula.val()) || validaCPF(campoMatricula.val())) {
                erroMatricula.hide();
                campoMatricula.removeClass("erro-label-input");
                campoMatricula.addClass("sucesso-label-input");
            }


        }
    });


    $("#body-login #form-cadastro input").blur(function () {
        if (campoMatricula.val() !== "" &&
            campoTelefone.val() !== "" &&
            campoNome.val() !== "" &&
            /^[a-záàâãéèêíïóôõöúçñ]{3,}\s[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(campoNome.val()) &&
            /^\(0?[1-9]{2}\)\s9?[0-9]{4}-[0-9]{4}$/.test(campoTelefone.val()) &&
            /^[0-9]{11}-[1-9]+$/.test(campoMatricula.val()) &&
            validaCPF(campoMatricula.val())) {
            verificaMatricula();
        }
    });
}

function validaFormParte2() {
    const campoEmail = $("#email");
    const erroEmail = $("#erro-email");
    const campoUsuario = $("#login-cadastro");
    const erroUsuario = $("#erro-usuario");
    const campoSenha = $("#senha-cadastro");
    const erroSenha = $("#erro-senha");

    campoEmail.blur(function () {
        if (campoEmail.val() === "") {
            erroEmail.show();
            erroEmail.text("Campo obrigatório");
            campoEmail.addClass("erro-label-input");
            campoEmail.removeClass("sucesso-label-input");
        } else {
            erroEmail.hide();
            campoEmail.removeClass("erro-label-input");
            campoEmail.addClass("sucesso-label-input");

            if (/(?:[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(campoEmail.val())) {
                erroEmail.hide();
                campoEmail.removeClass("erro-label-input");
                campoEmail.addClass("sucesso-label-input");
            } else {
                erroEmail.text("Informe um email válido");
                erroEmail.show();
                campoEmail.addClass("erro-label-input");
                campoEmail.removeClass("sucesso-label-input");
            }
        }
    });

    campoUsuario.blur(function () {
        if (campoUsuario.val() === "") {
            erroUsuario.show();
            erroUsuario.text("Campo obrigatório");
            campoUsuario.addClass("erro-label-input");
            campoUsuario.removeClass("sucesso-label-input");
        } else {
            erroUsuario.hide();
            campoUsuario.removeClass("erro-label-input");
            campoUsuario.addClass("sucesso-label-input");

            if (/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,}[a-zA-Z0-9]$/.test(campoUsuario.val())) {
                erroUsuario.hide();
                campoUsuario.removeClass("erro-label-input");
                campoUsuario.addClass("sucesso-label-input");
            } else {
                erroUsuario.text("Informe um usuário válido");
                erroUsuario.show();
                campoUsuario.addClass("erro-label-input");
                campoUsuario.removeClass("sucesso-label-input");
            }
        }
    });

    campoSenha.blur(function () {
        if (campoSenha.val() === "") {
            erroSenha.show();
            erroSenha.text("Campo obrigatório");
            campoSenha.addClass("erro-label-input");
            campoSenha.removeClass("sucesso-label-input");
        } else {
            erroSenha.hide();
            campoSenha.removeClass("erro-label-input");
            campoSenha.addClass("sucesso-label-input");

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/.test(campoSenha.val())) {
                erroSenha.text("Informe uma senha válida");
                erroSenha.show();
                campoSenha.addClass("erro-label-input");
                campoSenha.removeClass("sucesso-label-input");
            } else {
                erroSenha.hide();
                campoSenha.removeClass("erro-label-input");
                campoSenha.addClass("sucesso-label-input");
            }
        }
    });


    $("#body-login #form-cadastro-2 input").blur(function () {
        if (campoEmail.val() !== "" &&
            campoUsuario.val() !== "" &&
            campoSenha.val() !== "" &&
            /(?:[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(campoEmail.val()) &&
            /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,}[a-zA-Z0-9]$/.test(campoUsuario.val()) &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/.test(campoSenha.val())) {

            verificaEmail();
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

// Ajax ------------------------------------ INICIO
$("#form-login").submit(function (event) {
    event.preventDefault();

    const login = $("#login").val();
    const senha = $("#senha-login").val();
    let ip = null;

    $.get('http://jsonip.com', function (res) {
        ip = res.ip;
    });


    $.ajax({
        url: "https://ifcommunity.herokuapp.com/user/login",
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
        timeout: 10000,
        data: JSON.stringify({
            "user": login,
            "password": senha,
            "ip": ip
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
});

$("#form-cadastrar").submit(function (event) {
    event.preventDefault();

    const user = $("#login-cadastro").val();
    const password = $("#senha-cadastro").val();
    const name = $("#nome").val();
    const phone = $("#telefone").val();
    const mail = $("#email").val();
    const typeUser = 1;
    const period = $("#periodo").val();
    const enrolledNumber = $("#matricula").val();
    let ip = null;

    $.get('http://jsonip.com', function (res) {
        ip = res.ip;
    });

    $.ajax({
        url: "https://ifcommunity.herokuapp.com/user/register",
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
        timeout: 10000,
        data: JSON.stringify({
            "user": user,
            "password": password,
            "name": name,
            "phone": phone,
            "mail": mail,
            "typeUser": typeUser,
            "period": period,
            "enrolledNumber": enrolledNumber,
            "ip": ip
        }),
        beforeSend: function () {
            $("#progressCadastro").show();
        }
    })
        .done(function (usuario) {
            $("#progressCadastro").hide();

            $.session.set("usuario", JSON.stringify(usuario));
            location.replace("dashboard.html");
        })
        .fail(function (jqXHR, textStatus, body) {
            $("#progressCadastro").hide();

            if (jqXHR["status"] === 409) {
                alert("Erro ao efetuar cadastro!");
            }
        });
});


function verificaMatricula() {
    const campoMatricula = $("#matricula");
    const divErro = $("#erro-matricula");

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

            campoMatricula.removeClass("erro-label-input");
            campoMatricula.addClass("sucesso-label-input");

            $("#btn-cadastrar-proximo").removeClass("disabled");
        })
        .fail(function (jqXHR, textStatus, body) {
            $("#loading-matricula").hide();

            if (jqXHR["status"] === 500) {
                console.log("Internal server error! Contate um administrador");
            } else if (jqXHR["status"] === 403) {
                campoMatricula.addClass("invalid");
                campoMatricula.removeClass("valid");
                campoMatricula.prop("aria-invalid", "true");

                divErro.text("Matricula já cadastrada!");
                divErro.show();

                campoMatricula.addClass("erro-label-input");
                campoMatricula.removeClass("sucesso-label-input");


                $("#btn-cadastrar-proximo").addClass("disabled");
            }
        });
}

function verificaUsuario() {
    const campo = $("#login-cadastro");
    const divErro = $("#erro-usuario");
    const loadingCampo = $("#loading-usuario");
    const textoErro = "Usuário ja cadastrado!";

    $.ajax({
        url: "https://ifcommunity.herokuapp.com/user/verify",
        type: "GET",
        crossDomain: true,
        timeout: 6000,
        data: {
            verifyString: campo.val().trim()
        },
        beforeSend: function () {
            loadingCampo.show();
        }
    })
        .done(function () {
            loadingCampo.hide();

            campo.addClass("valid");
            campo.removeClass("invalid");
            campo.prop("aria-invalid", "false");

            campo.removeClass("erro-label-input");
            campo.addClass("sucesso-label-input");

            $("#btn-cadastrar").removeClass("disabled");
        })
        .fail(function (jqXHR, textStatus, body) {
            loadingCampo.hide();

            if (jqXHR["status"] === 500) {
                console.log("Internal server error! Contate um administrador");
            } else if (jqXHR["status"] === 403) {
                campo.addClass("invalid");
                campo.removeClass("valid");
                campo.prop("aria-invalid", "true");

                divErro.text(textoErro);
                divErro.show();

                campo.addClass("erro-label-input");
                campo.removeClass("sucesso-label-input");


            }
            $("#btn-cadastrar").addClass("disabled");

        });
}

function verificaEmail() {
    const campo = $("#email");
    const divErro = $("#erro-email");
    const loadingCampo = $("#loading-email");
    const textoErro = "Email já cadastrado!";

    $.ajax({
        url: "https://ifcommunity.herokuapp.com/user/verify",
        type: "GET",
        crossDomain: true,
        timeout: 6000,
        data: {
            verifyString: campo.val().trim()
        },
        beforeSend: function () {
            loadingCampo.show();
        }
    })
        .done(function () {
            loadingCampo.hide();

            campo.addClass("valid");
            campo.removeClass("invalid");
            campo.prop("aria-invalid", "false");

            campo.removeClass("erro-label-input");
            campo.addClass("sucesso-label-input");

            verificaUsuario();

        })
        .fail(function (jqXHR, textStatus, body) {
            loadingCampo.hide();

            if (jqXHR["status"] === 500) {
                console.log("Internal server error! Contate um administrador");
            } else if (jqXHR["status"] === 403) {
                campo.addClass("invalid");
                campo.removeClass("valid");
                campo.prop("aria-invalid", "true");

                divErro.text(textoErro);
                divErro.show();

                campo.addClass("erro-label-input");
                campo.removeClass("sucesso-label-input");

            }

        });
}

// Ajax ------------------------------------ FIM


//Call functions
$(function () {
    mascarasDosInputs();
    exibeRequisitosSenha();
    validaFormParte1();
    validaFormParte2();
});

trocaTela("#btn-esqueci-senha", "#form-login", "#form-esqueci-senha");
trocaTela("#btn-voltar-login", "#form-esqueci-senha", "#form-login");
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro");


mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");