let list = document.querySelector(".cart-list");
const btn_close = document.getElementById("close-cart");
const mask = document.querySelector(".mask");

window.addEventListener("click", function (e) {
  if (e.target.dataset.cart === "1" || e.target.dataset.cart === "2") {
    list.classList.add("opened");
    mask.classList.add("mask-on");

    document.body.style.overflow = "hidden";
  }
});

btn_close.addEventListener("click", function () {
  list.classList.remove("opened");
  document.body.style.overflow = "auto";
  mask.classList.remove("mask-on");
});
