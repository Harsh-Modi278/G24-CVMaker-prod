const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
const bearer = "BEARER " + token;
const myInit = {
  method: "GET",
  // withCredentials: true,
  // credentials: 'include',
  headers: {
    "Content-Type": "application/json",
    Authorization: bearer,
  },
  mode: "cors",
  cache: "default",
};
let isFromGoogle = false;

// show profile image
const profileButton = document.getElementById("MyProfile").children[0];
fetch("/api/profile", myInit)
  .then((res) => {
    // //(res);
    if (!res.ok) {
      throw Error("Could not fetch data for that resource");
    } else {
      return res.json();
    }
  })
  .then((jsonRes) => {
    //(jsonRes);
    if (!jsonRes.data.user.isAdmin) {
      ////(jsonRes);
      window.location.href = "dashboard.html";
    }
    // //(jsonRes.data.user.photoURL);
    profileButton.src = jsonRes.data.user.photoURL;

    if (jsonRes.data.user.googleId) isFromGoogle = true;
  })

  .catch((err) => {
    //(err);
    window.location.href = "login.html";
  });

let users = [];
var ctx = document.getElementById("myChart").getContext("2d");
var today_user_counter = 0;
var totalUser = 0;
var cv_created_today = 0;
var cv_updated_today = 0;
const url = "/api/traffic";
fetch(url, myInit)
  .then((res) => {
    // //(res);
    if (!res.ok) {
      throw Error("Could not fetch data for that resource");
    } else {
      return res.json();
    }
  })
  .then((jsonRes) => {
    //(jsonRes);
    var pickrate = jsonRes.data.templatePickRate;
    var pickrateArray = Object.values(pickrate);

    var ctx = document.getElementById("myChart").getContext("2d");
    var ctx1 = document.getElementById("myChart1").getContext("2d");

    var myChart1 = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Type-1", "Type-2", "Type-3"],
        datasets: [
          {
            label: "Pick rate of Templates",
            data: pickrateArray,
            backgroundColor: [
              //'rgba(54, 162, 235, 0.2)',
              //  'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              "rgba(153, 102, 255, 0.2)",
              // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              // 'rgba(54, 162, 235, 1)',
              //  'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              "rgba(153, 102, 255, 1)",
              // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var user_date_wise_array = jsonRes.data.userDateVise;
    var daily_dates = Object.keys(user_date_wise_array);
    var daily_users = Object.values(user_date_wise_array);
    // //(daily_users);

    var myChart1 = new Chart(ctx1, {
      type: "line",
      data: {
        labels: daily_dates,
        datasets: [
          {
            label: "Daily Users",
            data: daily_users,
            backgroundColor: [
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              //     'rgba(75, 192, 192, 0.2)',
              "rgba(153, 102, 255, 0.2)",
              //     'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              //'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              "rgba(153, 102, 255, 1)",
              // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const counters = document.querySelectorAll(".counter");
    const speed = 100; // The lower the slower
    //  //(counters[1]);

    const updateCount = () => {
      const target = +jsonRes.data.totalUsers;
      const count = +counters[1].innerText;

      // Lower inc to slow and higher to slow
      const inc = target / speed;

      // //(inc);
      // //(count);

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counters[1].innerText = Math.ceil(count + inc);
        // Call function every ms
        setTimeout(updateCount, 1);
      } else {
        counters[1].innerText = target;
      }
    };

    updateCount();

    //  //(jsonRes.data.cvsUpdatedToday);
    const updateCount2 = () => {
      const target = +jsonRes.data.cvsUpdatedToday;
      // //(target);
      const count = +counters[0].innerText;

      // Lower inc to slow and higher to slow
      const inc = target / speed;

      ////(inc);
      // //(count);

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counters[0].innerText = Math.ceil(count + inc);
        // Call function every ms
        setTimeout(updateCount2, 1);
      } else {
        counters[0].innerText = target;
      }
    };

    updateCount2();

    // users = jsonRes;
  })
  .catch((err) => {
    //({ err });
  });

const logoutButton = document.getElementById("logout-button");
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
