const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

const bearer = "BEARER " + token;
let isUserLoggedIn = false;
let isFromGoogle = false;
if (token) isUserLoggedIn = true;

const myInit = {
  method: "GET",
  // withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: bearer,
  },
  mode: "cors",
  cache: "default",
};

const url = "/api/profile";
fetch(url, myInit)
  .then((res) => {
    // //(res);
    if (!res.ok) throw new Error("Fauled to fetch resources");
    return res.json();
  })
  .then((jsonRes) => {
    //({ jsonRes });
    if (!jsonRes.success) {
      window.location.href = "login.html";
    }

    registrationDate.innerText =
      "Registered on : " + jsonRes.data.user.dateRegistered.slice(0, 10);

    profilePic.src = jsonRes.data.user.photoURL;
    navbarPic.src = jsonRes.data.user.photoURL;
    usernameFormField.value = jsonRes.data.user.username;
    genderFormField.value = jsonRes.data.user.gender;
    if (jsonRes.googleId) isFromGoogle = true;
    profileName.value = jsonRes.data.user.full_name || "";

    if (!jsonRes.data.user.isAdmin) {
      adminBadge.style.display = "none";
    }
    if (jsonRes.data.user.isAdmin) {
      document.getElementById("admin-dashboard").style.display = "inline";
    }

    //(jsonRes.data.user);
    //(jsonRes.data.user.photoURL);
  })
  .catch((err) => {
    //({ err });
  });

const fullname = document.querySelector("#edit-fullname");
const gender = document.querySelector("#edit-gender");
const usernameFormField = document.querySelector("#staticName");
const genderFormField = document.querySelector("#staticGender");
const registrationDate = document.querySelector(".reg-date");
const profilePic = document.querySelector("#profile-page-pic");
const navbarPic = document.querySelector(".avatar-img");
const adminBadge = document.querySelector(".admin-badge");
const logoutButton = document.getElementById("logout-button");
const profileName = document.getElementById("Profile-name");
const deleteButton = document.getElementById("delete-button");
let genderOldValue = "",
  fullnameOldValue = "";

fullname.addEventListener("click", (e) => {
  if (fullname.innerText == "Edit") {
    fullname.innerText = "Save";
    profileName.readOnly = false;
    profileName.focus();
    fullnameOldValue = profileName.value;
  } else {
    myInit.method = "POST";
    myInit.body = JSON.stringify({ full_name: profileName.value });
    //(myInit.body);
    fetch("/api/profile", myInit)
      .then((res) => {
        //(res);
        if (!res.ok) {
          profileName.value = fullnameOldValue;
          throw new Error("Could not fetch data for that resource");
        } else {
          return res.json();
        }
      })
      .then((jsonRes) => {
        //({ jsonRes });
      });
    // .catch((err) => {
    //   //(err);
    // });

    fullname.innerText = "Edit";
    profileName.readOnly = true;
  }
});

gender.addEventListener("click", (e) => {
  //(e.target.innerText);
  if (gender.innerText == "Edit") {
    gender.innerText = "Save";
    genderFormField.readOnly = false;
    genderFormField.focus();

    genderOldValue = genderFormField.value;
  } else {
    myInit.method = "POST";
    myInit.body = JSON.stringify({ gender: genderFormField.value });
    fetch("/api/profile", myInit)
      .then((res) => {
        //("here");
        //(res);
        if (!res.ok) {
          genderFormField.value = genderOldValue;
          throw new Error("Could not fetch data for that resource");
        } else {
          return res.json();
        }
      })
      .then((jsonRes) => {
        //({ jsonRes });
      });
    // .catch((err) => {
    //   //(err);
    // });

    gender.innerText = "Edit";
    genderFormField.readOnly = true;
  }
});

// implementing logout API call
logoutButton.addEventListener("click", (e) => {
  myInit.method = "GET";
  let url = "/api/" + (isFromGoogle ? "login/auth/google/" : "") + "logout";
  fetch(url, myInit)
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch data for that resource");
      } else {
        return res.json();
      }
    })
    .then((jsonRes) => {
      //({ jsonRes });
      localStorage.removeItem("token");
      window.location.href = "index.html";
    })
    .catch((err) => console.log(err));
});

// delete user
deleteButton.addEventListener("click", (e) => {
  myInit.method = "DELETE";
  fetch("/api/profile", myInit)
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch data for that resource");
      } else {
        return res.json();
      }
    })
    .then((jsonRes) => {
      //({ jsonRes });
      localStorage.removeItem("token");
      window.location.href = "index.html";
    })
    .catch((err) => console.log(err));
});
