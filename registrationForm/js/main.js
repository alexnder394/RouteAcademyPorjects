var userNameInput = document.getElementById("usernameInput"); //input
var userEmailInput = document.getElementById("emailInput"); //input
var userPassInput = document.getElementById("passwordInput"); //input
var userInfo = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

function signUp() {
  if (userInputsValidation() && !emailAlreadyExists()) {
    var user = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPassInput.value,
    };
    userInfo.push(user); //array of objects
    localStorage.setItem("users", JSON.stringify(userInfo));

    toggleVisibility("confirmMsg", "d-block");
    toggleVisibility("signin", "d-block");
  } else {
    toggleVisibility("tryAgainMsg", "d-block");
  }
}

function toggleVisibility(elementId, newClass) {
  var element = document.getElementById(elementId);
  if (element.classList.contains("d-none")) {
    element.classList.replace("d-none", newClass);
  } else {
    element.classList.replace(newClass, "d-none");
  }
}


function userNameValidation(inputId, alertId) {
  return genericValidation(
    inputId,
    alertId,
    /^[A-Z][A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
  );
}
function userPasswordValidation(inputId, alertId) {
  return genericValidation(inputId, alertId, /^.{5,15}$/);
}
function userEmailValidation(inputId, alertId) {
  return genericValidation(inputId, alertId, /@[a-z]{5,10}(\.com)$/);
}
function genericValidation(inputId, alertId, regex) {
  var inputElement = document.getElementById(inputId);

  if (regex.test(inputElement.value)) {
    inputElement.classList.replace("is-invalid", "is-valid");
    toggleVisibility(alertId, "d-none");
    return true;
  } else {
    inputElement.classList.replace("is-valid", "is-invalid");
    toggleVisibility(alertId, "d-block");
    return false;
  }
}

function userInputsValidation() {
  return (
    userNameValidation("usernameInput", "userNameAlert") &&
    userPasswordValidation("passwordInput", "userPasswordAlert") &&
    userEmailValidation("emailInput", "userEmailAlert")
  );
}

function emailAlreadyExists() {
  var userNameInput = document.getElementById("usernameInput");
  var userEmailInput = document.getElementById("emailInput");

  for (let i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].name.toLowerCase() === userNameInput.value.toLowerCase() ||
      userInfo[i].email.toLowerCase() === userEmailInput.value.toLowerCase()
    ) {
      toggleVisibility("accountExistMsg", "d-block");
      return true;
    }
  }
  return false;
}

var username = localStorage.getItem("sessionUsername");

function login() {
  var loginEmail = document.getElementById("loginEmail");
  var loginPassword = document.getElementById("loginPassword");

  if (!loginEmail.value || !loginPassword.value) {
    toggleVisibility("emptyFieldsPrompt", "d-block");
    return false;
  }

  var userFound = false;
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].email.toLowerCase() === loginEmail.value.toLowerCase() &&
      userInfo[i].password === loginPassword.value
    ) {
      localStorage.setItem("sessionUsername", userInfo[i].name);
      loginBtn.setAttribute("href", "welcome.html");
      userFound = true;
      break;
    }
  }
  if (!userFound) {
    toggleVisibility("incorrectPrompt", "d-block");
  }
}

function displayWelcomeUser() {
  var username = localStorage.getItem("sessionUsername");
  document.getElementById("userName").innerHTML += username;
}
function logout() {
  localStorage.removeItem("sessionUsername");
}
