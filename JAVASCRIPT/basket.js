let container = document.getElementById("container");
let temp = document.getElementById("temp");
let allcost = 0;

function LoadItems() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));

  if (Object.keys(tickets).length !== 0) {
    container.innerHTML = temp.innerHTML;
    temp.remove();

    for (let title in tickets) {
      tickets[title][0].forEach((element) => {
        let ticketlist = document.getElementById("ticketlist");
        let div = document.createElement("div");

        let h31 = document.createElement("h3");
        h31.innerHTML = title;

        let p = document.createElement("p");

        let span1 = document.createElement("span");
        span1.innerHTML = "Szék(ek): ";

        let span2 = document.createElement("span");
        span2.innerHTML = element.slice(0, -1).join(",");

        p.appendChild(span1);
        p.appendChild(span2);

        let h4 = document.createElement("h4");
        let basketdate = new Date(element.at(-1));
        h4.innerHTML =
          "Időpont: " +
          basketdate.getFullYear().toString() +
          "-" +
          (basketdate.getMonth() + 1) +
          "-" +
          basketdate.getDate() +
          " " +
          (basketdate.getHours() - 1) +
          ":00";

        let h32 = document.createElement("h3");
        h32.innerHTML = (element.length - 1) * 2 * 1000;
        allcost += (element.length - 1) * 2 * 1000;

        div.appendChild(h31);
        div.appendChild(p);
        div.appendChild(h4);
        div.appendChild(h32);

        ticketlist.appendChild(div);
      });
    }

    document.getElementById("costsum").innerHTML = allcost;
    localStorage.setItem("cost", allcost);
  }
}

function Sale(code){
  let coupons = JSON.parse(localStorage.getItem("kodok"));
  let costsum = document.getElementById("costsum");
  let allcost = localStorage.getItem("cost");

  for (let i = 0; i < coupons.length; i++) {
    let data = Object.entries(coupons[i])[0];
    
    if (code == data[0]){
      costsum.innerHTML = 
      "<span style='text-decoration: line-through;'>" + allcost + " Ft</span><br>" + "<span>" + (allcost-data[1]) + "</span>";  
      localStorage.setItem("last_coupon", data[0]);
      return;
    }
    else
    {
      costsum.innerHTML = allcost;
      localStorage.setItem("last_coupon", "");
    }

  }
}

window.onload = LoadItems();

localStorage.setItem("before", "basket");