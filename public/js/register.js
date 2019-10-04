$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();

  $(".registerForm").submit(e => {
    e.preventDefault();
    let user = $("#username").val();
    let pass = $("#password").val();
    let loginData = {
      username: user,
      password: pass
    };

    //Request
    $.ajax({
      url: "/api/auth/register", //give your url here
      type: "POST",
      dataType: "json",
      data: loginData,
      error: function(data) {
        console.log(data.status);
        if (data.status === 500) {
          let err = data.responseJSON.error;
          M.toast({ html: err });
        } else {
          document.location.href = "/login";
        }
      }
    });
  });
});
