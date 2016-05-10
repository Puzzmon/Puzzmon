
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
		character.name = spec.name;
		character.style.width= '100px';
		character.style.height = '100px';
		character.style.border = '1px solid blue';
		//character.style.display = 'inline';
		character.maxHP = spec.maxHP || 100;
		character.currentHP = spec.currentHP || 100;
		character.innerHTML = character.name + ': ' + character.currentHP + ' / ' + character.maxHP;
		character.update = function(spec){
			character.currentHP = spec.currentHP;
			character.innerHTML = character.name + ': ' + character.currentHP + ' / ' + character.maxHP;
			if (character.currentHP <=0)
				character.innerHTML = 'DEAD';
			return character;
		}

		return character;
	}
	enemy = newCharacter({name: 'Enemy'});
	you = newCharacter({maxHP: 20, currentHP: 20, name: 'You'});
	screen.appendChild(enemy);
	screen.appendChild(you);
	checkGrid();
	you.update({currentHP: 20});
	enemy.update({currentHP: 100});
	tmp.points=0;

}

