

var pos = {};
pos.row = {};
pos.column = {};
var tmp = {};
var score = {};
tmp.points = 0;
tmp.src="";
tmp.last="";
tmp.row = -1;
tmp.column = -1;
time = 5;
tmp.move = 0;
tmp.combo = 0;
/* 1 = planta, 2 = fuego, 3 = agua, 4 = rayo, 5 = viento */ 
tmp.levelMap = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];
for (var i = 0; i<5; i++) {
	for(var j = 0; j<5; j++){
		tmp.levelMap[i][j] = Math.floor((Math.random() * 5) + 1);
	}
	
}
var map = {};
var enemy = {};
var you = {};

var waterDamage = 0;
var fireDamage = 0;
var grassDamage = 0;
var elecDamage = 0;
var windDamage = 0;

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
		if(tmp.move > 0)
			you.update({currentHP: you.currentHP - 1});
		tmp.move=0;

	}
}
function decolor(object){
	object.style.backgroundColor = "";
}
function transfer(object){
	tmp.move++;
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

function checkEffectivity(spec){
/* 1 = planta, 2 = fuego, 3 = agua, 4 = rayo, 5 = viento */ 
	switch (spec.damageType){
		case 1:
			switch (spec.enemyType){
				case 1: return 1; break;
				case 2: return 0.5; break;
				case 3: return 2; break;
				case 4: return 2; break;
				case 5: return 0.5; break;
			}
		break;
		case 2:
			switch (spec.enemyType){
				case 1: return 2; break;
				case 2: return 1; break;
				case 3: return 0.5; break;
				case 4: return 2; break;
				case 5: return 0.5; break;
			}
		break;
		case 3:
			switch (spec.enemyType){
				case 1: return 0.5; break;
				case 2: return 2; break;
				case 3: return 1; break;
				case 4: return 0.5; break;
				case 5: return 2; break;
			}
		break;
		case 4:
			switch (spec.enemyType){
				case 1: return 0.5; break;
				case 2: return 0.5; break;
				case 3: return 2; break;
				case 4: return 1; break;
				case 5: return 2; break;
			}
		break;
		case 5:
			switch (spec.enemyType){
				case 1: return 2; break;
				case 2: return 2; break;
				case 3: return 0.5; break;
				case 4: return 0.5; break;
				case 5: return 1; break;
			}
		break;
	}
}

function checkBoost(spec){
	if (spec.damageType == spec.characterType)
		return 1.5;
	else
		return 1;
}

function checkDamage(spec){
	grassDamage*= checkBoost({characterType: spec.characterType, damageType: 1}) * checkEffectivity({enemyType: spec.enemyType, damageType: 1});
	fireDamage*= checkBoost({characterType: spec.characterType, damageType: 2}) * checkEffectivity({enemyType: spec.enemyType, damageType: 2});
	waterDamage*= checkBoost({characterType: spec.characterType, damageType: 3}) * checkEffectivity({enemyType: spec.enemyType, damageType: 3});
	elecDamage*= checkBoost({characterType: spec.characterType, damageType: 4}) * checkEffectivity({enemyType: spec.enemyType, damageType: 4});
	windDamage*= checkBoost({characterType: spec.characterType, damageType: 5}) * checkEffectivity({enemyType: spec.enemyType, damageType: 5});

	var totalDamage = grassDamage + fireDamage + waterDamage + elecDamage + windDamage;
	totalDamage = Math.ceil(totalDamage);
	return totalDamage;

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
						var value = tmp.levelMap[i][j];
						pos.row[i] = {i,j, consecutive, value};
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
						var value = tmp.levelMap[i][j];
						pos.column[j] = {i, j, consecutive, value};
					}
				}
				else{
					consecutive=1;
				}	
			}
			
		
		}
	}

	//console.log(pos);

	for (var i=0; i<5;i++){
		//console.log(pos.row[i]);
		if (pos.row[i]){
			var j = pos.row[i].consecutive;
			j--;
			var x = pos.row[i].i;
			var y = pos.row[i].j;
			console.log(pos.row[i]);
			for (j; j>=0; j--){
				switch (pos.row[i].value){
					case 1: grassDamage++; break;
					case 2: fireDamage++; break;
					case 3: waterDamage++; break;
					case 4: elecDamage++; break;
					case 5: windDamage++; break;
					case "1": grassDamage++; break;
					case "2": fireDamage++; break;
					case "3": waterDamage++; break;
					case "4": elecDamage++; break;
					case "5": windDamage++; break;
				}
				tmp.levelMap[x][y-j] = Math.floor((Math.random() * 5) + 1);
				map.changePattern({pattern: tmp.levelMap});
				
			}
			tmp.combo++;
		}
		if (pos.column[i]){
			console.log(pos.column[i]);
			var j = pos.column[i].consecutive;
			j--;
			var x = pos.column[i].i;
			var y = pos.column[i].j;
			//console.log(j, x, y);
			for (j; j>=0; j--){
				switch (pos.column[i].value){
					case 1: grassDamage++; break;
					case 2: fireDamage++; break;
					case 3: waterDamage++; break;
					case 4: elecDamage++; break;
					case 5: windDamage++; break;
					case "1": grassDamage++; break;
					case "2": fireDamage++; break;
					case "3": waterDamage++; break;
					case "4": elecDamage++; break;
					case "5": windDamage++; break;
				}
				tmp.levelMap[x-j][y] = Math.floor((Math.random() * 5) + 1);
				map.changePattern({pattern: tmp.levelMap});
				
			}
			tmp.combo++;
		}
	}
	if (tmp.combo>0){
		tmp.combo = 0;
		checkGrid();
	}

	var damage = checkDamage({characterType: you.type, enemyType: enemy.type});
	console.log('Total Damage: '+ damage + ', grass: ' + grassDamage + ', fire: ' + fireDamage + ', water: ' + waterDamage + ', electric: ' + elecDamage + ', wind: ' + windDamage);
	enemy.update({currentHP: enemy.currentHP - damage});
	waterDamage = 0;
	fireDamage = 0;
	grassDamage = 0;
	elecDamage = 0;
	windDamage = 0;
}