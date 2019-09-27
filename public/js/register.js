$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });

  $("#submit").on("click", e => {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username, password);
    let login = {
      username: username,
      password: password
    };

    fetch("/register/submit", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {})
      .catch(err => {});
  });
});
