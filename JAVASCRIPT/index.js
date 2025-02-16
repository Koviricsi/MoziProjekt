


let dobozok = document.getElementsByClassName("kisdoboz");

for (let i = 0; i < dobozok.length; i++){

    for(let j = 0; j < 65; j++){

        let kisbox = document.createElement("div");
        kisbox.classList.add("small");
        dobozok[i].appendChild(kisbox);

    }


}
    
    