$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });

  $(".registerForm").submit(e => {
    e.preventDefault();
  });
  $.ajax({
    url: "/users/login/", //give your url here
    type: "POST",
    dataType: "json",
    data: logindata,
    success: function(data) {
      //  alert(data);    do your stuff
    },
    error: function(data) {
      //  alert(data);    do your stuff
    }
  });
});
