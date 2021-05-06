// $("#ans1").keyup(function (event) {
//   validateInputs();
// });

// function validateInputs() {
//   var disableButton = false;

//   var val1 = $("#ans1").val();

//   if (val1.length == 0) disableButton = true;

//   $("#contact").attr("disabled", disableButton);
// }

const b = document.querySelector(".username button");
const un = document.querySelector(".username");
const que = document.querySelector(".que"); 
const que_b = document.querySelector(".que button");
const repass = document.querySelector(".repass");
const alertDiv = document.getElementById("alert-message");

let username; 

b.addEventListener("click", (e)=> {

  username = document.getElementById("ans2").value;

  fetch("/api/username",{method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username : document.getElementById("ans2").value
  })
}).then(response => response.json())
.then(jsonRes => {
  console.log('Success:', jsonRes);
  
  if(!jsonRes.success){
    throw Error("Invalid Username")
  }else{

    un.classList.add("fadeout");
    que.classList.add("fadein");

    document.getElementById("sec-que").innerHTML = jsonRes.data.securityQuestion;


  }
})
.catch((error) => {
  console.error('Error:', error);
  alertDiv.children[0].innerText = "";
  alertDiv.style.display = "flex";
  alertDiv.children[0].innerText = error;
});
});


que_b.addEventListener("click", ()=> {

  fetch(`/api/securityCheck/${username}`,{method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    securityAnswer : document.getElementById("ans1").value
  })
}).then(response => response.json())
.then(jsonRes => {
  console.log('Success:', jsonRes);
  
  if(!jsonRes.success){
    throw Error("Invalid Answer")
  }else{
    
    que.classList.remove("fadein");
    repass.classList.add("fadein");

  }
})
.catch((error) => {
  console.error('Error:', error);
  alertDiv.children[0].innerText = "";
  console.log(alertDiv);
  alertDiv.style.display = "flex";
  alertDiv.children[0].innerText = error;
});

});

document.getElementById("contact").addEventListener("click",fun);

function fun(e) {

  e.preventDefault();
  //to see password is same or not
  const temp1 = document.getElementById("reset_password");
  const temp2 = document.getElementById("confirm_password");

  if (temp1.value != temp2.value) {
    // not matched
    alert("password does not match");
  } // matched
  else {

    fetch(`/api/password/${username}`,{method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password : document.getElementById("confirm_password").value
    })
  }).then(response => response.json())
  .then(jsonRes => {
    console.log('Success:', jsonRes);
    
    if(!jsonRes.success){
      throw Error("Invalid Password")
    }else{
      
      window.location.href = "login.html";
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alertDiv.children[0].innerText = "";
    console.log(alertDiv);
    alertDiv.style.display = "flex";
    alertDiv.children[0].innerText = error;
  });

  }
}

$(".reveal1").on('click',function() {
  var $pwd = $(".pwd1");
  if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
  } else {
      $pwd.attr('type', 'password');
  }
});

$(".reveal2").on('click',function() {
  var $pwd = $(".pwd2");
  if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
  } else {
      $pwd.attr('type', 'password');
  }
});


// function myfun() {
//   window.location.href = "reset-password.html";
// }



