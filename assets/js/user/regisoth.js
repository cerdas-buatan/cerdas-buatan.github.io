import { getValue } from "https://jscroot.github.io/element/croot.js";

async function postRegister(target_url, data) {
    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow'
      };