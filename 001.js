let carga;

// Se añade un listener para el evento "load" del window.
window.addEventListener("load", function() {
   carga = true; // Cuando la página carga, se establece carga en true.
});

// Función principal que se ejecuta al intentar insertar los datos.
async function insert() {
  // Función que verifica campos obligatorios en el formulario.
  function checkMandatory() {
    // Lista de campos obligatorios.
    var mndFileds = [
      "programa_academico",
      "firstname",
      "lastname",
      "indicativo_del_pais",
      "whatsapp",
      "mobilephone",
      "email",
      "ciudad_colombia",
      "recibo",
      "documento",
      "institucion"
    ];

    var resp = true;

    // Iterar sobre los campos obligatorios.
    for (let i = 0; i < mndFileds.length; i++) {
      var fieldObj = document.forms["form_solicitud"][mndFileds[i]];

      // Si el campo es un input o textarea.
      if (fieldObj) {
        fieldObj.classList.remove("validateInput");

        // Validar si el campo está vacío.
        if (fieldObj.value.replace(/^\s+|\s+$/g, "").length == 0) {
          fieldObj.focus();
          fieldObj.classList.add("validateInput");
          resp = false;
        } else if (fieldObj.nodeName == "SELECT") {
          // Si es un campo de selección, verificar la selección.
          if (fieldObj.options[fieldObj.selectedIndex].value == "ninguno") {
            fieldObj.focus();
            fieldObj.classList.add("validateInput");
            resp = false;
          }
        } else if (fieldObj.type == "checkbox") {
          // Si es un campo de tipo checkbox, verificar si está marcado.
          if (fieldObj.checked == false) {
            fieldObj.focus();
            resp = false;
          }
        }

        try {
          if (fieldObj.name == "entry.1463901336") {
            name = fieldObj.value;
          }
        } catch (e) { }
      }
    }

    // Validar formato de correo electrónico.
    if (!validateEmail()) {
      return false;
    }

    // Validar aceptación de términos y condiciones.
    if (!privacyAlert()) {
      return false;
    }

    // Deshabilitar el formulario para evitar envíos duplicados.
    document.querySelector(".crmWebToEntityForm").setAttribute("disabled", true);

    if (resp == true) {
      submitted = true;
    }

    return resp;
  }

  // Función que verifica si se aceptaron los términos y condiciones.
  function privacyAlert() {
    var terminos = document.getElementById("terminos");

    if (terminos != undefined && !terminos.checked) {
      terminos.focus();
      terminos.classList.add("validateCheck");
      return false;
    }

    return true;
  }

  // Función para quitar errores en la validación de términos y condiciones.
  function disableErr() {
    var terminos = document.getElementById("terminos");

    if (terminos != undefined && terminos.checked) {
      terminos.className = null;
    }
  }

  // Función para validar el formato de correo electrónico.
  function validateEmail() {
    var form = document.forms["form_solicitud"];
    var emailFld = form.querySelectorAll("[ftype=email]");
    var i;

    for (i = 0; i < emailFld.length; i++) {
      var emailVal = emailFld[i].value;

      if (emailVal.replace(/^\s+|\s+$/g, "").length != 0) {
        var atpos = emailVal.indexOf("@");
        var dotpos = emailVal.lastIndexOf(".");

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
          emailFld[i].focus();
          emailFld[i].classList.add("validateInput");
          return false;
        }
      }
    }

    return true;
  }

  // Obtener fecha actual.
  const now = new Date();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  (month >= 1 && month <= 6) ? month = "2023.2" : month = "2024.1";

  let channel = window.location.href;
  let validate = validateEmail();
  let check = privacyAlert();
  disableErr();
  let mandatory = checkMandatory();
  let programa = "";
  let grupoPrograma = "";
  let name = "";
  let lastName = "";
  let fullName = "";
  let ID = "";
  let indicative = "";
  let documento = "";
  let recibo = "";
  let profesion = "";
  let otra_profesion = "";
  let estado_laboral = "";
  let institucion = "";
  let whatsapp = "";
  let telephone = "";
  let email = "";
  let city = "";
  let terminos_condiciones = "";
  let code = "";
  let country = "";
  let ciclo_vida = "";
  let estado = "Sin gestion";
  let detalle = "";
  let lead = "";

  // Obtener datos del formulario.
  if (typeof document.getElementsByName("programa_academico")[0] !== 'undefined') {
    programa = document.getElementsByName("programa_academico")[0].value;

    if (programa === "Medicina" || programa === "Enfermería" || programa === "Psicología") {
      grupoPrograma = "Pregrados";
    } else if (programa.includes("Especialización ") || programa.includes("Maestría ")) {
      grupoPrograma = "Postgrados";
    } else if (programa.includes("plomado ")) {
      grupoPrograma = "Diplomados";
      programa = programa.replace("Dilplomado", "Diplomado");
      (year === 2023) ? month = "2023.2" : month = "2024.1";
    } else if (programa.includes("Curso ") || programa.includes("Certificación ")) {
      grupoPrograma = "Cursos";
      (year === 2023) ? month = "2023.2" : month = "2024.1";
    }
  }

  // Asignar origen del lead (Transmilenio, Pauta, Orgánico).
  if (channel.includes("landing-generica-pregrado")) {
    lead = "Transmilenio";
  } else if (channel.includes("landing")) {
    lead = "Pauta";
  } else {
    lead = "Orgánico";
  }

  // Obtener información del solicitante.
  if (typeof document.getElementsByName("firstname")[0] !== 'undefined' && document.getElementsByName("lastname")[0] !== 'undefined') {
    name = document.getElementsByName("firstname")[0].value;
    lastName = document.getElementsByName("lastname")[0].value;
    fullName = name + " " + lastName;
  }

  if (typeof document.getElementsByName("indicativo_del_pais")[0] !== 'undefined') {
    indicative = document.getElementsByName("indicativo_del_pais")[0].value;
    country = indicative.split(': +')[0];
    code = indicative.split(': +')[1];
  }

  if (typeof document.getElementsByName("documento")[0] !== 'undefined') {
    documento = document.getElementsByName("documento")[0].value;
  }

  if (typeof document.getElementsByName("recibo")[0] !== 'undefined') {
    recibo = document.getElementsByName("recibo")[0].value;

    if (recibo !== "") {
      ciclo_vida = "Preinscrito con pago ";
      estado = "cargue de documentos";
      detalle = "Documentos incompletos."
    } else {
      estado = "Sin gestion";
    }
  }

  if (typeof document.getElementsByName("profesion")[0] !== 'undefined') {
    profesion = document.getElementsByName("profesion")[0].value;
  }

  if (typeof document.getElementsByName("otra_profesion")[0] !== 'undefined') {
    otra_profesion = document.getElementsByName("otra_profesion")[0].value;
  }

  if (typeof document.getElementsByName("estado_laboral")[0] !== 'undefined') {
    estado_laboral = document.getElementsByName("estado_laboral")[0].value;
  }

  if (typeof document.getElementsByName("institucion")[0] !== 'undefined') {
    institucion = document.getElementsByName("institucion")[0].value;
  }

  if (typeof document.getElementsByName("whatsapp")[0] !== 'undefined') {
    whatsapp = document.getElementsByName("whatsapp")[0].value;
  }

  if (typeof document.getElementsByName("mobilephone")[0] !== 'undefined') {
    telephone = document.getElementsByName("mobilephone")[0].value;
  }

  if (typeof document.getElementsByName("email")[0] !== 'undefined') {
    email = document.getElementsByName("email")[0].value;
  }

  if (typeof document.getElementsByName("ciudad_colombia")[0] !== 'undefined') {
    city = document.getElementsByName("ciudad_colombia")[0].value;
  }

 // Obtener valor de aceptación de términos y condiciones si está presente
  if (typeof document.getElementsByName("terminos_condiciones")[0] !== 'undefined') {
    terminos_condiciones = document.getElementsByName("terminos_condiciones")[0].checked;
  }

  // Si todas las validaciones son exitosas y la carga está completa, realizar la inserción
  if (validate === true && check === true && mandatory == true && carga === true) {
    carga = false; // Evitar inserciones duplicadas

    try {
      // Realizar la solicitud a la API para insertar los datos
      const request = await fetch(
        "https://crm.wolkvox.com/server/API/v2/custom/insert.php",
        {
          method: "POST",
          mode: "no-cors",

          headers: {
            "Wolkvox-Token":
              "7b6363672d756e6973616e697461737d2d7b32303232303832343134353334377d",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "ccg-unisanitas",
            "wolkvox-token":
              "7b6363672d756e6973616e697461737d2d7b32303232303832343134353334377d",
            module: "leads",
            fields: {
              "ID": "",
              "Etapa del ciclo de vida ": "Aspirante",
              "Etapa detallada ": "Sin gestion",
              names: fullName,
              "Programa académico": programa,
              "Programa": grupoPrograma,
              Telephone: telephone,
              WhatsApp: {
                "type": "telephone", "value": whatsapp, "country": country, "code": code
              },
              City: city,
              Email: email,
              "Url": channel,
              "Terminos y condiciones": terminos_condiciones,
              "Documento": documento,
              Recibo: recibo,
              Profesión: profesion,
              "Otra Profesión": otra_profesion,
              "Estado laboral": estado_laboral,
              "Institución": institucion,
              "status": estado,
              "Tipo de Lead": lead,
              "PeriodoAcademico" : month 
            },
          }),
        }
      );

      var promise = Promise.resolve(request);

      promise.then(function (data) {
        submitted = true;
      });
    } catch (e) { }
  }
  
  return submitted;
}
