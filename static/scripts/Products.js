window.addEventListener("load", (event) => {

let count=sessionStorage.getItem("count");
if(count)
  document.getElementById("ItemsCountText").innerText =count; 
  getProducts();
  getallCategories();
});
function drawProduct(product) {
  temp = document.getElementById("temp-card");
  var clonProducts = temp.content.cloneNode(true);
  clonProducts.querySelector("img").src = "images/" + product.ImgName;
  clonProducts.querySelector("h1").innerText = product.name;
  clonProducts.querySelector(".price").innerText = product.price + "₪";
  clonProducts.querySelector(".description").innerText = product.description;
  clonProducts.querySelector("button").addEventListener("click", () => {
    addToCart(product);
  });

  document.getElementById("PoductList").appendChild(clonProducts);
}
function drawCategory(categories) {
  for (let category of categories) {
    temp = document.getElementById("temp-category");
    var clonCategories = temp.content.cloneNode(true);
    clonCategories.querySelector(".OptionName").innerText = category.name;
    const checkbox = clonCategories.getElementById("chosseCategory");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked == true) {
        getProducts(category._id);
        var categoriesBox = document.getElementsByClassName("opt");
        for (let key in categoriesBox) {
          categoriesBox[key].value = false;
        }

        checkbox.value = true;
      } else {
        getProducts();
      }
    });

    document.getElementById("filters").appendChild(clonCategories);
  }
}

async function getProducts(category = "") {
  document.getElementById("PoductList").innerHTML = "";
  if (category == "") {
    await fetch("/Product")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((product) => {
          drawProduct(product);
        });
      });
  } else {
    await fetch("/Product?category=" + category)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((product) => {
          drawProduct(product);
        });
      });
  }
}
async function getallCategories() {
  await fetch("/Category")
    .then((res) => res.json())
    .then((res) => {
      drawCategory(res);
    });
}
function addToCart(product) {
  flag = false;
  cart = sessionStorage.getItem("order");
  if (cart != null) {
    cartArr = JSON.parse(cart);
    cartArr.forEach((i) => {
      if (i["key"]._id == product._id) {
        i["value"]++;
        flag = true;
      }
    });
    if (!flag) {
      const item = {
        key: product,
        value: 1,
      };
      cartArr.push(item);
    }
    sessionStorage.setItem("order", JSON.stringify(cartArr));
    sessionStorage.setItem(
      "count",
      Number(JSON.parse(sessionStorage.getItem("count"))) + 1
    );
    document.getElementById("ItemsCountText").innerText =
      sessionStorage.getItem("count");
  } else {
    const item = {
      key: product,
      value: 1,
    };
    sessionStorage.setItem("order", JSON.stringify(new Array(item)));
    sessionStorage.setItem("count", 1);
    document.getElementById("ItemsCountText").innerText =
      sessionStorage.getItem("count");
  }
}


async function showAllMyOrders(){
  const id=JSON.parse(sessionStorage.getItem("user"))._id
await fetch("User/"+id).then((data)=>{
    myOrders=data;
console.log(data);
}


)
window.location.href = "Orders.html";

}