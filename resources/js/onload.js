
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
	checkGrid();
	score = document.getElementById('points');
	tmp.points=0;
	score.innerHTML = "points: 0";

}

