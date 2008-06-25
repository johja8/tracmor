var arrayAssetCode = new Array();
var arrayInventoryCode = new Array();
var strCheckedAssetCode = '';
var i = 0;
function AddAsset() {
  var strAssetCode = document.getElementById('asset_code').value;
  if (strAssetCode != '') {
    var blnError = CheckDuplicateCode(strAssetCode, arrayAssetCode);
    if (blnError == 1) {
      document.getElementById('warning').innerHTML = "That Asset has already been added.";
      document.getElementById('asset_code').focus();
      return;
    }
    document.getElementById('warning').innerHTML = "";
    arrayAssetCode[i] = strAssetCode;
    document.getElementById('result').innerHTML += arrayAssetCode[i++] + "<br/>";
    document.getElementById('asset_code').value = '';
  }
  else {
    document.getElementById('warning').innerHTML = "Asset Code cannot be empty";
  }
  document.getElementById('asset_code').focus();
}
function AddAssetPost(strAssetCode) {
  arrayAssetCode[i] = strAssetCode;
  document.getElementById('result').innerHTML += arrayAssetCode[i++] + "<br/>";
}
function CompleteMove() {
  var strAssetCode = "";
  strAssetCode = arrayAssetCode.join("#");
  if (arrayAssetCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one asset";
    return false;
  }
  if (document.main_form.destination_location.value == "") {
    document.getElementById('warning').innerHTML = "Destination Location cannot be empty";
    return false;
  }
  if (arrayAssetCode.length>0 && document.main_form.destination_location.value != "") {
     document.main_form.result.value = strAssetCode;
     return true;
  }
  return false;
}
function CompleteCheckOut() {
  var strAssetCode = "";
  strAssetCode = arrayAssetCode.join("#");
  if (arrayAssetCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one asset";
    return false;
  }
  if (arrayAssetCode.length>0) {
    document.main_form.result.value = strAssetCode;
    return true;
  }
  return false;
}
function CheckIdPin() {
  if (document.main_form.user_account_id.value != "" && document.main_form.portable_user_pin.value != "") return true;
  else {
    if (document.main_form.user_account_id.value == "") document.main_form.user_account_id.focus();
    else document.main_form.portable_user_pin.focus();
    return false;
  }
}
function AddAssetLocation() {
  var strAssetCode = document.getElementById('asset_code').value;
  var strLocation = document.getElementById('destination_location').value;
  if (strAssetCode != '' && strLocation != '') {
    var blnError = CheckDuplicateCode(strAssetCode, arrayAssetCode);
    if (blnError == 1) {
      document.getElementById('warning').innerHTML = "That Asset has already been added.";
      document.getElementById('asset_code').focus();
      return;
    }
    document.getElementById('warning').innerHTML = "";
    arrayAssetCode[i++] = strAssetCode + "|" + strLocation;
    document.getElementById('result').innerHTML += "Asset Code: " + strAssetCode + " Location: " + strLocation + "<br/>";
    document.getElementById('asset_code').value = '';
    document.getElementById('destination_location').value = '';
    document.getElementById('asset_code').focus();
  }
  else {
    if (strAssetCode == '') {
      document.getElementById('warning').innerHTML = "Asset Code cannot be empty";
      document.getElementById('asset_code').focus();
    }
    else {
      document.getElementById('warning').innerHTML = "Destination Location cannot be empty";
      document.getElementById('destination_location').focus();
    }
  }
}
function AddAssetLocationPost(strAssetCode,strLocation) {
  if (strAssetCode != '' && strLocation != '') {
    arrayAssetCode[i++] = strAssetCode + "|" + strLocation;
    document.getElementById('result').innerHTML += "Asset Code: " + strAssetCode + " Location: " + strLocation + "<br/>";
    document.getElementById('asset_code').value = '';
    document.getElementById('destination_location').value = '';
    document.getElementById('asset_code').focus();
  }
}
function CompleteReceipt() {
  var strAssetCode = "";
  strAssetCode = arrayAssetCode.join("#");
  if (arrayAssetCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one asset";
    return false;
  }
  if (arrayAssetCode.length>0) {
    document.main_form.result.value = strAssetCode;
    return true;
  }
  return false;
}
function AddInventory() {
  var strInventoryCode = document.getElementById('inventory_code').value;
  var strSourceLocation = document.getElementById('source_location').value;
  var intQuantity = document.getElementById('quantity').value;
  if (strInventoryCode != '' && strSourceLocation != '' && intQuantity != '' && !isNaN(parseInt(intQuantity))) {
    var blnError = CheckDuplicateCode(strInventoryCode, arrayInventoryCode);
    if (blnError == 1) {
      document.getElementById('warning').innerHTML = "That Inventory has already been added.";
      document.getElementById('inventory_code').focus();
      return;
    }
    document.getElementById('warning').innerHTML = "";
    arrayInventoryCode[i++] = strInventoryCode + "|" + strSourceLocation + "|" + intQuantity;
    document.getElementById('result').innerHTML += "Inventory Code: " + strInventoryCode + " Source Location: " + strSourceLocation + " Quantity: " + intQuantity + "<br/>";
    document.getElementById('inventory_code').value = '';
    document.getElementById('source_location').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('inventory_code').focus();
  }
  else {
    if (strInventoryCode == '') {
      document.getElementById('warning').innerHTML = "Inventory Code cannot be empty";
      document.getElementById('inventory_code').focus();
    }
    else if (strSourceLocation == '') {
      document.getElementById('warning').innerHTML = "Source Location cannot be empty";
      document.getElementById('source_location').focus();
    }
    else {
      document.getElementById('warning').innerHTML = "Qantity must be an integer > 0";
      document.getElementById('quantity').focus();
    }
  }
}
function AddInventoryPost(strInventoryCode,strSourceLocation,intQuantity) {
  if (strInventoryCode != '' && strSourceLocation != '' && intQuantity != '' && !isNaN(parseInt(intQuantity))) {
    arrayInventoryCode[i++] = strInventoryCode + "|" + strSourceLocation + "|" + intQuantity;
    document.getElementById('result').innerHTML += "Inventory Code: " + strInventoryCode + " Source Location: " + strSourceLocation + " Quantity: " + intQuantity + "<br/>";
    document.getElementById('inventory_code').focus();
  }
}
function CompleteMoveInventory() {
  var strDestinationLocation = document.main_form.destination_location.value;
  if (strDestinationLocation == '') {
    document.getElementById('warning').innerHTML = "Destination Location cannot be empty";
    return false;
  }
  var strInventoryCode = arrayInventoryCode.join("#");
  if (arrayInventoryCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one inventory";
    return false;
  }
  if (arrayInventoryCode.length>0) {
    document.main_form.result.value = strInventoryCode;
    return true;
  }
  return false;
}
function CompleteTakeOutInventory() {
  var strInventoryCode = arrayInventoryCode.join("#");
  if (arrayInventoryCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one inventory";
    return false;
  }
  if (arrayInventoryCode.length>0) {
    document.main_form.result.value = strInventoryCode;
    return true;
  }
  return false;
}
function AddInventoryQuantity() {
  var strInventoryCode = document.getElementById('inventory_code').value;
  var intQuantity = document.getElementById('quantity').value;
  if (strInventoryCode != '' && intQuantity != '' && !isNaN(parseInt(intQuantity))) {
    var blnError = CheckDuplicateCode(strInventoryCode, arrayInventoryCode);
    if (blnError == 1) {
      document.getElementById('warning').innerHTML = "That Inventory has already been added.";
      document.getElementById('inventory_code').focus();
      return;
    }
    document.getElementById('warning').innerHTML = "";
    arrayInventoryCode[i++] = strInventoryCode + "|" + intQuantity;
    document.getElementById('result').innerHTML += "Inventory Code: " + strInventoryCode + " Quantity: " + intQuantity + "<br/>";
    document.getElementById('inventory_code').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('inventory_code').focus();
  }
  else {
    if (strInventoryCode == '') {
      document.getElementById('warning').innerHTML = "Inventory Code cannot be empty";
      document.getElementById('inventory_code').focus();
    }
    else {
      document.getElementById('warning').innerHTML = "Qantity must be an integer > 0";
      document.getElementById('quantity').focus();
    }
  }
}
function AddInventoryQuantityPost(strInventoryCode,intQuantity) {
  if (strInventoryCode != '' && intQuantity != '' && !isNaN(parseInt(intQuantity))) {
    arrayInventoryCode[i++] = strInventoryCode + "|" + intQuantity;
    document.getElementById('result').innerHTML += "Inventory Code: " + strInventoryCode + " Quantity: " + intQuantity + "<br/>";
    document.getElementById('inventory_code').focus();
  }
}
function CheckDuplicateCode(strNewCode, arrUnderTest) {
  for (j=0; j<arrUnderTest.length; j++) {
    var strUnderTest = arrUnderTest[j];
    var arrSplitted = strUnderTest.split("|");
    if (strNewCode == arrSplitted[0]) {
      return 1;
    }
  }
  return 0;  
}
function AddAuditLocation() {
  var strLocation = document.getElementById('location').value;
  if (strLocation != '') {
    document.getElementById('warning').innerHTML = "";
    document.getElementById('location').disabled = true;
    document.getElementById('btn_add_location').disabled = true;
    document.getElementById('asset_code').disabled = false;
    document.getElementById('btn_add_asset').disabled = false;
    document.getElementById('result').innerHTML += "Location: " + strLocation + "<br />";
    if (strCheckedAssetCode != '') {
      var arrCheckedAssetCode = strCheckedAssetCode.split("#");
      for (j=0; j<arrCheckedAssetCode.length; j++) {
        document.getElementById('asset_code').value = arrCheckedAssetCode[j];
        AddAuditAsset();
      }
      strCheckedAssetCode = '';
    }
    document.getElementById('asset_code').focus();
  }
  else {
    document.getElementById('warning').innerHTML = "Location cannot be empty";
    document.getElementById('location').focus();
  }
}
function AddAuditAsset() {
  var strLocation = document.getElementById('location').value;
  var strAssetCode = document.getElementById('asset_code').value;
  if (strLocation != '' && strAssetCode != '') {
    document.getElementById('warning').innerHTML = "";
    document.getElementById('result').innerHTML += "&nbsp;&nbsp;" + strAssetCode + "<br />";
    arrayAssetCode[i++] = strAssetCode;
    document.getElementById('asset_code').value = ""; 
    document.getElementById('asset_code').focus();
  }
  else {
    document.getElementById('warning').innerHTML = "Asset Code cannot be empty";
    document.getElementById('asset_code').focus();
  }
}
function NextLocation() {
  var strLocation = document.getElementById('location').value;
  var strAssetCode = arrayAssetCode.join("#");
  if (strLocation == '') {
    document.getElementById('warning').innerHTML = "Location cannot be empty";
    document.getElementById('location').focus();
    return false;
  }
  if (arrayAssetCode.length == 0) {
    document.getElementById('warning').innerHTML = "You must provide at least one asset";
    return false;
  }
  if (arrayAssetCode.length>0) {
    document.nextlocation_form.result.value = strAssetCode;
    document.nextlocation_form.location.value = strLocation;
    return true;
  }
  return false;
}
function AssetsAuditDone() {
  var strResult = document.main_form.result.value;
  if (strResult != '') {
    return true;
  }
  else {
    document.getElementById('warning').innerHTML = "You must provide at least one location";
  }
  return false;
}