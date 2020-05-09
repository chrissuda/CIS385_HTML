

function ShowDiv(){
	check();
	
	var subtotals=JSON.parse(docCookies.getItem("subtotals"));
	var table=document.getElementById("cart");
	table.innerHTML="<tr><th>Name</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr>";
	var price=0;
	
	for (var i=0;i<subtotals.length;i++){
		price+=parseInt(subtotals[i]);
	
		var row=table.insertRow(i+1);
		var cell0=row.insertCell(0);
		cell0.innerHTML=JSON.parse(docCookies.getItem("names"))[i];
		var cell1=row.insertCell(1);
		cell1.innerHTML="$"+JSON.parse(docCookies.getItem("prices"))[i];
		var cell2=row.insertCell(2);
		cell2.innerHTML=JSON.parse(docCookies.getItem("quantities"))[i];
		var cell3=row.insertCell(3);
		cell3.innerHTML="$"+subtotals[i];
	}
	
	//New Table
	var lastRow=table.insertRow();
	var length=table.rows.length;
	table.rows[length-1].innerHTML="<td colspan='3'style='font-size:large';'font-weight:bolder'>Total:</td>"
	+"<td style='font-size:large';'font-weight:bolder'>$"+price+"</td>";

	document.getElementById("MyDiv").style.display='block';
	document.getElementById("fade").style.display='block' ;
	var bgdiv = document.getElementById("fade");
	bgdiv.style.width = document.body.scrollWidth; 
};

function CloseDiv()
{
document.getElementById("MyDiv").style.display='none';
document.getElementById("fade").style.display='none';
};

function add(n,p){
	check();

	alert(n+" has been successfully added to your shopping cart");
	var table=document.getElementById("cart");

	//Unpack cookies
	var names=JSON.parse(docCookies.getItem("names"));
	var prices=JSON.parse(docCookies.getItem("prices"));
	var quantities=JSON.parse(docCookies.getItem("quantities"));
	var subtotals=JSON.parse(docCookies.getItem("subtotals"));


	//Check if this item exist first.
	for (var i=1;i<table.rows.length-1;i++){
		var str=table.rows[i].cells[0].innerHTML
		if (n==str){
			table.rows[i].cells[2].innerHTML=parseInt(table.rows[i].cells[2].innerHTML)+1;
			quantities[i-1]+=1;
			table.rows[i].cells[3].innerHTML="$"+parseInt(table.rows[i].cells[2].innerHTML)*p;
			subtotals[i-1]+=prices[i-1];

			//Update cookie
			docCookies.setItem("quantities",JSON.stringify(quantities));
			docCookies.setItem("subtotals",JSON.stringify(subtotals));
			alert("old product");
			return;
		}
	}

	//Update new cookie if it is the new product
	names.push(n);
	docCookies.setItem("names",JSON.stringify(names));
	prices.push(p);
	docCookies.setItem("prices",JSON.stringify(prices));
	quantities.push(1);
	docCookies.setItem("quantities",JSON.stringify(quantities));
	subtotals.push(1*parseInt(p));
	docCookies.setItem("subtotals",JSON.stringify(subtotals));

	
};
// var name=n;
// names.push(n);
// var price=parseInt(p);
// prices.push(price);
// var quantity=1;
// quantities.push(quantity);
// var subtotal=quantity*price;
// subtotals.push(subtotal);





function showCookie(){
	{"names","prices","quantities","subtotals"}

	var names=[];
	names=JSON.stringify(names);
	docCookies.setItem("names",names);
	var prices=[];
	prices=JSON.stringify(prices);
	docCookies.setItem("prices",prices);
	var quantities=[];
	quantities=JSON.stringify(quantities);
	docCookies.setItem("quantities",quantities);
	var subtotals=[];
	subtotals=JSON.stringify(subtotals);
	docCookies.setItem("subtotals",subtotals);
};

function check(){
	if(!docCookies.hasItem("names")){
		alert("You haven't login in");
		window.location.href="login.html";
		return;
	}
};

var docCookies = {
	getItem: function (sKey) {
	  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	  var sExpires = "";
	  if (vEnd) {
		switch (vEnd.constructor) {
		  case Number:
			sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
			break;
		  case String:
			sExpires = "; expires=" + vEnd;
			break;
		  case Date:
			sExpires = "; expires=" + vEnd.toUTCString();
			break;
		}
	  }
	  document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	  return true;
	},
	removeItem: function (sKey, sPath, sDomain) {
	  if (!sKey || !this.hasItem(sKey)) { return false; }
	  document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
	  return true;
	},
	hasItem: function (sKey) {
	  return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: /* optional method: you can safely remove it! */ function () {
	  var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	  return aKeys;
	}
  };