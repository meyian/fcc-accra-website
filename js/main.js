/*

HTML Boilerplate

*/

$(function(){

  // variables


  // classes






  // functions

  function storeData(strEmail, strName, strFccAcct){

  }

  function inProgressClickHandler(evt){

    console.log("inProgressClickHandler > line 32. | alpha");

    // $("#div-under-construction").removeClass("hide-me");

    $("#div-under-construction").stop().removeClass("hide-me").fadeIn("slow", function(){

      console.log("inProgressClickHandler > line 32. | faded in");

      $("#div-under-construction").fadeOut("slow", function(){
        $("#div-under-construction").addClass("hide-me");
      });
    });
  }

  function initHandlers(){

    var objThis;

    $(".div-htspt").click(inProgressClickHandler.bind(objThis));
  }

  function catastrophicFailure(strErrMsg){

  }




  function init(){
    console.log('line 32. init');

    initHandlers();
  }




    // script

    init();

})
