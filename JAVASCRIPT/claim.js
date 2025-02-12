let room = document.getElementById("room");

for (let i = 1; i <= 60; i++){
    let chair = document.createElement("section");
    chair.style.gridArea = "a" + i;
    chair.setAttribute("number", i);
    chair.innerHTML = i;
    room.appendChild(chair);
}