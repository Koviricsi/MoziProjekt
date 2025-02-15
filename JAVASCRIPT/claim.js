let room = document.getElementById("room");
let number = 0;

function ChairManager() {
  function Chair(number, i, j) {
    let chair = document.createElement("section");
    let tickets = JSON.parse(localStorage.getItem("tickets"));
    let title = localStorage.getItem("movie_title");
    chair.style.gridArea = i + "/" + j;
    chair.setAttribute("number", number);
    chair.innerHTML = number;

    if (tickets[title][1].includes(number)) {
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

function RandomClaims() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let title = localStorage.getItem("movie_title");
  if (tickets[title] === undefined) {
    let rclaims = [];
    for (let i = 0; i < Math.round(Math.random() * 10 + 5); i++) {
      let number = Math.round(Math.random() * (80 - 1) + 1);
      if (!rclaims.includes(number)) {
        rclaims.push(Math.round(Math.random() * (80 - 1) + 1));
      }
    }
    tickets[title] = [[], rclaims];
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
    TicketManager();
    window.location.href = "../HTML/after_claim.html";
  } else {
    alert("Kérjük, először válasszon hely(ek)et a foglaláshoz!");
  }
}

//tickets = {filmcim = [[[foglalt hely(ek) - jegy],[foglalt hely(ek) - jegy]],[random foglalt helyek]]}

function TicketManager() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let numbers = JSON.parse(localStorage.getItem("numbers"));
  let title = localStorage.getItem("movie_title");

  tickets[title][0].push(numbers);
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

window.onload = Title();
window.onload = RandomClaims();
window.onload = ChairManager();
