function Pay() {
  let before = localStorage.getItem("before");

  if (before == "gift") {
    localStorage.setItem("ujkod", JSON.stringify(true))
    window.location.href = "../HTML/ajandekkartya.html";
  } else if (before == "basket") {
    localStorage.setItem("tickets", JSON.stringify({}))
    window.location.href = "../HTML/basket.html";
  }
}
