let time = {};

function showMult() {
  const myElement = document.querySelector("#pTeam");
  const exist = document.body.contains(myElement);
  if (exist) {
    mostrarTime();
    mostrarTime();
  }
}

function cadastrar() {
  const form = document.getElementById("create");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const num = document.getElementById("num");
    if (!name.value == "" && !num.value == "") {
      const pass = confirm(
        "Você deseja cadastrar o jogador " + name.value + " ?"
      );
      if (pass) {
        time[name.value] = num.value;
        showMult();
      }
    }
    name.value = "";
    num.value = "";
  });
}

function remover() {
  const form = document.getElementById("del");
  form.addEventListener("submit", (e) => {
    const valueDelete = document.getElementById("nume").value;
    e.preventDefault();
    for (const [key, values] of Object.entries(time)) {
      if (values === valueDelete) {
        const pass = confirm("Voce deseja remover o jogador " + key + " ?");
        if (pass) {
          delete time[key];
          document.getElementById("nume").value = "";
          showMult();
          console.log("Excluido com sucesso!");
        }
        break;
      } else {
        alert("Jogador não encontrado");
      }
    }
  });
}

function mostrarTime() {
  const teamSection = document.getElementById("team");
  const myElement = document.querySelector("#pTeam");
  const exist = document.body.contains(myElement);

  if (!exist) {
    const h3 = document.createElement("h3");
    h3.innerText = "Time";

    const table = document.createElement("table");
    table.id = "pTeam";
    const thead = document.createElement("thead");
    thead.className = "tHead";
    const thName = document.createElement("th");
    thName.innerText = "Nome";
    const thNumber = document.createElement("th");
    thNumber.innerText = "Numero";
    const tBody = document.createElement("tbody");
    thead.appendChild(thName);
    thead.appendChild(thNumber);
    table.appendChild(thead);
    table.appendChild(tBody);

    for (const [key, value] of Object.entries(time)) {
      let tr = document.createElement("tr");
      let tName = document.createElement("td");
      let tNumber = document.createElement("td");
      tName.innerText = key;
      tNumber.innerText = value;
      tr.appendChild(tName);
      tr.appendChild(tNumber);
      tBody.appendChild(tr);
    }
    table.appendChild(tBody);
    teamSection.append(h3, table);
  } else {
    const table = document.getElementsByTagName("table");
    const title = document.getElementsByTagName("h3");
    teamSection.removeChild(table[0]);
    teamSection.removeChild(title[title.length - 1]);
  }
}
