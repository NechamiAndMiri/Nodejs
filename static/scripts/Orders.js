
window.addEventListener("load", (event) => {

    const id=JSON.parse(sessionStorage.getItem("user"))._id
  await fetch("User/"+id).then((data)=>{
      document.getElementById('orders').innerText=JSON.stringify(data)

  })
})