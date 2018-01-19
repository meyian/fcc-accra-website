/*

main.js

---

notes
* The partial business needs work - hacking the js with the html is interesting, but not... ideal
* the selected business - also fails to scale


*/

$(function(){

  // variables
  var signupInit;

  // classes






  // functions

  function fadeInElement(strSelector, fnCallback){

    console.log("fadeInElement > line 32. | alpha");

    fnCallback = fnCallback || (() => {});

    $(strSelector).stop().removeClass("hide-me").fadeTo(0, 0).fadeTo("slow", 1, fnCallback);
  }

  function fadeOutElement(strSelector, fnCallback){

    console.log("fadeOutElement > line 32. | alpha");

    fnCallback = fnCallback || (() => {});

    var fnCurriedCallback = (() => {
      var arrArgs = Array.prototype.slice.call(arguments);
      fnCallback.apply(this, arrArgs); // fancy

      $(strSelector).addClass("hide-me");
    });

    $(strSelector).stop().fadeOut("slow", fnCurriedCallback);
  }

  function inProgressClickHandler(evt){

    console.log("inProgressClickHandler > line 32. | alpha. evt.target: ", evt.target);

    // $("#div-under-construction").removeClass("hide-me");

    $("#div-under-construction").fadeTo(0, 0, () => {
      $("#div-under-construction").fadeTo("slow", 1, function(){

        console.log("inProgressClickHandler > line 32. | faded in");

        $("#div-under-construction").fadeTo("slow", 0, function(){
          // $("#div-under-construction").addClass("hide-me");
        });
      });
    })
  }

  function isOverAnySignUpNavLink(){
    var strMultipleSelectors = "#div-htspt-container-sign-up-types, #div-htspt-sign-up, #div-htspt-container-sign-up-types *, #div-htspt-sign-up *";

    var boolIsAllOut = false;
    var intCountIn = 0;
    var intCountOut = 0;
    var objData = {};

    $(strMultipleSelectors).each((idx, val) => {

      var strId = $(val).attr("id");
      var boolIsOver = false;

      if ($(val).filter(":hover").length){
        boolIsOver = true;
        intCountIn++;
        objData[strId] = "in";
      }
      else{
        intCountOut++;
        objData[strId] = "out";
      }

      // if (boolIsOver) boolIsAllOut = false;
      //
      // console.log("val, boolIsOver", $(val).attr("id"), boolIsOver);
    });

    console.log("objData, intCountIn, boolIsOver", objData, intCountIn. intCountOut);

    if (intCountIn === 0){
      boolIsAllOut = true;
    }

    return !boolIsAllOut;
  }

  function isSignUpDropdownShowing(){
    var boolIsShowing = !$("#div-htspt-container-sign-up-types").hasClass("hide-me");
    return boolIsShowing;
  }

  // todo: validation
  function switchToPage(evt, strType){

    console.log("switchToPage > alpha.");

    strType = strType || "signup";

    var strUrl = "";

    switch (strType) {
      case "signup":
        var strUrl = "./signup.partial.html";
        break;
      case "about":
        var strUrl = "./about.partial.html";
        break;
      default:

    }

    var strSelector = ".div-container";

    fadeOutElement(strSelector, () => {

      $.get(strUrl).
        done((data) => {
          $(strSelector).html(data);
          fadeInElement(strSelector);
        }).
        fail((data) => {
          fadeInElement(strSelector);
        });

    });
  }

  function initHandlers(){

    var objThis;
    var strSelector = "#div-htspt-container-sign-up-types";
    var strMultipleSelectors = "#div-htspt-container-sign-up-types, #div-htspt-sign-up, #div-htspt-container-sign-up-types *, #div-htspt-sign-up *";

    console.log("freeCodeCamp > main.js > initHandlers");

    $("#div-htspt-about").click((evt) => {
      // console.log("foo");
      switchToPage.call(objThis, evt, "about");
    });

    var fnCurryOver = (evt) => {

      if (!isSignUpDropdownShowing()){
        fadeInElement(strSelector);
      }
      console.log("initHandlers > over. evt.target: ", evt.target);

    };

    var fnCurryOut = (evt) => {
      if (!isOverAnySignUpNavLink()){
        fadeOutElement(strSelector);
      }
    };

    $(".div-htspt:not(#div-htspt-sign-up), .div-htspt-sign-up:not(#div-htspt-sign-up-fcc-usernames, #div-htspt-sign-up-fcc-usernames-selected)").click(inProgressClickHandler.bind(objThis));

    $("#div-htspt-sign-up, #div-htspt-sign-up *").mouseover(fnCurryOver);

    $("#div-htspt-sign-up-fcc-usernames").click(switchToPage.bind(objThis));

    $(strMultipleSelectors).mouseout(fnCurryOut);
  }

  function catastrophicFailure(strErrMsg){

  }


  function jumpToPage(){
    var strCurrUrl = window.location.href;
    console.log("jumpToPage | strCurrUrl: ", strCurrUrl);
    var arrParts = strCurrUrl.split("#");

    if (arrParts.length > 1){
      var strPage = arrParts.pop();
      var evt = null;
      
      console.log("jumpToPage | strPage: ", strPage);

      switchToPage(evt, strPage);
    }
    else{
      console.log("jumpToPage | nothing to pop");
    }


  }

  function init(){
    console.log('line 32. init');

    // addVisitor();
    initHandlers();
    jumpToPage();
  }

    // script

    init();

})
