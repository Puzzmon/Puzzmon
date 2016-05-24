var levelID = 1;
var enemyList = {};
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
var exp = 0;
var turn = 0;
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





function selectEnemy(object){
	for(var i = 0; i<enemyList.length; i++){
		//enemyList[i].style.border = '3px solid black';
		enemyList[i].style.backgroundImage = 'url("resources/img/pet' + enemyList[i].number + '.gif")';
		enemyList[i].aimed = false;
	}
	enemy=object;
	enemy.style.backgroundImage = 'url("resources/img/lockon.png"), url("resources/img/pet' +enemy.number + '.gif")';
	enemy.aimed = true;
	//enemy.style.border =  '3px solid blue';
}

function checkResult(){
	//enemyList = document.getElementsByClassName('enemy');
	console.log(enemyList, enemyList.length);
	ally = document.getElementsByClassName('you');
	if (enemyList.length < 1 && ally.length < 1){
		alert('draw');
	}
	else if (enemyList.length <1){
		var f = document.createElement('form');
		f.action = 'dame_exp_premoh.php';
		f.method = 'post'

		var i=document.createElement('input');
		i.type='hidden';
		i.name='setexp';
		i.value=exp;
		var i2=document.createElement('input');
		i2.type='hidden';
		i2.name='unlock';
		i2.value=1;
		f.appendChild(i);
		f.appendChild(i2);
		document.body.appendChild(f);
		f.submit();
	}
	else if (ally.length < 1){
		window.location ='index.php';
	}
}

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
				cells[i].setAttribute('onmouseout', '');
				cells[i].style.backgroundColor = '';
				tmp.levelMap[j][k] = cells[i].firstChild.getAttribute('value');
			}	
		}
		checkGrid();
		if(tmp.move > 0){
			var enemyDamage = 0;
			for(var i = 0; i<enemyList.length; i++){
				switch (enemyList[i].type){
					case 1:
						grassDamage = 3;
						break;
					case 2:
						fireDamage = 3;
						break;
					case 3:
						waterDamage = 3;
						break;
					case 4:
						elecDamage = 3;
						break;
					case 5:
						windDamage = 3;
						break;
				}
				if(enemyList[i].currentHP > 0)
				enemyDamage+= checkDamage({characterAttack: enemyList[i].attack, enemyDefense: you.defense, characterType: enemyList[i].type, enemyType: you.type});
				waterDamage = 0;
				fireDamage = 0;
				grassDamage = 0;
				elecDamage = 0;
				windDamage = 0;
			}
			setTimeout(function(){
				you.update({currentHP: you.currentHP - enemyDamage});
				//checkResult();
			}, 500)
			
		}
			
		tmp.move=0;
		document.onmouseup = "";

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
/* 1 = planta, 2 = fuego, 3 = agua, 4 = luz, 5 = oscuridad */ 
	switch (spec.damageType){
		case 1:
			switch (spec.enemyType){
				case 1: return 1; break;
				case 2: return 0.75; break;
				case 3: return 1.5; break;
				case 4: return 1.5; break;
				case 5: return 0.75; break;
			}
		break;
		case 2:
			switch (spec.enemyType){
				case 1: return 1.5; break;
				case 2: return 1; break;
				case 3: return 0.75; break;
				case 4: return 1.5; break;
				case 5: return 0.75; break;
			}
		break;
		case 3:
			switch (spec.enemyType){
				case 1: return 0.75; break;
				case 2: return 1.5; break;
				case 3: return 1; break;
				case 4: return 0.75; break;
				case 5: return 1.5; break;
			}
		break;
		case 4:
			switch (spec.enemyType){
				case 1: return 0.75; break;
				case 2: return 0.75; break;
				case 3: return 1.5; break;
				case 4: return 1; break;
				case 5: return 1.5; break;
			}
		break;
		case 5:
			switch (spec.enemyType){
				case 1: return 1.5; break;
				case 2: return 1.5; break;
				case 3: return 0.75; break;
				case 4: return 0.75; break;
				case 5: return 1; break;
			}
		break;
	}
}

function checkBoost(spec){
	if (spec.damageType == spec.characterType)
		return 1.25;
	else
		return 1;
}

function checkDamage(spec){
	grassDamage= (spec.characterAttack * (1 + (grassDamage - 3) / 4) * checkBoost({characterType: spec.characterType, damageType: 1}) * checkEffectivity({enemyType: spec.enemyType, damageType: 1})) -spec.enemyDefense;
	fireDamage= (spec.characterAttack * (1 + (fireDamage - 3) / 4) * checkBoost({characterType: spec.characterType, damageType: 2}) * checkEffectivity({enemyType: spec.enemyType, damageType: 2})) -spec.enemyDefense;
	waterDamage= (spec.characterAttack * (1 + (waterDamage - 3) / 4) * checkBoost({characterType: spec.characterType, damageType: 3}) * checkEffectivity({enemyType: spec.enemyType, damageType: 3})) -spec.enemyDefense;
	elecDamage= (spec.characterAttack * (1 + (elecDamage - 3) / 4) * checkBoost({characterType: spec.characterType, damageType: 4}) * checkEffectivity({enemyType: spec.enemyType, damageType: 4})) -spec.enemyDefense;
	windDamage= (spec.characterAttack * (1 + (windDamage - 3) / 4) * checkBoost({characterType: spec.characterType, damageType: 5}) * checkEffectivity({enemyType: spec.enemyType, damageType: 5})) -spec.enemyDefense;

	if(grassDamage <= 0)
		grassDamage = 0;
	if(fireDamage <= 0)
		fireDamage = 0;
	if(waterDamage <= 0)
		waterDamage = 0;
	if(elecDamage <= 0)
		elecDamage = 0;
	if(windDamage <= 0)
		windDamage = 0;


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
			var thisRow = document.getElementsByClassName('row-' + i);
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
				var value = Math.floor((Math.random() * 5) + 1);
				tmp.levelMap[x][y-j] = value;
				thisRow[y-j].changeCircle(value);
				//thisRow[y-j].appendChild(newCircle({val: value}));
				
				
			}
			tmp.combo++;
		}
		if (pos.column[i]){
			var thisColumn = document.getElementsByClassName('column-' + i);
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
				var value = Math.floor((Math.random() * 5) + 1);
				tmp.levelMap[x-j][y] = value;
				thisColumn[x-j].changeCircle(value);
				//thisColumn[x-j].appendChild(newCircle({val: value}));
				
				//map.changePattern({pattern: tmp.levelMap});
				
			}
			tmp.combo++;
		}
	}
	if (tmp.combo>0){
		tmp.combo = 0;
		setTimeout(function(){
			checkGrid();
		}, 550);	
	}
	var heal = 0;
	if (grassDamage >= 5 || fireDamage >= 5 || waterDamage >=5 || elecDamage >= 5 || windDamage >=5){
		heal++;
	}
		
	var damage = checkDamage({characterAttack: you.attack, enemyDefense: enemy.defense, characterType: you.type, enemyType: enemy.type});
	console.log('Total Damage: '+ damage + ', grass: ' + grassDamage + ', fire: ' + fireDamage + ', water: ' + waterDamage + ', electric: ' + elecDamage + ', wind: ' + windDamage);
	if (turn > 0) enemy.update({currentHP: enemy.currentHP - damage});
	if (heal > 0){
		you.update({currentHP: you.currentHP + damage});
		console.log(you.currentHP + (damage/2));
	}
		
	waterDamage = 0;
	fireDamage = 0;
	grassDamage = 0;
	elecDamage = 0;
	windDamage = 0;
}