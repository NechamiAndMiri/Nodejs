window.addEventListener("load", (event) => {
  getOrder();
});

function drawOrder(item) {
  const product = item["key"];
  temp = document.getElementById("temp-row");
  var clonProducts = temp.content.cloneNode(true);
  img = document.createElement("img");
  img.src = "../images/" + product.ImgName;
  img.style = "width:100%";
  clonProducts.querySelector(".image").appendChild(img);
  clonProducts.querySelector(".itemName").innerText = product.name;
  clonProducts.querySelector(".price").innerText =
    product.price * item["value"] + "₪ ";
  clonProducts.querySelector(".quantity").innerText = item["value"];
  clonProducts.querySelector(".delete").addEventListener("click", () => {
    deleteFromCart(item);
  });

  document.getElementById("tbody").appendChild(clonProducts);
}
function getOrder() {
  document.getElementById("tbody").innerHTML = "";
  cart = sessionStorage.getItem("order");
  if (cart != null) {
    cartArr = JSON.parse(cart);
    let sum=0;
    cartArr.forEach((i) => {
      drawOrder(i);
      sum+=i['key'].price*i['value']
    });
    document.getElementById('total').innerText=sum;
  }
}
function deleteFromCart(item) {
  cart = sessionStorage.getItem("order");
  if (cart != null) {
    cartArr = JSON.parse(cart);
    let index = cartArr.findIndex((p) => p["key"]._id == item["key"]._id);
    cartArr.splice(index, 1);
    sessionStorage.setItem("order", JSON.stringify(cartArr));
    sessionStorage.setItem(
      "count",
      Number(JSON.parse(sessionStorage.getItem("count"))) - item["value"]
    );
  }

  getOrder();
}

async function  placeOrder(){
    cart = sessionStorage.getItem("order");
    if (cart == null) {
        alert("אין עדין פריטים בסל שלך")
    }
    else{
           cartArr = JSON.parse(cart);
           var count=0
           cartArr.forEach(i=>
            {
                count+=i['key'].price
            })
            var order={
                'sum':count,
                'date':new Date(),
                'user':JSON.parse(sessionStorage.getItem('user'))['_id'],
                'items':cartArr
            }
           await fetch("/Order/", 
           {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            }).then(res=>res.json()).then((data) => {
                    alert("הזמנתך בוצעה בהצלחה! "+data._id );
                    console.log(data._id);
                })
                sessionStorage.removeItem("order");
                sessionStorage.removeItem("count");
                window.location.href = "Products.html";


    }

}
