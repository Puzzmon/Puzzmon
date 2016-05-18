
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
	

	var screen = document.getElementById('battle');

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
		character.style.backgroundImage = 'url("resources/img/' + spec.bg + '")';
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
	/*newCharacter({name: 'Enemy', bg: 'pet1.png', className: 'enemy'});
	newCharacter({name: 'Enemy', bg: 'pet1.png', className: 'enemy'});*/
	you = newCharacter({maxHP: 20, currentHP: 20, name: 'You', className: 'you', type: 2, attack: 14, bg: 'pet2.png'});
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet1.gif', maxHP: 69, type: 1, className: 'enemy'}));
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet5.gif', maxHP: 66, type: 5, className: 'enemy'}));
	screen.appendChild(newCharacter({name: 'Enemy', bg: 'pet3.png',maxHP: 77, type: 3, defense: 8, className: 'enemy'}));
	selectEnemy(document.getElementsByClassName('enemy')[0]);
	enemyList = document.getElementsByClassName('enemy');
	screen.appendChild(you);
	checkGrid();
	you.update({currentHP: 20});
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].update({currentHP: enemyList[i].maxHP});
	}
	
	tmp.points=0;
	//(ataque * ((1+(n-3)/4) * resistencia * bonificación) - defensa);
	console.log((10 * (1+(3-3)/4) * 2* 1.5) - 10);

}
