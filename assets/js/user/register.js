document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/registeraii';
  
    document.getElementById('registerBtn').addEventListener('click', function() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
  
      const registerData = {
        username: username,
        akun: {
            email: email,
            password: password
          }
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      };
  
      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle successful registration
          console.log('Registration successful:', data);
          alert('Registration successful! Please login.');
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          document.getElementById('error-message').textContent = 'Registration failed. Please try again later.';
        });
    });
  });
  