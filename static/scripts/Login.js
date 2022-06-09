
function login()
{
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    fetch("/User?email=" + email + "&password=" + password)
        .then(res => res.json())
        .then((res) => {
           
            sessionStorage.setItem('user', JSON.stringify(res));
            window.location.href = "Products.html";
        }).catch(error=>alert("user not found"))
}


{

function login_new_user() {
    document.getElementById("div_new_user").style.display = "block";
}

function add_new_user()
{
    const mail=document.getElementById("inp_mail_new").value
    if( mail==""||mail==null)
    {
        alert("הכנס כתובת מייל");
        return;
    }
    if(!validateEmail(mail))
    {
        alert("כתובת המייל אינה תקינה");
        return;
    }
    const user={
    name : document.getElementById("inp_name_new").value,
    email : mail,
    password : document.getElementById("inp_password_new").value,
    address : document.getElementById("inp_address_new").value
    }
    fetch("/User/", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then((data) => {
         
            alert("Hi to  " + data.name );
            sessionStorage.setItem('user', JSON.stringify(data))

        }).catch(()=>
      
            alert("הכנס פרטים שוב")
        )
}
}
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };