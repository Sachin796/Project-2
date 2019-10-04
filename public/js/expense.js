$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();

  $(".expenseForm").submit(e => {
    e.preventDefault();
    console.log("here1");
    let address = $("#address").val();
    let country = $("#country").val();
    let category = $("#category").val();
    let itemName = $("#itemName").val();
    let amount = $("#amount").val();
    let expenseData = {
      Address: address,
      Country: country,
      Amount: amount,
      Category: category,
      itemName: itemName
    };
    console.log("here2");
    //Request
    $.ajax({
      url: "/api/add/expense", //give your url here
      type: "POST",
      dataType: "json",
      data: expenseData,
      error: function(data) {
        console.log("here3");
        if (data.status === 401) {
          let err = data.responseJSON.error;
          M.toast({ html: err });
        } else {
          document.location.href = "/expense";
        }
      }
    });
  });
});
