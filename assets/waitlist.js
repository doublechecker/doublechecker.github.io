function subscribeToWaitlist() {
    var submitButton = document.getElementById('submitButton');
    submitButton.disabled = true;
    var spinner = document.getElementById('waitlistSpinner');
    spinner.style.display = 'inline-block';

    var email = document.getElementById('emailInput').value;
  
    var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '';
    if (isLocal) {
      console.log('Running in local environment, not sending email');
      handleSuccess();
      return;
    }else{
    // send the email to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://rs-37c6c1f4-018b1cd2-produc-rs-018b1cd2-d7de14e7-produc.app.indiecloud.dev/api/v1/subscriptions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.error) {
            handleFailure();
          } else {
            handleSuccess();
          }
        } else {
          console.error('Request failed with status:', xhr.status);
        }
      }
    };
}
  
    var data = JSON.stringify({ email: email });
    xhr.send(data);
  }

  function handleFailure(){
    var elem = document.getElementById('waitlistMessage');
    console.error('Subscription failed');
    elem.innerHTML = 'There was an error subscribing you to the waitlist. Please try again later.';
    elem.classList.add('text-error');
  }

function handleSuccess(){
    var elem = document.getElementById('waitlistMessage');
            console.log('Subscription successful');
            elem.innerHTML = 'You have been successfully subscribed to the waitlist!';
            elem.classList.add('text-success');
  
            hideForm();
}

function hideForm() {
    setTimeout(() => {
        document.getElementById('form-sec').style.display = 'none';
      }, 500);
}
  