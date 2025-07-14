function subscribeToMaillist(endpoint, subscribeObj, callback) {
  var isLocal = false; //window.location.hostname === 'localhost' || window.location.hostname === '';
  if (isLocal) {
    console.log('Running in local environment, not sending email');
    setTimeout(() => {
      callback(true);
    }, 2000);
  } else {
    // send the email to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.error) {
            callback(false);
          } else {
            callback(true);
          }
        } else {
          console.error('Request failed with status:', xhr.status);
          callback(false);
        }
      }
    };

    var data = JSON.stringify(subscribeObj);
    xhr.send(data);
  }
}
