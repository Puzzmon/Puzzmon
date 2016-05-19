<?php 
session_start();
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
		function ajaxCall(url, jsonObject, fn){
		var stringifyedJsonObject = JSON.stringify(jsonObject);
		var httpReq = new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
		httpReq.onreadystatechange = function(){
			if (httpReq.readyState === 4 || httpReq.readyState === 'complete') {
				if(httpReq.status === 200) {
					try {				
						fn(JSON.parse(httpReq.responseText));
					} catch (e) {
						fn(e + '::' + httpReq.responseText);
					}
				} else {			
					fn("Error detected.  <strong>Error code: "+httpReq.status+".</strong> Please contact the <a href=\"mailto:sysadmin@acme-widgets.com\">system administrator</a>.");
				}
			}
		};
		var postData="?JSON="+stringifyedJsonObject;
		postData+="&sid="+Math.random();
		url+=postData;
		httpReq.open("GET",url,true);
		httpReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		httpReq.send();
		}

		function printMap(algo){
			console.log(algo);
		}

		ajaxCall('prueba_mapa.php', {level: 2}, printMap);

	</script>
</body>
</html>