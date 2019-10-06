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
      var d1 = new Date(fromDate);
      var d2 = new Date(toDate)
      if(amount < 0){
        M.toast({html: "Please enter a valid budget amount"})
        return false
      }
      else if(d2.getTime() < d1.getTime()){
        M.toast({html: "To Date cannot be before From Date"})
        return false
      }
    }
