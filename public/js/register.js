$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });

  $(".registerForm").submit(e => {
    e.preventDefault();
    console.log(e);
    console.log($(this));

    let user = $("#username").val();
    let pass = $("#password").val();
    let loginData = {
      username: user,
      password: pass
    };
    $.ajax({
      url: "/api/auth/register", //give your url here
      type: "POST",
      dataType: "json",
      data: loginData,
      success: function(data) {
        console.log(data);
        //  alert(data);    do your stuff
      },
      error: function(data) {
        console.log(data.responseJSON);
        let err = data.responseJSON.err;
        M.toast({ html: err });
        //  alert(data);    do your stuff
      }
    });
  });
});
