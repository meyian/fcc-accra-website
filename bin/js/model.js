


// exports

var saveDataToMLab;
var setDbDetails;
var addVisitor;


// exports

$(function(){


  // variables

  var strDb = "sandbox";
  var strCollection = "collection";
  var strVistorCollection = "visits";
  var strApiKey = "AFBb-xyx6hdMxNIK3V0il153RnhfZ1U6";

  var strQueryAllDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strCollection}?apiKey=${strApiKey}`;
  var strQueryAllDataSortedUrl = strQueryAllDataUrl + `&s={"timestamp": -1}`;
  var strSaveDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strCollection}/?apiKey=${strApiKey}`;

  var strGetVisitDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strVistorCollection}?apiKey=${strApiKey}`;
  var strSaveVisitDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strVistorCollection}/?apiKey=${strApiKey}`;


  function setDerivedDbDetails(){
    strQueryAllDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strCollection}?apiKey=${strApiKey}`;
    strQueryAllDataSortedUrl = strQueryAllDataUrl + `&s={"timestamp": -1}`;
    strSaveDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strCollection}/?apiKey=${strApiKey}`;

    strGetVisitDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strVistorCollection}?apiKey=${strApiKey}`;
    strSaveVisitDataUrl = `https://api.mlab.com/api/1/databases/${strDb}/collections/${strVistorCollection}/?apiKey=${strApiKey}`;
  }

  setDbDetails = (objDbParams) => {

    strDb = objDbParams['db'] || strDb;
    strCollection = objDbParams['collection'] || strCollection;
    strVistorCollection = objDbParams['vistorCollection'] || strVistorCollection;
    strApiKey = objDbParams['apiKey'] || strApiKey;

    setDerivedDbDetails();

    console.log("model.js > setDbDetails > strDb > line 48.");
  }

  saveDataToMLab = (objData, strRestUrl) => {

    console.log("saveDataToMLab > line 69. | alpha");

    var strPutUrl = strRestUrl || strSaveDataUrl;

    $.ajax(
      {
        url: strPutUrl,
  		  data: JSON.stringify(objData),
  		  type: "POST",
  		  contentType: "application/json"
    })
      .done((data) => {
        console.log("saveDataToMLab > done: ", data);
      })
      .fail((data) => {
        console.log("saveDataToMLab > fail: ", data);
      });
  }

  function getVistorCount(){
    var arrMlabData = getDataFromMLab(strGetVisitDataUrl);

    console.log("getVistorCount > line 390 | arrMlabData: ", arrMlabData);

    var intNumVisitors = arrMlabData[arrMlabData.length - 1];
    return intNumVisitors;
  }

  function saveNumVistors(intNumVisitors){

    // strGetVisitDataUrl
    // strSaveVisitDataUrl

    var objData = {
      data: intNumVisitors
    };

    saveDataToMLab(objData, strSaveVisitDataUrl);
  }

  addVisitor = () => {
    var intNumVisitors = getVistorCount();
    var intNewNumVisitors = intNumVisitors + 1;


    saveNumVistors(intNewNumVisitors);

    displayNumVisitors(intNewNumVisitors);
  }


});
