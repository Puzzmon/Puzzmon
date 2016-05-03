var pos = {};
pos.row = {};
pos.column = {};
var tmp = {};
tmp.src="";
tmp.last="";
tmp.row = -1;
tmp.column = -1;
time = 5;
tmp.levelMap = [[1,2,3,5,4], [1,3,5,2,2], [2,1,2,4,4], [3,5,1,2,3], [1,5,2,1,4]];

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
		for (var i = 0, j=0; i<cells.length; j++){
			for(var k = 0; k<5; k++, i++){
				cells[i].setAttribute('onmouseover', '');
				cells[i].style.backgroundColor = '';
				tmp.levelMap[j][k] = cells[i].firstChild.getAttribute('value');
			}	
		}
		checkGrid();

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

function checkGrid(){
	for (var i = 0; i<5; i++){
		pos.row[i] = null;
		var consecutive = 1;
		for (var j = 0; j<5; j++){
			if (j!= 0){
				if (tmp.levelMap[i][j] == tmp.levelMap[i][j-1]){
				consecutive++;
					if (consecutive >= 3){
						pos.row[i] = {i,j, consecutive};
						//console.log(pos.row);
					}
				}
				else{
					consecutive=1;
				}	

			}
					
		}
	}
	for (var j = 0; j<5; j++){
		pos.column[j] = null;
		var consecutive = 1;
		for (var i = 0; i<5; i++){
			if (i!= 0){
				if (tmp.levelMap[i][j] == tmp.levelMap[i-1][j]){
					consecutive++;
					if (consecutive >= 3){
						pos.column[j] = {i, j, consecutive};
					}
				}
			}
			
			else{
				consecutive=1;
			}			
		}
	}

	console.log(pos);
}