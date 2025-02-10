let nav = document.getElementsByTagName("nav")[0];
let navprogress = 1.05;
let height = parseFloat(window.getComputedStyle(nav).height) * navprogress;
let navTime = null;
navAnimate();

setTimeout(function(){navTime = setInterval(navAnimate, 5)}, 800)

function navAnimate(){
    let height = Math.round(parseFloat(window.getComputedStyle(nav).height) * navprogress);
    nav.style.boxShadow = "inset 0 -"+(height-5)+"px 0 0 var(--darkgray), inset 0 0 0 0 var(--white), inset 0 -"+(height-3)+"px 0 0 var(--purple), inset 0 -"+height+"px 0 0 var(--lightblue)";
    if (height <= 5){
        clearInterval(navTime);
        return;
    }
    navprogress -= 0.01;
}

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
    
}, 1100)
