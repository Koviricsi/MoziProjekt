let container = document.getElementById("container");
let temp = document.getElementById("temp");
let allcost = 0;

function LoadItems(){
    let tickets = JSON.parse(localStorage.getItem("tickets"));

    if (Object.keys(tickets).length !== 0){

        container.innerHTML = temp.innerHTML;
        temp.remove();

        for (let title in tickets){
            tickets[title][0].forEach(element => {
                let ticketlist = document.getElementById("ticketlist");
                let div = document.createElement("div");

                let h31 = document.createElement("h3");
                h31.innerHTML = title;

                let p = document.createElement("p");

                let span1 = document.createElement("span");
                span1.innerHTML = "Szék(ek): ";

                let span2 = document.createElement("span");
                span2.innerHTML = element.join(",");

                p.appendChild(span1);
                p.appendChild(span2);

                let h32 = document.createElement("h3");
                h32.innerHTML = element.length * 2 * 1000;
                allcost += element.length * 2 * 1000;

                div.appendChild(h31);
                div.appendChild(p);
                div.appendChild(h32);

                ticketlist.appendChild(div);
            });
        }

        document.getElementById("costsum").innerHTML = allcost;

    }
}

window.onload = LoadItems();