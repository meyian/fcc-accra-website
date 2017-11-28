/*

signup.js

Todo:

* Make tab select the button



*/


$(function(){


  // variables
  var arrButtonSelectors = [
    '#div-submit-button-plain',
    '#div-submit-button-hover',
    '#div-submit-button-click'
  ];

  // functions

  function hideAllButtons(){
    arrButtonSelectors.forEach((strX) => {
      $(strX).hide();
    });
  }

  function mouseoverSubmitButton(){

    console.log("signup.js > mouseoverSubmitButton > line 8");

    hideAllButtons();
    $('#div-submit-button-hover').show();
  }

  function mouseoutSubmitButton(){

    console.log("signup.js > mouseoutSubmitButton > line 8");

    hideAllButtons();
    $('#div-submit-button-plain').show();
  }

  function mousedownSubmitButton(){

    console.log("signup.js > mousedownSubmitButton > line 8");

    hideAllButtons();
    $('#div-submit-button-click').show();
  }

  function validateForm(objData){
    var boolIsValid = objData['username'] && objData['email'];
    return boolIsValid;
  }

  function submitForm(){

    console.log("signup.js > submitForm > line 8");

    var strUsername = $("#input-text-username").val();
    var strEmail = $("#input-text-email").val();
    var objData = {
      username: strUsername,
      email: strEmail,
    };

    if (validateForm(objData)){

      console.log("signup.js > submitForm > line 8 | valid");

      saveDataToMLab(objData);
      strMsg = "Saved!";
      showMsg(strMsg);
    }
    else{

      console.log("signup.js > submitForm > line 8 | invalid");

      strMsg = "Please enter both a username and email address";
      showMsg(strMsg);
    }
  }

  function showMsg(strMsg, strTypeClass){

    strTypeClass = strTypeClass || "";

    // disappear
    $("#h4-msg").stop().fadeTo(0, 0, ()=>{

      console.log("signup.js > showMsg > line 96 | disappear done");

      // fade in
      $("#h4-msg")
        .html(strMsg)
        .addClass(strTypeClass)
        .fadeTo("fast", 1, ()=>{

          console.log("signup.js > showMsg > line 96 | fade in done");

          // wait, fade out
          $("#h4-msg")
            .delay(1000)
            .fadeTo("fast", 0, ()=>{
              console.log("signup.js > showMsg > line 96 | fade out done");
            })
        });
    });
  }

  function mouseupSubmitButton(){

    console.log("signup.js > mouseupSubmitButton > line 8");

    hideAllButtons();

    if ($("#div-submit-button:hover").length){
      $('#div-submit-button-hover').show();
    }
    else{
      $('#div-submit-button-plain').show();
    }

    submitForm();
  }

  function signupInitHandlers(){

    var objThis = this;

    $("#div-submit-button").hover(
      mouseoverSubmitButton.bind(objThis),
      mouseoutSubmitButton.bind(objThis)
    );

    $("#div-submit-button").mousedown(mousedownSubmitButton.bind(objThis));
    $("#div-submit-button").mouseup(mouseupSubmitButton.bind(objThis));
  }

  function setupMLabCreds(){

    var objDbParams = {
      db: 'freecodecamp-usernames',
    };

    setDbDetails(objDbParams);
  }

  function setup(){
    mouseoutSubmitButton();
    setupMLabCreds();
  }


  signupInit = () => {
    console.log("signup.js > init > line 8");

    addVisitor();
    setup();
    signupInitHandlers();
  }

  // script
  signupInit();
})
