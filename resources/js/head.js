var tmp = {};
tmp.src="";
tmp.last="";
tmp.row = -1;
tmp.column = -1;
time = 5;
function getMouse(object, event){
	var cells = document.getElementsByTagName('td');
	tmp.row = object.row;
	tmp.column = object.column;
	var row = document.getElementsByClassName ('row-' + tmp.row);
	var column = document.getElementsByClassName ('column-' + tmp.column);

	for (var i= 0; i<row.length; i++){
		row[i].style.backgroundColor = "magenta";
		column[i].style.backgroundColor = "magenta";
	}

	object.style.backgroundColor = "gold";


	for (var i = 0; i<cells.length; i++){
		cells[i].setAttribute('onmouseover', 'transfer(this)');
		cells[i].setAttribute('onmouseout', 'decolor(this)');
	}
	document.onmouseup = function(){
		for (var i = 0; i<cells.length; i++){
			cells[i].setAttribute('onmouseover', '');
			cells[i].style.backgroundColor = '';
		}
	}
}
function decolor(object){
	object.style.backgroundColor = "";
}
function transfer(object){
	row = document.getElementsByClassName ('row-' + tmp.row);
	column = document.getElementsByClassName ('column-' + tmp.column);
	for (var i= 0; i<row.length; i++){
		row[i].style.backgroundColor = "";
		column[i].style.backgroundColor = "";
	}
	console.log(object);
	if (object.column > tmp.column){
		moveRight();
	}
	else if (object.column < tmp.column){
		moveLeft();
	}
	if (object.row > tmp.row){
		moveDown();
	}
	else if (object.row < tmp.row){
		moveUp();
	}
	row = document.getElementsByClassName ('row-' + tmp.row);
	column = document.getElementsByClassName ('column-' + tmp.column);
	for (var i= 0; i<row.length; i++){
		row[i].style.backgroundColor = "magenta";
		column[i].style.backgroundColor = "magenta";
	}
	object.style.backgroundColor = "gold";
}
function moveRight(){
	var elements = document.getElementsByClassName('row-' + tmp.row);
	for (var i = 4; i>-1; i--){
		tmp.src = elements[i].firstChild;
		var j = i+1;
		if (j >= elements.length) j=4;
		tmp.last = elements[j].firstChild;
		var srcParent = tmp.src.parentNode;
		var lastParent = tmp.last.parentNode;
		lastParent.replaceChild(tmp.src, tmp.last);
		srcParent.appendChild(tmp.last);
	}
	tmp.column++;
}
function moveLeft(){
	var elements = document.getElementsByClassName('row-' + tmp.row);
	//console.log(elements);
	for (var i = 0; i<elements.length; i++){
		var j = i-1;
		if (j <= 0) j=0;
		tmp.src = elements[i].firstChild;
		tmp.last = elements[j].firstChild;
		var srcParent = tmp.src.parentNode;
		var lastParent = tmp.last.parentNode;
		lastParent.replaceChild(tmp.src, tmp.last);
		srcParent.appendChild(tmp.last);
	}
	tmp.column--;
}
function moveUp(){
	var elements = document.getElementsByClassName('column-' + tmp.column);
	//console.log(elements);
	for (var i = 0; i<elements.length; i++){
		var j = i-1;
		if (j <= 0) j=0;
		tmp.src = elements[i].firstChild;
		tmp.last = elements[j].firstChild;
		var srcParent = tmp.src.parentNode;
		var lastParent = tmp.last.parentNode;
		lastParent.replaceChild(tmp.src, tmp.last);
		srcParent.appendChild(tmp.last);
	}
	tmp.row--;
}
function moveDown(){
	var elements = document.getElementsByClassName('column-' + tmp.column);
	//console.log(elements);
	for (var i = 4; i>-1; i--){
		tmp.src = elements[i].firstChild;
		var j = i+1;
		if (j >= elements.length) j=4;
		tmp.last = elements[j].firstChild;
		var srcParent = tmp.src.parentNode;
		var lastParent = tmp.last.parentNode;
		lastParent.replaceChild(tmp.src, tmp.last);
		srcParent.appendChild(tmp.last);
	}
	tmp.row++;
}