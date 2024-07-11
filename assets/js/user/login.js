import { getValue } from "https://jscroot.github.io/element/croot.js";

function postLogin(target_url, data, responseFunction) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const Login = () => {
  const target_url =
    "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai";

  const data = {
    email: getValue("username"),
    password: getValue("password"),
  };

  postLogin(target_url, data, responseData);
};

function responseData(result) {
  if (result.error === undefined || !result.error) {
    document.cookie = `Authorization=${encodeURIComponent(
      result.token
    )}; path=/;`;

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: result.message,
    }).then(() => {
      window.location.href = "./chat.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
  }
}

document.getElementById("button").addEventListener("click", Login);
  

  