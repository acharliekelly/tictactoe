
/**
 *  Player object
 * takes name, color, and ImageSource
 */
const Player = function(name, color, image) {
  this.name = name.toUpperCase();
  this.mark = image;
  this.color = color;
  this.data = name + 'd';
  this.turnCls = name + '-turn';
  this.winCls = name + '-win';
}

const getImageStr = (player) => {
  return`<img id="move-${currentMove}" src="${player.mark}" alt="${player.name}" class="${player.name}">`;
}


const playerX = new Player('x', '#f00', 'https://i.imgur.com/HWSmhUG.png');
const playerO = new Player('o', '#00f', 'https://i.imgur.com/IyPq5IU.png');

const PLAYERS = [
  playerX, playerO
];

let currentPlayerIndex = 0; // index of players

let currentMove = 0;  // number of moves


const getCurrentPlayer = () => PLAYERS[currentPlayerIndex];

const getPlayerClassName = (player) =>  player.turnCls;

/**
 *  nextPlayer()
 * run after move - transfers board control to other player
 */
const nextPlayer = () => {
  // set current move
  currentMove++;
  $('#current-move .move').html(currentMove);

  if (checkForWinner()) {
    // do nothing
  } else if (currentMove > 9) {
    // no possible moves left
    noMoves();

  } else {
    // set current player
    currentPlayerIndex = ((currentPlayerIndex + 1) % 2);
    const player = getCurrentPlayer();
    setPlayer(player);
  }
}

/**
 *  setPlayer (Player)
 * sets the current player
 */
const setPlayer = (player) => {
  $('#current-player').removeClass('x-turn o-turn').addClass(player.turnCls)
  $('#board').removeClass().addClass(player.turnCls);
  $('#current-player .player').html(player.name);
}


/**
 *  checkForWinner()
 *
 *  TODO: DRY this out - currently lacks elegance
 */
const checkForWinner = () => {
  // these are all the possible ways of winning (on a 3x3 board)
  // replace PLAYER with the player class to see if player has won
  const WINNING = [
    '#cell-0-0.PLAYER, #cell-0-1.PLAYER, #cell-0-2.PLAYER', // Col 1
    '#cell-1-0.PLAYER, #cell-1-1.PLAYER, #cell-1-2.PLAYER', // Col 2
    '#cell-2-0.PLAYER, #cell-2-1.PLAYER, #cell-2-2.PLAYER', // Col 3
    '#cell-0-0.PLAYER, #cell-1-0.PLAYER, #cell-2-0.PLAYER', // Row 1
    '#cell-0-1.PLAYER, #cell-1-1.PLAYER, #cell-2-1.PLAYER', // Row 2
    '#cell-0-2.PLAYER, #cell-1-2.PLAYER, #cell-2-2.PLAYER', // Row 3
    '#cell-0-0.PLAYER, #cell-1-1.PLAYER, #cell-2-2.PLAYER', // diagonal 1
    '#cell-0-2.PLAYER, #cell-1-1.PLAYER, #cell-2-0.PLAYER', // diagonal 2
  ]

  if (getWinningArray(WINNING, playerX)) {
    return true;
  }
  if (getWinningArray(WINNING, playerO)) {
    return true;
  }
  return false;
}

/**
 * getWinningArray (array[], Player)
 * receives array of possible win combinations, checks for win by player
 * by string replacement/jQuery search
 */
const getWinningArray = (array, player) => {
  for (let i=0; i<array.length; i++) {
    const selector = array[i].replace(/PLAYER/g, player.data);
    if ($(selector).length===3) {
      $(selector).css('background-color', player.color);
      declareWinner(player);
      return true;
    }
  }
  return false;
}


/**
 * clearBoard()
 *  empties board after game, removes player classes
 */
const clearBoard = () => {
  currentMove = 1;
  currentPlayerIndex = 0;
  $('.cell')
    .empty()
    .css('background-color', '')
    .removeClass('xd od');
  $('#current-player').removeClass('x-turn o-turn').show();
  $('#board').removeClass();
  $('#current-player .player').empty();
  $('#current-move .move').empty();
  $('#heading').removeClass().html('Tic-Tac-Toe');
}

/**
 *  initBoard()
 * initialize board at start of game
 */
const initBoard = () => {
  clearBoard();
  $('#current-move .move').html(currentMove);
  setPlayer(playerX);

  $('#resetBtn').bind('click', initBoard)
  $('#heading').off('click');

  $('.cell').click(function(){
    const player = getCurrentPlayer();
    // check if cell has image
    if ($(this).children('img').length === 0) {
      // if not, add image, finish move
      const img = getImageStr(player);
      $(this).addClass(player.data).append(img);
      // give control to other player
      nextPlayer();
    }

  });
}

/**
 *  declareWinner (Player)
 * delcares that designated player has won, disables board
 */
const declareWinner = (player) => {
  $('#current-player').removeClass();
  $('#board').removeClass();
  $('#board').addClass(player.winCls);
  $('.cell').off('click');
  $('#heading')
    .addClass(player.winCls)
    .html(player.name + ' Wins!')
    .bind('click', initBoard);
}

/**
 *  noMoves()
 * declares no more moves are available, disables board
 */
const noMoves = () => {
  $('#board').removeClass();
  $('#current-player').removeClass();
  $('#current-player .player').html('--');
  $('#heading')
    .addClass('none')
    .html('No Winner')
    .bind('click', initBoard);
}



// jQuery init
$(function() {

  initBoard();

});
