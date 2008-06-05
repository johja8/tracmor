<?php
require_once('../includes/prepend.inc.php');

// Check that the user is properly authenticated
if (!isset($_SESSION['intUserAccountId'])) {
    // authenticate error
	QApplication::Redirect('./index.php');
}
else QApplication::$objUserAccount = UserAccount::Load($_SESSION['intUserAccountId']);

$strWarning = "";

if ($_POST && $_POST['method'] == 'complete_transaction') {
	/*
	Run error checking on the array of asset codes and the destination location
	If there are no errors, then you will add the transaction to the database.
		That will include an entry in the Transaction and Asset Transaction table.
		You will also have to change the asset.location_id to the destination location
	*/
	$arrAssetCode = explode('#',$_POST['result']);
	$blnError = false;
	foreach ($arrAssetCode as $strAssetCode) {
	   if ($strAssetCode) {
			// Begin error checking
			/*if ($this->objAssetArray) {
				foreach ($this->objAssetArray as $asset) {
					if ($asset && $asset->AssetCode == $strAssetCode) {
						$blnError = true;
						$this->txtNewAssetCode->Warning = "That asset has already been added.";
					}
				}
			}*/
			
			if (!$blnError) {
				$objNewAsset = Asset::LoadByAssetCode($strAssetCode);
				if (!($objNewAsset instanceof Asset)) {
					$blnError = true;
					$strWarning = "That asset code does not exist.";
				}				
				// Cannot move, check out/in, nor reserve/unreserve any assets that have been shipped
				elseif ($objNewAsset->LocationId == 2) {
					$blnError = true;
					$strWarning = "That asset has already been shipped.";
				}
				// Cannot move, check out/in, nor reserve/unreserve any assets that are scheduled to  be received
				elseif ($objNewAsset->LocationId == 5) {
					$blnError = true;
					$strWarning = "That asset is currently scheduled to be received.";
				}
				elseif ($objPendingShipment = AssetTransaction::PendingShipment($objNewAsset->AssetId)) {
					$blnError = true;
					$strWarning = "That asset is already in a pending shipment.";
				}
				// Move
				elseif ($objNewAsset->CheckedOutFlag) {
					$blnError = true;
					$strWarning = "That asset is checked out.";
				}
				elseif ($objNewAsset->ReservedFlag) {
					$blnError = true;
					$strWarning = "That asset is reserved.";
				}
				
				/*if (!$blnError && $objNewAsset instanceof Asset)  {
					$objAssetArray[] = $objNewAsset;
				}*/
			}
		}
		else {
			$strWarning = "Please enter an asset code.";
		}
	}
	
	if (!$blnError) {
	    $objDestinationLocation = Location::LoadByShortDescription($_POST['destination_location']);
        if (!$objDestinationLocation) {
            $blnError = true;
            $strWarning = "Detination Location does not exist.";
        }
        else {
    	    $intDestinationLocationId = $objDestinationLocation->LocationId;
    	    $arrAssetCode = explode('#',$_POST['result']);
    	    
    	    foreach ($arrAssetCode as $strAssetCode) {
    			
    			$objAsset = Asset::LoadByAssetCode($strAssetCode);
    			$objTransaction = new Transaction();
    			$objTransaction->EntityQtypeId = EntityQtype::Asset;
    			$objTransaction->TransactionTypeId = 1; // Move
    			$objTransaction->Save();
    			
    			$objAssetTransaction = new AssetTransaction();
    			$objAssetTransaction->AssetId = $objAsset->AssetId;
    			$objAssetTransaction->TransactionId = $objTransaction->TransactionId;
    			$objAssetTransaction->SourceLocationId = $objAsset->LocationId;
    			$objAssetTransaction->DestinationLocationId = $intDestinationLocationId;
    			$objAssetTransaction->Save();
    			
    			$objAsset->LocationId = $intDestinationLocationId;
    			$objAsset->Save();
    		}
    		$strWarning = "Your transaction has successfully completed<br/><a href='index.php'>Main Menu</a> | <a href='asset_menu.php'>Manage Assets</a>";
    		//Remove that flag when transaction is compelete or exists some errors
            unset($_SESSION['intUserAccountId']);
        }
	}
}

?>

<html>
<head>
<title>Tracmor Portable Interface - Move Assets</title>
<link rel="stylesheet" type="text/css" href="/css/portable.css">
<script>
var arrayAssetCode = new Array();
var i=0;
function AddAsset() {
    strAssetCode = document.getElementById('asset_code').value;
    if (strAssetCode != '') {
        document.getElementById('warning').innerHTML = "";
        arrayAssetCode[i] = strAssetCode;
        document.getElementById('result').innerHTML += arrayAssetCode[i++] + "<br/>";
        document.getElementById('asset_code').value = '';
        document.getElementById('asset_code').focus();
    }
    else {
        document.getElementById('warning').innerHTML = "Asset Code cannot be empty";
        document.getElementById('asset_code').focus();
    }
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
         document.main_form.submit();
    }
}
</script>
</head>
<body onload="document.getElementById('asset_code').value=''; document.getElementById('asset_code').focus();">

<h1>TRACMOR PORTABLE INTERFACE</h1>
<h3>Move Assets</h3>
<div id="warning"><? echo $strWarning; ?></div>
Asset Code: <input type="text" id="asset_code" onkeyup="javascript:if(event.keyCode=='13') AddAsset();" size="10">
<input type="button" value="Add Asset" onclick="javascript:AddAsset();">
<div id="result"></div>
<!-- When the user clicks Add Asset, we need to add that asset code to an array using Javascript to prepare for submitting the transaction -->
<br /><br />
<form method="post" name="main_form" onsubmit="javascript:CompleteMove();">
<input type="hidden" name="method" value="complete_transaction">
<input type="hidden" name="result" value="">
Destination Location: <input type="text" name="destination_location" size ="20">
<input type="button" value="Complete Move" onclick="javascript:CompleteMove();" on>
</form>

</body>
</html>