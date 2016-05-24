
window.onload = function(){
	var screen = document.getElementById('grid');

	var newCircle = function(spec){
		circle = document.createElement('img');
		/*circle.style.width = '50px';
		circle.style.height = '50px';*/
		circle.src = 'resources/img/circle' + (spec.val ||'') + '.png';
		circle.className = 'type-' + spec.val;
		circle.draggable = false;
		circle.setAttribute('value', spec.val);
		circle.style.opacity = spec.opacity || '1';
		//circle.style.position = 'absolute';
		return circle;
	}

	var newGrid = function(spec){
		grid = document.createElement('table');
		grid.pattern = spec.pattern || [0];
		/*grid.style.width = 50*5 + 'px';
		grid.style.height = 50*5 + 'px';*/
		grid.id="map";
		var newTr = function(){
			var tr = document.createElement('tr');
			return tr;
		}
		var newTd = function(i, j){
			var td = document.createElement('td');
			td.setAttribute('onmousedown', 'getMouse(this, event)');
			td.row = i;
			td.column = j;
			td.className = 'row-' +i + ' column-'+j || '';
			td.changeCircle = function(value){
				td.firstChild.style.opacity = 1;
				var change = 0;
				if (turn > 0){
					td.itv = setInterval(function(){
						if (change == 0){
							td.firstChild.style.opacity-= 0.1
							if (td.firstChild.style.opacity <= 0){
								td.firstChild.style.opacity= 0;
								td.replaceChild(newCircle({val: value}), td.firstChild);
								change = 1;
								td.firstChild.style.opacity = 1;

							}
						}
						else{
							clearInterval(td.itv);
						}
					
					},50);
					//checkGrid();
				}
				else{
					//turn = 1;
					td.replaceChild(newCircle({val: value}), td.firstChild);
					//checkGrid();
				}
			}

			return td;
		}

		grid.draw = function(){
			for(var i=0; i<5;i++){
				var tr = newTr();
				for (var j=0; j<5; j++){
					var td = newTd(i, j);
					//var className = 'type-'+grid.pattern[i][j];
					td.appendChild(newCircle({val: grid.pattern[i][j]}));
					tr.appendChild(td);
				}
				grid.appendChild(tr);
			}
			return grid;
		}

		grid.changePattern = function(spec){
			grid.pattern = spec.pattern;
			grid.innerHTML = "";
			grid.draw();
		}

		grid.draw();	


		return grid;

	}
	document.ondragstart = function(e) {
		if (e.target.nodeName.toUpperCase() == "IMG") {
	 		return false;
		}
	}

	map = newGrid({pattern: tmp.levelMap});
	screen.appendChild(map);
	

	var allyZone = document.getElementById('allyZone');
	var enemyZone = document.getElementById('enemyZone');

	var newCharacter = function(spec){
		var character = document.createElement('div');
		character.className = spec.className || 'enemy';
		if (character.className == 'enemy'){
			character.setAttribute('onclick', 'selectEnemy(this)');
			
		}
		character.number = spec.id;
		character.alive = 1;
		character.name = spec.name;
		character.style.width= '100px';
		character.style.height = '100px';
		character.aimed = false;
		//character.style.border = '3px solid black';
		character.type = spec.type || 1;
		character.attack = spec.attack || 10;
		character.defense = spec.defense || 10;
		character.style.backgroundImage = 'url("resources/img/pet' + spec.id + '.gif")';
		character.style.display = 'inline-block';
		//character.style.float = 'left';
		character.style.margin= '5px';
		switch (character.type){
			case 1: character.typeName = 'grass'; break;
			case 2: character.typeName = 'fire'; break;
			case 3: character.typeName = 'water'; break;
			case 4: character.typeName = 'light'; break;
			case 5: character.typeName = 'dark'; break;
		}
		character.maxHP = spec.maxHP || 100;
		character.currentHP = spec.currentHP || character.maxHP;
		character.progress = document.createElement('div');
		character.bar = document.createElement('div');
		character.progress.className = "myProgress";
		character.bar.className = "myBar";
		character.bar.width = 100;
		character.bar.style.width = character.bar.width + '%';
		character.progress.appendChild(character.bar);
		character.appendChild(character.progress);
		character.bar.move = function(spec){
			var id = undefined;
			var oldHealth = Math.ceil(spec.oldVal / character.maxHP * 100);
			var newHealth = Math.ceil(spec.newVal / character.maxHP * 100);
			var time = 0;
			var background;
			if (character.aimed == true){
			 background = 'url("resources/img/lockon.png"), url("resources/img/pet' +character.number + '.gif")';
			}
			else{
				background = 'url("resources/img/pet' +character.number + '.gif")';
			}
			console.log(background);
			console.log(oldHealth, newHealth);
			if (turn > 0){
				if (spec.newVal > spec.oldVal){
					id = setInterval(function(){
						if (character.bar.width >= newHealth || character.bar.width >= 100) {
							clearInterval(id);
						} else {
							character.bar.width++;
							time++;
							character.bar.style.width = character.bar.width + '%'; 
							//document.getElementById("label").innerHTML = width * 1  + '%';
						}
					}, 10);
				}
				else if (spec.newVal <= spec.oldVal){
					id = setInterval(function(){
						if (character.bar.width <= newHealth || character.bar.width <= 0) {
							character.style.backgroundImage = background;
							clearInterval(id);
							if (character.bar.width <= 0){
								if(character.alive > 0){
									character.parentNode.removeChild(character);
									setTimeout(function(){checkResult()}, 500);
									character.alive = 0;

								}
								if(document.getElementsByClassName('enemy').length >= 1)
									selectEnemy(document.getElementsByClassName('enemy')[0]);
							}
						} else {
							if (time >= 0 && time < 10){
								character.style.backgroundImage = "";
							}
							else if (time >= 10 && time < 20){

								character.style.backgroundImage = background;
							}
							else if (time >= 20){
								time=0;
							}
							time++
							character.bar.width--; 
							character.bar.style.width = character.bar.width + '%'; 
							//document.getElementById("label").innerHTML = width * 1  + '%';
						}
					}, 10);
				}
			}

			return character.bar;
		}

		//character.innerHTML = character.name + '('+character.typeName+'): ' + character.currentHP + ' / ' + character.maxHP;
		character.update = function(spec){
			character.bar.move({newVal: spec.currentHP, oldVal: character.currentHP});
			character.currentHP = spec.currentHP;
			if(character.currentHP >= character.maxHP)
				character.currentHP = character.maxHP;
			//character.innerHTML = character.name + '('+character.typeName+'): ' + character.currentHP + ' / ' + character.maxHP;
			if (character.currentHP <=0){
				character.currentHP = 0;
			}
			
				//character.innerHTML = 'DEAD';
			return character;
		}

		return character;
	}

	function printMap(object){
		console.log(object);
		exp = object.enemy1.Exp;
		console.log(exp);
		you = newCharacter({
			id: object.character.ID,
			maxHP: object.character.HP,
			name: object.character.Name, 
			level: object.character.Level, 
			type: object.character.Type, 
			defense: object.character.Def, 
			attack: object.character.Atk,
			className: 'you'
		});
		enemyZone.appendChild(newCharacter({
			id: object.enemy1.ID,
			maxHP: object.enemy1.HP,
			name: object.enemy1.Name, 
			level: object.enemy1.Level, 
			type: object.enemy1.Type, 
			defense: object.enemy1.Def, 
			attack: object.enemy1.Atk,
			className: 'enemy'
		}));

		if(object.enemy2.ID != 0){
			enemyZone.appendChild(newCharacter({
				id: object.enemy2.ID,
				maxHP: object.enemy2.HP,
				name: object.enemy2.Name, 
				level: object.enemy2.Level, 
				type: object.enemy2.Type, 
				defense: object.enemy2.Def, 
				attack: object.enemy2.Atk,
				className: 'enemy'
			}));

		}
		if(object.enemy3.ID != 0){
			enemyZone.appendChild(newCharacter({
				id: object.enemy3.ID,
				maxHP: object.enemy3.HP,
				name: object.enemy3.Name, 
				level: object.enemy3.Level, 
				type: object.enemy3.Type, 
				defense: object.enemy3.Def, 
				attack: object.enemy3.Atk,
				className: 'enemy'
			}));

		}

		selectEnemy(document.getElementsByClassName('enemy')[0]);
		enemyList = document.getElementsByClassName('enemy');
		allyZone.appendChild(you);
		checkGrid();
		you.update({currentHP: you.maxHP});
		for(var i = 0; i < enemyList.length; i++){
			enemyList[i].update({currentHP: enemyList[i].maxHP});
		}
		turn=1;
		tmp.points=0;
	}

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

	ajaxCall('prueba_mapa.php', {level: levelID}, printMap);
	/*newCharacter({name: 'Enemy', bg: 'pet1.png', className: 'enemy'});
	newCharacter({name: 'Enemy', bg: 'pet1.png', className: 'enemy'});*/
	/*you = newCharacter({maxHP: 20, currentHP: 20, name: 'You', className: 'you', type: 2, attack: 14, bg: 'pet2.png'});
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet1.gif', maxHP: 69, type: 1, className: 'enemy'}));
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet5.gif', maxHP: 66, type: 5, className: 'enemy'}));
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet3.png',maxHP: 77, type: 3, defense: 8, className: 'enemy'}));
	selectEnemy(document.getElementsByClassName('enemy')[0]);
	enemyList = document.getElementsByClassName('enemy');
	screen.appendChild(you);*/

	//(ataque * ((1+(n-3)/4) * resistencia * bonificación) - defensa);
	//console.log((10 * (1+(3-3)/4) * 2* 1.5) - 10);

}
