$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();
  $("select").formSelect();
  $(".expenseForm").submit(e => {
    e.preventDefault();
    // Validation
    let address = $("#address").val();
    let country = $("#country").val();
    let category = $("#category").val();
    let itemName = $("#itemName").val();
    let amount = $("#amount").val();
    if (amount < 0) {
      M.toast({ html: "Please enter a valid expense amount" });
      return false;
    } else if (amount === "" || address === "" || country === "" || itemName === "" || category === null) {
      M.toast({ html: "Please ensure all fields are populated" });
      return false;
    } else {
      let expenseData = {
        Address: address,
        Country: country,
        Amount: amount,
        Category: category,
        itemName: itemName
      };
      console.log(expenseData);
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
    }
  });
});
