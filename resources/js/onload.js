
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

	var map = newGrid({pattern: tmp.levelMap});
	screen.appendChild(map);
	//tmp.levelMap = [[1,1,1,1,1], [1,3,5,2,2], [2,1,2,4,4], [3,5,1,2,3], [1,5,2,1,4]];
	map.changePattern({pattern: tmp.levelMap});



}