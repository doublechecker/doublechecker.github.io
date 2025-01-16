function subscribeToWaitlist() {
    var email = document.getElementById('emailInput').value;
  
    // send the email to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/subscribe', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
  
          var elem = document.getElementById('waitlistMessage');
          if (response.error) {
            console.error('Subscription failed:', response.message);
            elem.innerHTML = 'There was an error subscribing you to the waitlist. Please try again later.';
            elem.classList.add('text-error');
          } else {
            console.log('Subscription successful:', response.message);
            elem.innerHTML = 'You have been successfully subscribed to the waitlist!';
            elem.classList.add('text-success');
  
            setTimeout(() => {
              document.getElementById('form-sec').style.display = 'none';
            }, 1500);
          }
        } else {
          console.error('Request failed with status:', xhr.status);
        }
      }
    };
  
    var data = JSON.stringify({ email: email });
    xhr.send(data);
  }
  