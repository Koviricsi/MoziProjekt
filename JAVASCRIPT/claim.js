let room = document.getElementById("room");
let number = 0;

for (let i = 3; i <= 6; i++){
    for (let j = 3; j <= 14; j++){
        number++;
        let chair = document.createElement("section");
        chair.style.gridArea = i+"/"+j;
        chair.setAttribute("number", number);
        chair.innerHTML = number;
        room.appendChild(chair);
    }
}
for (let i = 7; i <= 8; i++){
    for (let j = 1; j <= 16; j++){
        number++;
        let chair = document.createElement("section");
        chair.style.gridArea = i+"/"+j;
        chair.setAttribute("number", number);
        chair.innerHTML = number;
        room.appendChild(chair);
    }
}