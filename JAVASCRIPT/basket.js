let container = document.getElementById("container");
let temp = document.getElementById("temp");
let allcost = 0;

function LoadItems() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let notempty = false;

  Object.keys(tickets).forEach((title) => {
    if (tickets[title][0].length > 0) {
      notempty = true;
    }
  });

  container.innerHTML = document.getElementById("default").innerHTML;

  if (Object.keys(tickets).length !== 0 && notempty) {
    container.innerHTML = temp.innerHTML;

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
        span2.innerHTML = element.slice(0, -1).join(", ");

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

        let button = document.createElement("button");
        button.innerHTML = "Törlés";
        button.setAttribute("value", element);
        button.setAttribute("title", title);
        button.setAttribute("onclick", "Delete(this.value, this.title);");

        let h32 = document.createElement("h3");
        h32.innerHTML = (element.length - 1) * 2 * 1000;
        allcost += (element.length - 1) * 2 * 1000;

        div.appendChild(h31);
        div.appendChild(p);
        div.appendChild(h4);
        div.appendChild(button);
        div.appendChild(h32);

        ticketlist.appendChild(div);
      });
    }

    document.getElementById("costsum").innerHTML = allcost;
    localStorage.setItem("cost", allcost);
  }
}

function Sale(code) {
  let coupons = JSON.parse(localStorage.getItem("kodok"));
  let costsum = document.getElementById("costsum");
  let allcost = localStorage.getItem("cost");

  for (let i = 0; i < coupons.length; i++) {
    let data = Object.entries(coupons[i])[0];

    if (code == data[0]) {
      if (data[1] > allcost) {
        document.getElementById("error").innerHTML =
          "<span>A megadott kupon értéke meghaladja a maximum beváltható értéket!</span>";
        document
          .getElementById("topayment")
          .setAttribute("onclick", "SkipPayment(0)");
      } else {
        costsum.innerHTML =
          "<span style='text-decoration: line-through;'>" +
          allcost +
          " Ft</span><br>" +
          "<span>" +
          (allcost - data[1]) +
          "</span>";
        document
          .getElementById("topayment")
          .setAttribute("onclick", "SkipPayment(" + data[1] + ")");
        localStorage.setItem("last_coupon", data[0]);
      }
      return;
    } else {
      document
        .getElementById("topayment")
        .setAttribute("onclick", "SkipPayment(0)");
      costsum.innerHTML = allcost;
      localStorage.setItem("last_coupon", "");
    }
  }
}

function Delete(value, title) {
  value = value.split(",");
  let tickets = JSON.parse(localStorage.getItem("tickets"));

  tickets[title][0].splice(tickets[title][0].indexOf(value), 1);

  localStorage.setItem("tickets", JSON.stringify(tickets));
  LoadItems();
}

function SkipPayment(value) {
  let allcost = localStorage.getItem("cost");

  if (allcost - value == 0) {
    Pay();
  } else {
    window.location.href = "../HTML/payment.html";
  }
}

window.onload = LoadItems();

localStorage.setItem("before", "basket");
