$("#shipNo").focus();
const token = "90931929|-31949300307281425|90960857";
const baseURL = "http://api.login2explore.com:5577";
const imlEndPoint = "/api/iml";
const irlEndPoint = "/api/irl";
const dbName = "DELIVERY-DB";
const relName = "SHIPMENT-TABLE";

function getShipment() {
    let shipNo = $("#shipNo").val();
    const jsonStr = {
        "shipNo": shipNo
    }
    const jsonStrString = JSON.stringify(jsonStr);
    let getReqStr = createGET_BY_KEYRequest(token, dbName, relName, jsonStrString);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(getReqStr, irlEndPoint);
    jQuery.ajaxSetup({ async: true });
    // console.log(resultObj);
    if (resultObj.status === 400) {
        $("#shipNo").prop('disabled', true);
        disableEnableField(false);


        $("#shipSave").prop('disabled', false);
        $("#shipReset").prop('disabled', false);

        $("#shipDescription").focus();
    }
    else {

        $("#shipNo").prop('disabled', true);
        const jsonData = JSON.parse(resultObj.data);
        let data = jsonData.record;
        saveRecord2LS(jsonData);

        //Fill the data
        $("#shipDescription").val(data.shipDescription);
        $("#shipSource").val(data.shipSource);
        $("#shipDestination").val(data.shipDestination);
        $("#shippingDateText").val(data.shippingDate);
        $("#deliveryDateText").val(data.deliveryDate);
        disableEnableField(false);


        $("#shipChange").prop('disabled', false);
        $("#shipReset").prop('disabled', false);

    }

}


function changeShipment() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var updateReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.recno);
    // alert(updateReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(updateReqStr, imlEndPoint);
    jQuery.ajaxSetup({ async: true });
    // alert(JSON.stringify(resultObj));
    resetForm();
}


//Save record no to local storage
function saveRecord2LS(jsonObj) {
    localStorage.setItem("recno", jsonObj.rec_no);
}

//Function to disable/enable all the fields except the primary id field
function disableEnableField(flag) {
    $("#shipDescription").prop('disabled', flag);
    $("#shipSource").prop('disabled', flag);
    $("#shipDestination").prop('disabled', flag);
    $("#shippingDateText").prop('disabled', flag);
    $("#deliveryDateText").prop('disabled', flag);
}

function validateAndGetFormData() {
    var shipNoVar = $("#shipNo").val();

    var shipDescriptionVar = $("#shipDescription").val();
    if (shipDescriptionVar === "") {
        alert("Shipment Description is Required Value");
        $("#shipDescription").focus();
        return "";
    }
    var shipSourceVar = $("#shipSource").val();
    if (shipSourceVar === "") {
        alert("Shipment Source is Required Value");
        $("#shipSource").focus();
        return "";
    }

    var shipDestinationVar = $("#shipDestination").val();
    if (shipDestinationVar === "") {
        alert("Shipment Destination is Required Value");
        $("#shipDestination").focus();
        return "";
    }
    var shippingDateTextVar = $("#shippingDateText").val();
    if (shippingDateTextVar === "") {
        alert("Shipment Date is Required Value");
        $("#shippingDateText").focus();
        return "";
    }

    var deliveryDateTextVar = $("#deliveryDateText").val();
    if (deliveryDateTextVar === "") {
        alert("Delivery Date is Required Value");
        $("#deliveryDateText").focus();
        return "";
    }


    var jsonStrObj = {
        shipNo: shipNoVar,
        shipDescription: shipDescriptionVar,
        shipSource: shipSourceVar,
        shipDestination: shipDestinationVar,
        shippingDate: shippingDateTextVar,
        deliveryDate: deliveryDateTextVar
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#shipNo").val("")
    $("#shipDescription").val("");
    $("#shipSource").val("");
    $("#shipDestination").val("");
    $("#shippingDateText").val("");
    $("#deliveryDateText").val("");
    $("#shipNo").prop('disabled', false);

    disableEnableField(true);

    $("#shipSave").prop('disabled', true);
    $("#shipChange").prop('disabled', true);
    $("#shipReset").prop('disabled', true);
    $("#shipNo").focus();
}
function saveShipment() {
    var jsonStr = validateAndGetFormData();
    // console.log(jsonStr)
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
    // alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr, imlEndPoint);
    jQuery.ajaxSetup({ async: true });
    // alert(JSON.stringify(resultObj));
    resetForm();
}

$(function () {
    $('#shippingDate').datepicker();
});

$(function () {
    $('#deliveryDate').datepicker();
});