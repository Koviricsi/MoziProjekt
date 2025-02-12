let ido = 1;
let szalagok = document.getElementsByClassName("szalag");


for(let i = 0; i < szalagok.length; i++){
    szalagok[i].style.animationDelay = ido.toString();
    ido += 1.7;
    console.log(szalagok[i].style.animationDelay) ;
}