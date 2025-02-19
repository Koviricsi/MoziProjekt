if (localStorage.getItem("kodok") == null) {
  localStorage.setItem("kodok", JSON.stringify([]));
}

let kod = JSON.parse(localStorage.getItem("kodok"));
let szoveg = "";

function Randomszam(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (JSON.parse(localStorage.getItem("ujkod"))) {
  for (let i = 0; i < 8; i++) {
    let random = Randomszam(97, 122);

    let betu = String.fromCharCode(random);

    szoveg += betu;
  }
  let cost = localStorage.getItem("cost");
  let kupon = {};
  kupon[szoveg] = cost;
  kod.push(kupon);

  localStorage.setItem("ujkod", JSON.stringify(false));

  localStorage.setItem("kodok", JSON.stringify(kod));
}

let irdat = document.getElementById("banan");

for (let i = 0; i < kod.length; i++) {
  let h3 = document.createElement("h3");
  h3.classList.add("kodocska");
  h3.innerHTML = Object.keys(kod[i]);
  irdat.appendChild(h3);
}

localStorage.setItem("before", "gift");

function cost() {
  localStorage.setItem("cost", document.getElementById("penz").value);
}

window.onload = cost();
