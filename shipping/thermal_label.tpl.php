<?php
/*
 * Copyright (c)  2009, Tracmor, LLC 
 *
 * This file is part of Tracmor.  
 *
 * Tracmor is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version. 
 *	
 * Tracmor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tracmor; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php _p(QApplication::$EncodingType); ?>" />
	<link rel="stylesheet" type="text/css" href="<?php print('../css/tracmor.css'); ?>"></link>
</head>
<body marginwidth="0" marginheight="0" topmargin="0" leftmargin="0">
<?php $this->RenderBegin() ?>
<?php $this->lblImage->Render(); ?>
<?php $this->RenderEnd() ?>

<table>
<tbody>
<tr>
<td colspan="2">
<p class="contentsmall"><strong>Your label has been sent to your Thermal Printer</strong></p></td>
</tr>

<tr>
<td colspan="2">
<p class="contentsmall">If your label did not print:</p></td>
</tr>

<tr>
<td width="12">
<p class="contentsmall">1.
</p></td><td class="contentsmall" width="742">Make sure you have installed the <a href="http://www.java.com" target="_blank" class="bluelink">Java Runtime Environment</a>.</td>
</tr>
<tr>
<td width="12">
<p class="contentsmall">2.</p>
</td>

<td width="742">
<p class="contentsmall">Check that the Thermal Printer Port (<strong><?php echo($this->objFedexShipment->ThermalPrinterPort); ?></strong>) is set correctly.</p></td>
</tr>
<tr>
<td width="12">
<p class="contentsmall">3.</p></td>
<td width="742">
<p class="contentsmall">Make sure your browser (or security software) is not blocking Java applets.</p></td>
</tr>

<tr>
<td colspan="2" width="754">
<p><strong><font color="#ff0000">Warning: Use only
the printed original label for shipping. Using a photocopy of the
label for shipping purposes is fraudulent and could result in
additional billing charges, along with the cancellation of your FedEx
account number.</font></strong></p></td>

</tr>

<tr>
<td colspan="2" width="754">
<p class="disclaimer">
Use of this system constitutes your agreement to the service conditions
in the current FedEx Service Guide, available on fedex.com.
FedEx will not be responsible for any claim in excess of $100 per
package, whether the result of loss, damage, delay, non-delivery,
misdelivery, or misinformation, unless you declare a higher value, pay
an additional charge, document your actual loss and file a timely
claim. Limitations found in the current FedEx Service Guide apply. Your
right to recover from FedEx for any loss, including intrinsic value of
the package, loss of sales, income interest, profit, attorney's fees,
costs, and other forms of damage whether direct, incidental,
consequential, or special is limited to the greater of $100 or the
authorized declared value. Recovery cannot exceed actual documented
loss. Maximum for items of extraordinary value is $500, e.g. jewelry,
precious metals, negotiable instruments and other items listed in our
Service Guide. Written claims must be filed within strict time limits,
see current FedEx Service Guide.
</p>
</td>
</tr>


</tbody></table>
</body>
</html>
