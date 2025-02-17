let room = document.getElementById("room");
let number = 0;
let selected_date;

function ChairManager() {
  number = 0;
  room.innerHTML = "";
  function Chair(number, i, j) {
    let chair = document.createElement("section");
    let tickets = JSON.parse(localStorage.getItem("tickets"));
    let title = localStorage.getItem("movie_title");
    let claimed = false;
    chair.style.gridArea = i + "/" + j;
    chair.setAttribute("number", number);
    chair.innerHTML = number;

    for (let i = 0; i < tickets[title][0].length; i++) {
      if (tickets[title][0][i].slice(0,-1).includes(number)
          && tickets[title][0][i].at(-1) == selected_date) {
        claimed = true;
      }
    }

    for (let i = 0; i < tickets[title][2].length; i++){
      if (selected_date == tickets[title][2][i]){
        if (tickets[title][1][i].includes(number)) {
          claimed = true;
        }
      }
    }

    if (claimed) {
      chair.style.filter = "grayscale(1)";
      chair.style.cursor = "not-allowed";
    } else {
      chair.setAttribute("onclick", "Places(" + number + ",this);");
    }

    room.appendChild(chair);
  }

  for (let i = 3; i <= 6; i++) {
    for (let j = 3; j <= 14; j++) {
      number++;
      Chair(number, i, j);
    }
  }
  for (let i = 7; i <= 8; i++) {
    for (let j = 1; j <= 16; j++) {
      number++;
      Chair(number, i, j);
    }
  }
}

function Title() {
  let storage = localStorage.getItem("movie_title");
  let title = document.getElementById("title");
  if (storage != null) {
    title.innerHTML = storage;
  } else {
    title.innerHTML = undefined;
  }
}

function RandomData() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let title = localStorage.getItem("movie_title");
  if (tickets[title] === undefined) {
    tickets[title] = [[], [], []];
    for (let j = 1; j <= 3; j++) {
      let rclaims = [];
      for (let i = 0; i < Math.round(Math.random() * 10 + 5); i++) {
        let number = Math.round(Math.random() * (80 - 1) + 1);
        if (!rclaims.includes(number)) {
          rclaims.push(Math.round(Math.random() * (80 - 1) + 1));
        }
      }

      tickets[title][1].push(rclaims);

      let date = new Date();
      date.setDate(date.getDate() + j);
      date.setHours(Math.floor(Math.random() * (21 - 10 + 1)) + 10+1, 0, 0, 0);

      tickets[title][2].push(date);
    }

    localStorage.setItem("tickets", JSON.stringify(tickets));
  }
}

localStorage.setItem("numbers", JSON.stringify([]));

function Places(num, chair) {
  let storage = JSON.parse(localStorage.getItem("numbers"));

  if (storage.includes(num)) {
    storage.splice(storage.indexOf(num), 1);
    chair.style.backgroundColor = "";
    chair.style.fontWeight = "";
  } else {
    storage.push(num);
    chair.style.backgroundColor = "var(--lightblue)";
    chair.style.fontWeight = "bold";
  }

  localStorage.setItem("numbers", JSON.stringify(storage));
}

function ClaimPlaces(button) {
  let storage = JSON.parse(localStorage.getItem("numbers"));
  if (storage.length > 0) {
    if (
      confirm(
        "Biztosan le akarja foglalni a " +
          storage.join(", ") +
          " számú hely(ek)et?"
      )
    ) {
      TicketManager();
      window.location.href = "../HTML/after_claim.html";
    }
  } else {
    alert("Kérjük, először válasszon hely(ek)et a foglaláshoz!");
  }
}

//tickets = { filmcim = [ [ [ foglalt hely, foglalt hely, időpont ] ], [ [ random foglalt hely, random foglalt hely, random foglalt hely, ] ], [ időpont, időpont, időpont ] ] }

function TicketManager() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let numbers = JSON.parse(localStorage.getItem("numbers"));
  let title = localStorage.getItem("movie_title");

  numbers.push(selected_date);
  tickets[title][0].push(numbers);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  localStorage.setItem("new", title);
}

function SetDates() {
  let dateselect = document.getElementById("dateselect");
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let title = localStorage.getItem("movie_title");

  tickets[title][2].forEach((element) => {
    let option = document.createElement("option");
    let date = new Date(element);

    option.setAttribute("value", element);
    option.innerHTML =
      date.getFullYear().toString() +
      "-" +
      (date.getMonth()+1) +
      "-" +
      date.getDate() +
      " " +
      (date.getHours()-1) +
      ":00";
    dateselect.appendChild(option);
  });
}

function DateChange(selected) {
  selected_date = selected;
  ChairManager();
}

window.onload = Title();
window.onload = RandomData();
window.onload = SetDates();
window.onload = DateChange(document.getElementById("dateselect").value);
