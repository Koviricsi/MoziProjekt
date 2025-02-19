function Pay() {
  let before = localStorage.getItem("before");

  if (before == "gift") {
    localStorage.setItem("ujkod", JSON.stringify(true));
    window.location.href = "../HTML/ajandekkartya.html";
  } else if (before == "basket") {
    let tickets = JSON.parse(localStorage.getItem("tickets"));

    Object.keys(tickets).forEach((title) => {
      const movie = tickets[title];
      const claimed = movie[0];
      const rclaims = movie[1];
      const dates = movie[2];

      for (let i = 0; i < claimed.length; i++) {
        for (let j = 0; j < claimed[i].length - 1; j++) {
          rclaims[dates.indexOf(claimed[i].at(-1))].push(claimed[i][j]);
        }
        claimed.splice(i, 1);
      }
    });

    localStorage.setItem("tickets", JSON.stringify(tickets));

    let last_coupon = localStorage.getItem("last_coupon");
    let coupons = JSON.parse(localStorage.getItem("kodok"));
    if (last_coupon != "") {
      for (let i = 0; i < coupons.length; i++) {
        let data = Object.entries(coupons[i])[0];

        if (last_coupon == data[0]) {
          coupons.splice(i, 1);
        }
      }
    }

    localStorage.setItem("kodok", JSON.stringify(coupons));

    window.location.href = "../HTML/basket.html";
  }
}
