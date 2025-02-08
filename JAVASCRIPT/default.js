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