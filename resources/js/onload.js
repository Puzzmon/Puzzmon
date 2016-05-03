
window.onload = function(){
	var screen = document.getElementsByTagName('body')[0];
	var levelMap = [[1,2,3,5,4], [1,3,5,2,2], [2,1,2,4,4], [3,5,1,2,3], [1,5,2,1,4]];

	var newCircle = function(spec){
		circle = document.createElement('img');
		/*circle.style.width = '50px';
		circle.style.height = '50px';*/
		circle.src = 'resources/img/' + (spec.src ||'circle.png');
		circle.id = 'circle' + spec.i + spec.j || '';
		circle.className = spec.className || '';
		circle.draggable = false;
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
			td.id = 'td'+i+j;
			td.setAttribute('onmousedown', 'getMouse(this, event)');
			td.row = i;
			td.column = j;
			td.className = 'row-' +i + ' column-'+j || '';
			return td;
		}

		for(var i=0; i<5;i++){
			var tr = newTr();
			for (var j=0; j<5; j++){
				var td = newTd(i, j);
				var className = 'type-'+grid.pattern[i][j];
				td.appendChild(newCircle({src: 'circle'+grid.pattern[i][j]+'.png', className: className,i: i, j: j}));
				tr.appendChild(td);
			}
			grid.appendChild(tr);
		}


		return grid;

	}

	var map = newGrid({pattern: levelMap});
	screen.appendChild(map);
}