let room = document.getElementById("room");
let number = 0;

function Chair(number, i, j) {
  let chair = document.createElement("section");
  chair.style.gridArea = i + "/" + j;
  chair.setAttribute("number", number);
  chair.innerHTML = number;
  chair.setAttribute("onclick", "Places(" + number + ",this);");
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

function Title(){
    let storage = localStorage.getItem("movie_title");
    let title = document.getElementById("title");
    if (storage != null) {
        title.innerHTML = storage;
    }
    else
    {
        title.innerHTML = undefined;
    }
}

window.onload = Title();

localStorage.removeItem("numbers");

function Places(num, chair) {
  let storage = localStorage.getItem("numbers");

  if (storage != null && storage != []) {
    storage = storage.split(",");

    if (storage.includes(num.toString())) {
      storage.splice(storage.indexOf(num.toString()), 1);
      chair.style.backgroundColor = "";
      chair.style.fontWeight = "";
    } else {
      storage.push(num.toString());
      chair.style.backgroundColor = "var(--lightblue)";
      chair.style.fontWeight = "bold";
    }

    localStorage.setItem("numbers", storage);
  } else {
    localStorage.setItem("numbers", num.toString());
    chair.style.backgroundColor = "var(--lightblue)";
    chair.style.fontWeight = "bold";
  }
}

function ClaimPlaces(button){
    let storage = localStorage.getItem("numbers");
    if (storage != null && storage != []){
        window.location.href = "../HTML/after_claim.html";
    }
    else
    {
        alert("Kérjük, először válasszon hely(ek)et a foglaláshoz!");
    }
}
