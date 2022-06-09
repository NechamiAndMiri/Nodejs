window.addEventListener("load", (event) => {

    let user=JSON.parse(sessionStorage.getItem('user'));

    document.getElementById("inp_name_new").value=user.name;
    document.getElementById("inp_mail_new").value=user.email
    document.getElementById("inp_password_new").value=user.password;
    document.getElementById("inp_address_new").value=user.address;
    
    });

    async function update_user() {
         
   
        let newUser = {
            name: document.getElementById("inp_name_new").value,
            email: document.getElementById("inp_mail_new").value,
            password: document.getElementById("inp_password_new").value,
            address: document.getElementById("inp_address_new").value
        }
       await fetch("/user/" + JSON.parse(sessionStorage.getItem('user'))._id, 
       {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((res) => {
                    alert("hi " + newUser.name + "your update saved succsessfully");
                    sessionStorage.setItem('user', JSON.stringify(newUser));
                     window.location.href = "Products.html";}
            ).catch(()=>alert("error!"))
          

    }