const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const pontuacao1 = document.getElementById("pontuacao1");
const pontuacao2 = document.getElementById("pontuacao2");

const field = document.querySelectorAll(".field");
winScreen = document.getElementById("reiniciar-container");

let game = false;
let turn = true;
let plays = 0;
let victory_player_1 = [];
let victory_player_2 = [];
player1.style.backgroundColor = "rgb(130, 243, 130)";

const possible_win = [
  ["0-0", "0-1", "0-2"],
  ["1-0", "1-1", "1-2"],
  ["2-0", "2-1", "2-2"],
  ["0-0", "1-0", "2-0"],
  ["0-1", "1-1", "2-1"],
  ["0-2", "1-2", "2-2"],
  ["0-0", "1-1", "2-2"],
  ["0-2", "1-1", "2-0"],
];

function start() {
  if ((pontuacao1.value == 0 || pontuacao2 == 0) && plays != 9) {
    const name_player_1 = prompt("insira o nome do primeiro jogador");
    const name_player_2 = prompt("insira o nome do segundo jogador");
    player1.value = name_player_1 + " - X";
    player2.value = name_player_2 + " - O";
  }
  victory_player_1 = [];
  victory_player_2 = [];
  game = true;
  plays = 0;
  turn = true;
  field.forEach((span) => {
    if (span.classList.contains("x")) {
      span.classList.remove("x");
    } else if (span.classList.contains("circle")) {
      span.classList.remove("circle");
    }
  });
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(possible_win[i][j]).style.backgroundColor =
        "rgb(144, 144, 144)";
    }
  }
}
field.forEach((span) => {
  span.addEventListener("click", function abc() {
    if (
      game &&
      turn &&
      !(span.classList.contains("x") || span.classList.contains("circle"))
    ) {
      plays += 1;
      turn = false;
      span.classList.add("x");
      player2.style.backgroundColor = "rgb(130, 243, 130)";
      player1.style.backgroundColor = "beige";
      victory_player_1.push(span.id);
      for (let i = 0; i < possible_win.length; i++) {
        const win = possible_win[i].every((value) =>
          victory_player_1.includes(value)
        );
        if (win) {
          winScreen.style.opacity = "1";
          winScreen.style.transition = "opacity .7s linear";
          winScreen.style.pointerEvents = "all";
          nameWin = document.getElementById("name").innerText =
            player1.value + " VENCEU!";
          nameWin;
          game = false;
          let values = parseInt(pontuacao1.value);
          values += 1;
          values = pontuacao1.value = values;
          for (let j = 0; j < 3; j++) {
            document.getElementById(possible_win[i][j]).style.backgroundColor =
              "rgb(252, 92, 92)";
          }
        }
      }
    } else if (
      game &&
      !turn &&
      !(span.classList.contains("x") || span.classList.contains("circle"))
    ) {
      plays += 1;
      turn = true;
      span.classList.add("circle");
      player1.style.backgroundColor = "rgb(130, 243, 130)";
      player2.style.backgroundColor = "beige";
      victory_player_2.push(span.id);
      for (let i = 0; i < possible_win.length; i++) {
        const win = possible_win[i].every((value) =>
          victory_player_2.includes(value)
        );
        if (win) {
          winScreen.style.opacity = "1";
          winScreen.style.transition = "opacity .7s linear";
          winScreen.style.pointerEvents = "all";
          nameWin = document.getElementById("name").innerText =
            player2.value + " VENCEU!";
          game = false;
          let values = parseInt(pontuacao2.value);
          values += 1;
          values = pontuacao2.value = values;
          for (let j = 0; j < 3; j++) {
            document.getElementById(possible_win[i][j]).style.backgroundColor =
              "rgb(252, 92, 92)";
          }
        }
      }
    } else if (
      game &&
      (span.classList.contains("x") || span.classList.contains("circle"))
    ) {
      alert("Não pode jogar em uma casa que já foi preenchida");
    }
    if (plays === 9 && game) {
      alert("EMPATE!");
      game = false;
      start();
    }
  });
});

document.getElementById("continuar").addEventListener("click", function () {
  winScreen.style.opacity = "0";
  winScreen.style.pointerEvents = "none";
  start();
});

document.getElementById("start").addEventListener("click", function () {
  start();
});
