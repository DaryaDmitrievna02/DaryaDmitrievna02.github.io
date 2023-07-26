let cart = {};

document.onclick = (e) => {
  if (e.target.closest(".cart")) {
    let id = e.target.dataset.id; // id карты (кнопки)
    let card = e.target.closest(".catalogue__card"); // получаем карту
    addCart(id, card);
    addCartCount();
  }

  if (e.target.closest(".delete-item")) {
    // получаем кнопку

    let delete_card = e.target
      .closest(".delete-item")
      .closest(".cart-list__item"); // ищем в какой карте эта кнопку
    let delete_id = e.target
      .closest(".delete-item")
      .closest(".cart-list__item")
      .getAttribute("id");

    deleteItem(delete_card, delete_id);
  }

  if (e.target.closest("[data-minus]")) {
    let card = e.target.closest("[data-minus]").closest(".cart-list__item"); // ищем в какой карте эта кнопку
    let id = e.target
      .closest("[data-minus]") // ищем в какой карте эта кнопку
      .closest(".cart-list__item")
      .getAttribute("id");
    minus(id, card);
    CounterSumItem(id, card);
  }

  if (e.target.closest("[data-plus]")) {
    let card = e.target.closest("[data-plus]").closest(".cart-list__item"); // ищем в какой карте эта кнопку
    let id = e.target
      .closest("[data-plus]") // ищем в какой карте эта кнопку
      .closest(".cart-list__item")
      .getAttribute("id");
    plus(id, card);
    CounterSumItem(id, card);
  }
};

const minus = (id, card) => {
  if (card.querySelector(".item-count-card").textContent > 0) {
    cart[id].count = +cart[id].count - 1; // отнимаем у лбъекта
    card.querySelector(".item-count-card").textContent =
      +card.querySelector(".item-count-card").textContent - 1; // отнимаем у визуала
    if (card.querySelector(".item-count-card").textContent == 0)
      deleteItem(card, id); // Удаляем если равно 0
  }
  addCartCount();
};

const plus = (id, card) => {
  if (card.querySelector(".item-count-card").textContent > 0) {
    cart[id].count = +cart[id].count + 1; // прибавляем  объекту
    card.querySelector(".item-count-card").textContent =
      +card.querySelector(".item-count-card").textContent + 1; // прибавляем визуалу
  }
  addCartCount();
};

const addCartCount = () => {
  let count_cart = document.querySelectorAll("#cart-count");

  count_cart[0].innerHTML = Counter();
  count_cart[1].innerHTML = Counter();

  // Здесь же обновление состояния суммы корзины

  let sum_cart = document.getElementById("total-sum");
  sum_cart.textContent = Counter_sum();
};

const CounterSumItem = (id, card) => {
  if (id in cart) {
    let result = +cart[id].price.split("$")[1] * cart[id].count;
    console.log(result);
    card.querySelector(".price").textContent = "$" + result + ".00";
  }
};

const Counter_sum = () => {
  let sum = 0;

  for (let i in cart) {
    sum += +cart[i].price.split("$")[1] * cart[i].count;
  }
  return "$" + sum + ".00";
};

const Counter = () => {
  let count = 0;

  for (let i in cart) {
    count += cart[i].count;
  }
  return count;
};

const deleteItem = (delete_card, delete_id) => {
  delete_card.remove(); //Удаляем див
  delete cart[delete_id]; // Удаляем объект из объекта телеги

  for (
    let i = 0;
    i < document.querySelectorAll(".catalogue__grid").length;
    i++
  ) {
    let catalogue = document
      .querySelectorAll(".catalogue__grid")
      [i].querySelectorAll("[data-id]");
    for (let j = 0; j < catalogue.length; j++)
      if (catalogue[j].dataset.id === delete_id) {
        let card = document //После удаления карты в корзине по её айди ищем карту в каталоги и меняем её содержимое
          .querySelectorAll(".catalogue__grid");

        let cart_btn = card;

        for (let k = 0; k < card.length; k++) {
          cart_btn = document
            .querySelectorAll(".catalogue__grid")
            [k].querySelectorAll("[data-id]")
            [j].closest(".catalogue__grid-item")
            .querySelector(".cart");
          console.log("CART " + cart_btn);

          cart_btn.style.backgroundColor = "#333333";
          cart_btn.style.color = "white";
          cart_btn.style.border = "none";
          cart_btn.querySelector("div").textContent = "+ Add to cart";
        }
      }
  }

  addCartCount();
};

const addCart = (id, card) => {
  if (id in cart === true) {
    ////exist
    // cart[id].count = ++cart[id].count; // + count у объекта
    // let cart_id = cart[id].id;
    // let item_card = document.getElementById(cart_id); // получаем карточку по id добавленного объекта
    // let item_count = item_card.querySelector(".item-count-card"); // ищем счётчик
    // item_count.textContent = cart[id].count; // меняем его на значение внутри объекта
    // CounterSumItem(id, item_card); // пересылаем айди и саму обёртку карты для добавления кол-ва элементов через мэин карту
    // addCartCount();
  } else if (id in cart === false) {
    /// doesn't exist

    let cart_btn = card.querySelector(".cart");
    cart_btn.style.backgroundColor = "white";
    cart_btn.style.color = "black";
    cart_btn.style.border = "1px solid black";
    cart_btn.querySelector("div").textContent = "Added";

    // получаем значения из карточки товара

    cart[id] = {
      // создаём новый объект
      name: card.querySelector(".title").querySelector("p").textContent,
      img: card.querySelector(".img").querySelector("img").getAttribute("src"),
      price: card.querySelector(".price").querySelector("p").textContent,
      count: 1,
      id: [id],
    };

    /// назначаем блоку уникальный айди

    let cartHTML = `  <div class="cart-list__item" id="${cart[id].id}"> 
<div class="img">
  <img src="${cart[id].img}" alt="" />
</div>
<div class="info">
  <h4 class="title">${cart[id].name}</h4>

  <p class="price" id="card_total">${cart[id].price}</p>
  <div class="count">
      <p>count: </p>
      <button data-minus>-</button>
      <p class="item-count-card">1</p>
      <button data-plus>+</button>
  </div>
  <div>
  <button class="button">Buy</button>
  <button class="button delete-item" >Delete</button></div>
</div>
</div>`;

    //add card
    let cart_list = document.querySelector(".cart-list__items");
    cart_list.insertAdjacentHTML("beforeend", cartHTML);

    addCartCount();
  }
};
