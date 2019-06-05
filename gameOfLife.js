var GameOfLife = function () {
	this.board;
}

GameOfLife.prototype.nextGeneration = function() {
	var newBoard = [];
	
	for (var i = 0; i < this.board.length; i++) {		
		var newRow = [];
		for (var j = 0; j < this.board[i].length; j++) {
			newRow.push(this.board[i][j]);
			var aliveNeighbours = this.getNumberOfAliveNeighbours(i,j);
			if (!this.isAlive(i,j)) {
				if (aliveNeighbours === 3) newRow[j] = '*';
			}
			else {
				if (aliveNeighbours < 2 || aliveNeighbours > 3) newRow[j] = '.';
			}
		}
		newBoard.push(newRow);
	}
	this.board = newBoard;
}

GameOfLife.prototype.getNumberOfAliveNeighbours = function(rowIndex, columnIndex) {
	var aliveNeighboursOfThisCell = 0;
	
	for (var i = rowIndex-1; i <= rowIndex+1; i++) {
		if (i < 0 || i >= this.board.length) continue;
		
		for (var j = columnIndex-1; j <= columnIndex+1; j++) {
			if (j < 0 || j >= this.board[i].length || (i === rowIndex && j === columnIndex)) continue;
			
			if (this.isAlive(i,j)) aliveNeighboursOfThisCell++;
		}
	}
	return aliveNeighboursOfThisCell;
}

GameOfLife.prototype.isAlive = function(rowIndex, columnIndex) {
	return this.board[rowIndex][columnIndex] == '*'
}

function getBoardPattern() {
	
	
	var testBoardStrings = [
		"........",
		"....*...",
		"...**...",
		"........"
		];

	var testBoard = [
		[".", ".", ".", ".", ".", ".", ".", "."],
		[".", ".", ".", ".", "*", ".", ".", "."],
		[".", ".", ".", "*", "*", ".", ".", "."],
		[".", ".", ".", ".", ".", ".", ".", "."]
		];
	
	var beaconBoard = [
		"........",		
		"..**....",		
		"..**....",		
		"....**..",		
		"....**..",
		"........"
		];

	var oscilatorBlinkerBoard = [
		"........",		
		"........",		
		"..***...",		
		"........",		
		"........",
		"........"
		];

	var oscilatorToadBoard = [
		"........",		
		"........",		
		"..***...",		
		".***....",		
		"........",
		"........"
		];

	var spaceShipGliderBoard = [
		"........",		
		"........",		
		"....*...",		
		".....*..",		
		"...***..",
		"........"
		];

	var cellularAutomationGosperGliderGunBoard = [
		"............................................................................................",		
		"....................................*.......................................................",
		"..................................*.*.......................................................",
		"........................**......**............**............................................",
		".......................*...*....**............**............................................",
		"............**........*.....*...**..........................................................",
		"............**........*...*.**....*.*.......................................................",
		"......................*.....*.......*.......................................................",
		".......................*...*................................................................",
		"........................**..................................................................",
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		"............................................................................................",		
		];
		
	board = cellularAutomationGosperGliderGunBoard;
	
	return board;
}

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

	var arrayRowData = Array.from(rowData);

    arrayRowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData == '*' ? 'O' : cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  return table;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setTitle(generationNumber) {
	document.getElementById('generationNumber').innerHTML = 'Generation number: ' + generationNumber;
}

function drawHtmlTable(board) {
		var tableContent = createTable(board);
		document.getElementById('board').innerHTML = '';
		document.getElementById('board').appendChild(tableContent);
}

async function startGame() {
	var gameOfLife = new GameOfLife();
	gameOfLife.board = getBoardPattern();	
	var generationNumber = 0;
	
	while (true) {
		
		setTitle(generationNumber);
		
		drawHtmlTable(gameOfLife.board);	
		
		gameOfLife.nextGeneration();	
		
		await sleep(80);
		generationNumber++;
	}
}
