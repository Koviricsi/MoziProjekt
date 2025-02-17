localStorage.setItem("ujkod", JSON.stringify(true))

let kod = [];
let szoveg = "";

function Randomszam(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if(JSON.parse(localStorage.getItem("ujkod"))){

    for(let i = 0; i < 8; i++){
        let random = Randomszam(97, 122);
     
        let betu = String.fromCharCode(random)
     
        szoveg += betu
     
     }

     kod.push(szoveg)

}


document.getElementsByClassName("kodocska")[0].innerHTML = szoveg;

JSON.stringify(kod);

window.onload = kod;