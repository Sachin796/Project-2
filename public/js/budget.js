$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".datepicker").datepicker();
  $(".dropdown-trigger").dropdown();

  $("#alert_close").click(function(){
    $( "#alert_box" ).fadeOut( "slow", function() {
    });
  });

});
    function validationBudget() {
      let amount = $("#amount").val();
      let fromDate = $("#fromDate").val();
      let toDate =$("#toDate").val();
      if(amount < 0){
        M.toast({html: "Please enter a valid budget amount"})
        return false
      }
      else if(toDate < fromDate){
        M.toast({html: "To Date cannot be before From Date"})
        return false
      }
    }
