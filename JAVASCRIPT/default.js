let nav = document.getElementsByTagName("nav")[0];
let navprogress = 1.05;
let height = parseFloat(window.getComputedStyle(nav).height) * navprogress;
let navTime = null;
navAnimate();

setTimeout(function () {
  navTime = setInterval(navAnimate, 5);
}, 800);

function navAnimate() {
  let height = Math.round(
    parseFloat(window.getComputedStyle(nav).height) * navprogress
  );
  nav.style.boxShadow =
    "inset 0 -" +
    (height - 5) +
    "px 0 0 var(--darkgray), inset 0 0 0 0 var(--white), inset 0 -" +
    (height - 3) +
    "px 0 0 var(--purple), inset 0 -" +
    height +
    "px 0 0 var(--lightblue)";
  if (height <= 5) {
    clearInterval(navTime);
    return;
  }
  navprogress -= 0.01;
}

//Első verzió↓
/*
let popcorn = document.getElementsByClassName("popcorn");
for (let i = 0; i < popcorn.length; i++){
    popcorn[i].style.left = "100%";
    popcorn[i].style.top = "50%";
    popcorn[i].style.rotate = "180deg";
}
setInterval(function(){
    for (let i = 0; i < popcorn.length; i++){
        let left = Math.round(Math.random()*100) + "%"
        let top = Math.round(Math.random()*100) + "%";
        let rotate = Math.round(Math.random()*180*Math.random())*5 + "deg";
        let move = setInterval(function(){
            let moveon = [false, false, false]
            let corn = popcorn[i].style;

            if (parseInt(corn.left) < parseInt(left)){
                corn.left = parseInt(corn.left) + 1 + "%";
            } else if (parseInt(corn.left) > parseInt(left)){
                corn.left = parseInt(corn.left) - 1 + "%";
            }
            else{
                moveon[0] = true;
            }

            if (parseInt(corn.top) < parseInt(top)){
                corn.top = parseInt(corn.top) + 1 + "%";
            } else if (parseInt(corn.top) > parseInt(top)){
                corn.top = parseInt(corn.top) - 1 + "%";
            }
            else{
                moveon[1] = true;
            }

            if (parseInt(corn.rotate) < parseInt(rotate)){
                corn.rotate = parseInt(corn.rotate) + 1 + "deg";
            } else if (parseInt(corn.rotate) > parseInt(rotate)){
                corn.rotate = parseInt(corn.rotate) - 1 + "deg";
            }
            else{
                moveon[2] = true;
            }

            if (moveon[0] && moveon[1]){
                clearInterval(move);
            }
        },10)
    }
    
}, 1100)*/

//Második verzió
let popcorns = document.getElementsByClassName("popcorn");

for (let i = 0; i < popcorns.length; i++) {
  popcorns[i].style.left = Math.random() * 90 + "%";
  popcorns[i].style.top = Math.random() * 90 + "%";
  popcorns[i].style.rotate = Math.random() * 300 + "deg";
  popcorns[i].style.scale = 0.8 + Math.random();
}

let popcorn_vectors = [];
let speed = 0.25;
let fps = 100;

function randomVector() {
  let temp = Math.random();
  if (temp > 0.5) {
    temp = false;
  } else {
    temp = true;
  }
  return {
    left: Math.round(Math.random() * speed * 100) / 100 + 0.05,
    top: Math.round(Math.random() * speed * 100) / 100 + 0.05,
    rotate: Math.random(),
    left_reverse: temp,
    top_reverse: !temp,
    rotate_reverse: temp,
  };
}

for (let i = 0; i < popcorns.length; i++) {
  popcorn_vectors.push(randomVector());
}

let popcorn_move = setInterval(function () {
  for (let i = 0; i < popcorns.length; i++) {
    let corn = popcorns[i];
    //Left
    if (
      parseFloat(corn.style.left) >= 100 ||
      parseFloat(corn.style.left) <= 0
    ) {
      popcorn_vectors[i]["left_reverse"] = !popcorn_vectors[i]["left_reverse"];
      if (Math.random() > 0.5) {
        popcorn_vectors[i]["rotate_reverse"] =
          !popcorn_vectors[i]["rotate_reverse"];
      }
    }
    if (popcorn_vectors[i]["left_reverse"]) {
      corn.style.left =
        parseFloat(corn.style.left) - popcorn_vectors[i]["left"] + "%";
    } else {
      corn.style.left =
        parseFloat(corn.style.left) + popcorn_vectors[i]["left"] + "%";
    }
    //Top
    if (parseFloat(corn.style.top) >= 100 || parseFloat(corn.style.top) <= 0) {
      popcorn_vectors[i]["top_reverse"] = !popcorn_vectors[i]["top_reverse"];
      if (Math.random() > 0.5) {
        popcorn_vectors[i]["rotate_reverse"] =
          !popcorn_vectors[i]["rotate_reverse"];
      }
    }
    if (popcorn_vectors[i]["top_reverse"]) {
      corn.style.top =
        parseFloat(corn.style.top) - popcorn_vectors[i]["top"] + "%";
    } else {
      corn.style.top =
        parseFloat(corn.style.top) + popcorn_vectors[i]["top"] + "%";
    }
    //Rotate
    if (popcorn_vectors[i]["rotate_reverse"]) {
      corn.style.rotate =
        parseFloat(corn.style.rotate) - popcorn_vectors[i]["rotate"] + "deg";
    } else {
      corn.style.rotate =
        parseFloat(corn.style.rotate) + popcorn_vectors[i]["rotate"] + "deg";
    }
  }
}, 1000 / fps);

if (localStorage.getItem("tickets") == null){
    localStorage.setItem("tickets", JSON.stringify({}));
}
if (window.location.pathname != "/HTML/claim.html"){
  localStorage.removeItem("numbers");
}

if (["/HTML/index.html", "/HTML/after_claim.html", "/HTML/basket.html"].includes(window.location.pathname)){
  localStorage.removeItem("movie_title");
}

if (!["/HTML/claim.html", "/HTML/after_claim.html"].includes(window.location.pathname)) {
  localStorage.removeItem("new");
}

let cim = document.getElementsByClassName("cim");

if (cim.length > 0){
  localStorage.setItem("movie_title", cim[0].innerHTML);
}