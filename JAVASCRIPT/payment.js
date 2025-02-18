function Pay() {
  let before = localStorage.getItem("before");

  if (before == "gift") {
    localStorage.setItem("ujkod", JSON.stringify(true))
    window.location.href = "../HTML/ajandekkartya.html";
  } else if (before == "basket") {
    localStorage.setItem("tickets", JSON.stringify({}))

    let last_coupon = localStorage.getItem("last_coupon");
    let coupons = JSON.parse(localStorage.getItem("kodok"));
    if (last_coupon != ""){
      for (let i = 0; i < coupons.length; i++) {
        let data = Object.entries(coupons[i])[0];

        if (last_coupon == data[0]){
          coupons.splice(i, 1);
        }

      }
    }

    localStorage.setItem("kodok", JSON.stringify(coupons));

    window.location.href = "../HTML/basket.html";
  }
}
