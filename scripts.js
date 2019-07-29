var winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];
var positionsOfX = [];
var positionsOfO = [];
var start = -1; //-1 defines X will start the game
var indexOfX = 0;
var indexOfO = 0;
var availableMovesCount = 9;
var availableMoves = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
var gameBoard = ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"]; //-1->Blank //1->X //0->O
var orignalBoard = new Array(gameBoard);
var flag = 0;
var humanPlayer = "X";
var aiPlayer = "O";
$(document).ready(function () {
    $('.game').click(function () {
        if ($('#' + this.id).html() == "") {
            XPlays(this.id);
            OPlays();
        }
    });

    function XPlays(position) {
        if ($('#' + position).html() == "") {
            positionsOfX[indexOfX++] = position;
            $("#" + position).html("X");
            positionsOfX.sort();
            gameBoard[position] = "X";
            availableMoves.splice(availableMoves.indexOf(position.toString()), 1);
            availableMovesCount--;
            if (positionsOfX.length > 2)
                if (checkWin(gameBoard, "X"))
                    alert("X Wins");
        }
    }

    function OPlays() {
        var pos = getBestMove(gameBoard, aiPlayer);
        if ($('#' + pos).html() == "") {
            positionsOfO[indexOfO++] = pos;
            $("#" + pos).html("O");
            positionsOfO.sort();
            gameBoard[pos] = "O";
            availableMoves.splice(availableMoves.indexOf(pos.toString()), 1);
            availableMovesCount--;
            if (positionsOfO.length > 2)
                if (checkWin(gameBoard, "O"))
                    alert("O Wins");
        }
    }



    function checkWin(Board, player) {
        var positionOfElement = new Array();
        var newBoard = Board.slice(0);
        positionOfElement = getIndexesOfElement(newBoard, player);
        for (var i = 0; i < winningPositions.length; i++) {
            var win = winningPositions[i];
            var j = 0;
            count = 0;
            index = 0;
            while (j < 3 && index < positionOfElement.length) {
                if (win[j] == positionOfElement[index]) {
                    j++;
                    count++;
                    index++;
                    if (count == 3 && availableMovesCount >= 0) {
                        return true;
                    } else if (availableMovesCount == 0) {
                        return false;
                    }
                } else {
                    index++;
                }
            }
            j = 0;
            count = 0;
            index = 0;
        }
    }

    function getIndexesOfElement(Board, player) {
        var newBoard = Board.slice(0);
        var indexes = [];
        for (var i = 0; i < newBoard.length; i++) {
            var index = newBoard.indexOf(player, i);
            if (index != -1 && !indexes.includes(index))
                indexes.push(index);
        }
        return indexes;
    }

    function getBestMove(Board, player) {
        var newBoard = Board.slice(0);
        var newAvailableMoves = getIndexesOfElement(newBoard, "-1");
        if (checkWin(newBoard, humanPlayer)) {
            var result = -10;
            return result;
        } else if (checkWin(newBoard, aiPlayer)) {
            var result = 20;
            return result;
        } else if (newAvailableMoves.length == 0) {
            var result = 0;
            return result;
        }
        var moves = [];
        for (var i = 0; i < newAvailableMoves.length; i++) {
            var checkMove = {};
            newBoard[newAvailableMoves[i]] = player;
            if (player == humanPlayer) {
                var result = getBestMove(newBoard, aiPlayer);
                checkMove.index = newAvailableMoves[i];
                checkMove.score = result;
            } else if (player == aiPlayer) {
                var result = getBestMove(newBoard, humanPlayer);
                checkMove.index = newAvailableMoves[i];
                checkMove.score = result;
            }
            moves.push(checkMove);
        }
        var bestMove;
        if (player == aiPlayer) {
            var bestScore = -999;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i].index;
                }
            }
        } else if (player == humanPlayer) {
            var bestScore = 999;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i].index;
                }
            }
        }
        return bestMove;
    }
});
