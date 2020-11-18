      let player = null;
      let opponent = null;
      let turn = null;
      const board = [];


      const switchTurn = () => {
          if (turn === player) turn = opponent;
          else turn = player;
      };
      
      const boardRead = () => {
          let aiBoard = [];
          let currBoard = document.querySelectorAll('#mainBoard > div');
          currBoard.forEach(box => {
              box.innerHTML == "" ? aiBoard.push(Number(box.dataset.index)) : aiBoard.push(box.innerHTML);
          })
          
          return aiBoard;
      }
      
      // Returns the list of indexes of empty spots
      const emptyIndex = (board) => {
          return board.filter(box => box != 'O' && box != 'X');
      };

      function winning(board, player){
          if (
              (board[0] == player && board[1] == player && board[2] == player) ||
              (board[3] == player && board[4] == player && board[5] == player) ||
              (board[6] == player && board[7] == player && board[8] == player) ||
              (board[0] == player && board[3] == player && board[6] == player) ||
              (board[1] == player && board[4] == player && board[7] == player) ||
              (board[2] == player && board[5] == player && board[8] == player) ||
              (board[0] == player && board[4] == player && board[8] == player) ||
              (board[2] == player && board[4] == player && board[6] == player)
          ) {
              return true;
          } else {
              return false;
          }
      }

      function miniMax(newBoard, currPlayer) {
          let availSpots = emptyIndex(newBoard);

          if (winning(newBoard, player.type)) {
              return {score: -10};
          }
          else if (winning(newBoard, opponent.type)) {
              return {score: 10};
          }
          else if (availSpots.length === 0) {
              return {score: 0};
          }
          
          let moves = [];

          for (let i = 0; i < availSpots.length; i++) {
              let move = {};
              move.index = newBoard[availSpots[i]];
              newBoard[availSpots[i]] = currPlayer;

              if (currPlayer == opponent.type) {
                  let result = miniMax(newBoard, player.type);
                  move.score = result.score;
              }
              else {
                  let result = miniMax(newBoard, opponent.type);
                  move.score = result.score;
              }

              newBoard[availSpots[i]] = move.index;

              moves.push(move);
          }
          
          let bestMove;
          if (currPlayer == opponent.type) {
              let bestScore = -10000;
              for (let i = 0; i < moves.length; i++) {
                  if (moves[i].score > bestScore) {
                      bestScore = moves[i].score;
                      bestMove = i;
                  }
              }
          }
          else {
              let bestScore = 10000;
              for (let i = 0; i < moves.length; i++) {
                  if (moves[i].score < bestScore) {
                      bestScore = moves[i].score;
                      bestMove = i;
                  }
              }
          }
          
          return moves[bestMove];
      }

      const checkWinner = () => {
          let foundWinner = false;
          let divs = document.querySelectorAll("#mainBoard > div");
          
          //checks for row winning pattern
          for (let row = 1; row <= 3; row++) {
              let possibleWinner = [];
              let winnerDivs = [];
              for (let col = 1; col <= 3; col++) {
                  let matchedDiv;
                  divs.forEach(div => {
                      if (div.dataset.row == row && div.dataset.col == col) {
                          matchedDiv = div;
                      }
                  });
                  possibleWinner.push(matchedDiv.innerText);
                  winnerDivs.push(matchedDiv);
              }
              
              for (let i = 0; i < possibleWinner.length - 1; i++) {
                  // debugger;
                  let curr = possibleWinner[i];
                  let next = possibleWinner[i + 1]
                  
                  if (curr != next || curr == "") {
                      break;
                  }
                  if (i == possibleWinner.length - 2) {
                      foundWinner = true;
                      for (let each of winnerDivs) {
                          each.classList.add('winnerColor');
                      }
                  }
              }
          }
          
          //checks for column winning pattern
          for (let col = 1; col <= 3; col++) {
              let possibleWinner = []
              let winnerDivs = [];
              
              for (let row = 1; row <= 3; row++) {
                  let matchedDiv;
                  divs.forEach(div => {
                      if (div.dataset.row == row && div.dataset.col == col) {
                          matchedDiv = div;
                      }
                  });
                  possibleWinner.push(matchedDiv.innerText);
                  winnerDivs.push(matchedDiv);

              }

              for (let i = 0; i < possibleWinner.length - 1; i++) {
                  // debugger;
                  let curr = possibleWinner[i];
                  let next = possibleWinner[i + 1]

                  if (curr != next || curr == "") {
                      break;
                  }
                  if (i == possibleWinner.length - 2) {
                      foundWinner = true;
                      for (let each of winnerDivs) {
                          each.classList.add('winnerColor');
                      }
                  }
              }
          }

          let start = 1;
          let end = 3;

          //Checks for right diagonal winning pattern
          let possibleWinner = [];
          let winnerDivs = [];

          for (let row = start; row <= end; row++) {
              let col = row;
              let matchedDiv;
              divs.forEach(div => {
                  if (div.dataset.row == row && div.dataset.col == col) {
                      matchedDiv = div;
                  }
              });
              possibleWinner.push(matchedDiv.innerText);
              winnerDivs.push(matchedDiv);

          }
          
          for (let i = 0; i < possibleWinner.length - 1; i++) {
              // debugger;
              let curr = possibleWinner[i];
              let next = possibleWinner[i + 1]

              if (curr != next || curr == "") {
                  break;
              }
              if (i == possibleWinner.length - 2) {
                  foundWinner = true;
                  for (let each of winnerDivs) {
                      each.classList.add('winnerColor');
                  }
              }
          }
          
          //Checks for left diagonal winning pattern
          possibleWinner = [];
          winnerDivs = [];

          for (let row = start; row <= end; row++) {
              let col = 4 - row;
              let matchedDiv;
              divs.forEach(div => {
                  if (div.dataset.row == row && div.dataset.col == col) {
                      matchedDiv = div;
                  }
              });
              possibleWinner.push(matchedDiv.innerText);
              winnerDivs.push(matchedDiv);

          }
          for (let i = 0; i < possibleWinner.length - 1; i++) {
              // debugger;
              let curr = possibleWinner[i];
              let next = possibleWinner[i + 1]

              if (curr != next || curr == "") {
                  break;
              }
              if (i == possibleWinner.length - 2) {
                  foundWinner = true;
                  for (let each of winnerDivs) {
                      each.classList.add('winnerColor');
                  }
              }
          }
          
          return foundWinner;
      };
      
      let i = 0;
      
      const reset = () => {
          document.querySelector('#overlay').classList.remove('overlay');
          gameBoard.splice(0, gameBoard.length);
          // debugger;
          let msg = document.querySelector("#message");
          msg.innerHTML = "";
          let divs = document.querySelectorAll('div');
          divs.forEach(div => {
              div.classList.remove('winnerColor');
          })
          renderBoard();

          //

         
          
          if (i % 2 == 0) {
              i++;
              // aiPlay(board);
              let mainDivs = document.querySelectorAll('#mainBoard > div');
              
              let ranDiv = mainDivs[Math.floor(Math.random() * mainDivs.length)]
              let aiRow = ranDiv.dataset.row;
              let aiCol = ranDiv.dataset.col;


              turn.addMove(aiRow, aiCol);
              board.push(turn.moves[turn.moves.length-1]);
              switchTurn();
              renderBoard();
          }
          else {
              i++;
          }

      };
      
      const aiPlay = (board) => {
          let currBoard = boardRead();
          let bestMove = miniMax(currBoard, turn.type);

          let aiChoice = document.querySelector(`[data-index="${bestMove.index}"]`);
          let aiRow = aiChoice.dataset.row;
          let aiCol = aiChoice.dataset.col;


          turn.addMove(aiRow, aiCol);
          board.push(turn.moves[turn.moves.length-1]);
      }
      
      const gameBoard = (() => {

          const resetBtn = document.querySelector('#reset');
          resetBtn.addEventListener('click', reset);
          resetBtn.addEventListener('click', () => {
              
              resetBtn.classList.add('bigger');
          });
          resetBtn.addEventListener('transitionend', () => {
              resetBtn.classList.remove('bigger');
          });
          const btns = document.querySelectorAll('#choice > button');
         
          btns.forEach(btn => {
              btn.addEventListener('click', () => {
                  btn.classList.add('bigger');
                  
                  if (board.length == 0) {
                      player = Player(btn.dataset.type);
                      opponent = (player.type == 'O' ? Player('X') : Player('O'));
                      turn = player;
                  }
              })
              
              btn.addEventListener('transitionend', () => {
                  // debugger
                  btn.classList.remove('bigger');
              })
          });
          // const board = [];

          let boxes = document.querySelectorAll('#mainBoard > div');
          boxes.forEach(box => {
              
              box.addEventListener('mouseover', () => {
                  if (box.innerHTML == "" && !checkWinner()) {
                      box.innerHTML = turn.type;
                      box.classList.add('dim');
                  }
                  
              });
              
              box.addEventListener('mouseout', () => {
                  if (box.classList.contains('dim')) {
                      box.innerHTML = "";
                      box.classList.remove('dim');
                  }
              })
              
              box.addEventListener('click', () => {
                  box.classList.remove('dim');
                  
                  let row = box.dataset.row;
                  let col = box.dataset.col;
                  
                  outer:
                      for (let i = 0; i < 1; i++) {
                        for (let move of gameBoard) {
                          if (move.row == row && move.col == col) {
                              break outer;
                          }
                        }
                          turn.addMove(row, col);
                          board.push(turn.moves[turn.moves.length-1]);
                          if (!checkWinner()) {
                              renderBoard();
                          }
                          if (checkWinner()) {
                              let msg = document.querySelector("#message");
                              msg.innerHTML = `Winner is '${turn.type}' player`;

                              document.querySelector('#resetSec').classList.remove('displayNone');
                              document.querySelector('#footer').classList.remove('displayNone');
                              document.querySelector('#overlay').classList.add('overlay');

                              break outer;
                          };
                          
                          checkDraw();
                          switchTurn();


                          aiPlay(board);
                          
                          if (!checkWinner()) {
                              renderBoard();
                          }
                          if (checkWinner()) {
                              let msg = document.querySelector("#message");
                              msg.innerHTML = `Winner is '${turn.type}' player`;

                              document.querySelector('#resetSec').classList.remove('displayNone');
                              document.querySelector('#footer').classList.remove('displayNone');
                              document.querySelector('#overlay').classList.add('overlay');

                              break outer;
                          };

                          checkDraw();
                          switchTurn();
                      }
              })
          });
          
          return board;
      })();
      
      const Player = (type) => {
          const moves = [];
          const addMove = (row, col) => {
              moves.push({type, row, col})
          };
          return {type, moves, addMove};
      };
      
      const renderBoard = () => {

          let divs = document.querySelectorAll('#mainBoard > div');
          divs.forEach(div => {
              div.innerHTML = "";
          })
          
          for (let move of gameBoard) {
              let playedBox = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
              playedBox.innerHTML = move.type;
          }
      };
      
      const checkDraw = () => {
          if (gameBoard.length == 9 && checkWinner() == false) {
              let msg = document.querySelector("#message");
              msg.innerHTML = "DRAW!";
              document.querySelector('#resetSec').classList.remove('displayNone');
              document.querySelector('#footer').classList.remove('displayNone');
              document.querySelector('#overlay').classList.add('overlay');
          }
      }