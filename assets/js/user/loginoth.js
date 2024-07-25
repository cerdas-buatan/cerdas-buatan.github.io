import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

function postWithToken(target_url, datajson, responseFunction) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify(datajson);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const PostSignIn = () => {
    showLoadingOverlay();
    const target_url =
      "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai";
    const datainjson = {
      email: getValue("email"),
      password: getValue("password"),
    };
  
    postWithToken(target_url, datainjson, responseData);
  };

  function showLoadingOverlay() {
    document.getElementById('loader-wrapper').style.display = 'flex';
  }
  
  function hideLoadingOverlay() {
    document.getElementById('loader-wrapper').style.display = 'none';
  }