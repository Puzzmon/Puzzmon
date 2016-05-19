
window.onload = function(){
	var screen = document.getElementById('grid');

	var newCircle = function(spec){
		circle = document.createElement('img');
		/*circle.style.width = '50px';
		circle.style.height = '50px';*/
		circle.src = 'resources/img/' + (spec.src ||'circle.png');
		circle.className = spec.className || '';
		circle.draggable = false;
		circle.setAttribute('value', spec.val);
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
			return td;
		}

		grid.draw = function(){
			for(var i=0; i<5;i++){
				var tr = newTr();
				for (var j=0; j<5; j++){
					var td = newTd(i, j);
					var className = 'type-'+grid.pattern[i][j];
					td.appendChild(newCircle({src: 'circle'+grid.pattern[i][j]+'.png', className: className,i: i, j: j, val: grid.pattern[i][j]}));
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
		character.name = spec.name;
		character.style.width= '100px';
		character.style.height = '100px';
		character.style.border = '3px solid black';
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
		character.innerHTML = character.name + '('+character.typeName+'): ' + character.currentHP + ' / ' + character.maxHP;
		character.update = function(spec){
			character.currentHP = spec.currentHP;
			character.innerHTML = character.name + '('+character.typeName+'): ' + character.currentHP + ' / ' + character.maxHP;
			if (character.currentHP <=0)
				character.innerHTML = 'DEAD';
			return character;
		}

		return character;
	}

	function printMap(object){
		console.log(object);
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
