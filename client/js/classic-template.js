var isPreviewClicked = true;
const submitBtn = document.getElementById("save-cv");

function printResume() {
  //document represent respective resume template
  //("print");
  var printdocument = document.getElementById("resume").innerHTML;
  var originalDocument = document.body.innerHTML;

  //order matter here
  document.getElementById("resume").classList.remove("my-resume-page");
  document.body.style.background = "white";
  document.body.innerHTML = printdocument;
  var addbtns = document.getElementsByClassName("addButton");
  var rmbtns = document.getElementsByClassName("removeButton");
  var inputs = document.getElementsByTagName("input");

  var i;
  for (i = 0; i < addbtns.length; i++) addbtns[i].style.display = "none";
  for (i = 0; i < rmbtns.length; i++) rmbtns[i].style.display = "none";

  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.display = "none";
  }
  if (document.getElementById("photocaption") != null) {
    document.getElementById("photocaption").style.display = "none";
  }
  //
  //$(document).ready();
  //img isn't ready and its printing already
  //so set timeout and wait for image to load
  //.5s would be sufficient
  setTimeout(function () {
    window.print();
    document.body.innerHTML = originalDocument;
  }, 500);
  return "print successful";
}

function previewResume() {
  isPreviewClicked != isPreviewClicked;
  var addbtns = document.getElementsByClassName("addButton");
  var rmbtns = document.getElementsByClassName("removeButton");
  var inputs = document.getElementsByTagName("input");
  var i;
  if (isPreviewClicked) {
    for (i = 0; i < addbtns.length; i++) {
      addbtns[i].style.display = "none";
    }
    for (i = 0; i < rmbtns.length; i++) {
      rmbtns[i].style.display = "none";
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }

    document.getElementById("preview-doc").innerHTML = "Edit";
    isPreviewClicked = false; //now edit option should be available
  } else {
    for (i = 0; i < addbtns.length; i++) {
      addbtns[i].style.display = "inline";
    }
    for (i = 0; i < rmbtns.length; i++) {
      rmbtns[i].style.display = "inline";
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "inline-block";
    }

    if (document.getElementById("photocaption") != null) {
      document.getElementById("photocaption").style.display = "inline-block";
    }
    document.getElementById("preview-doc").innerHTML = "Preview";
    isPreviewClicked = true; //now Preview option should be available
  }

  return "preview successful";
}

/* -------------------- Add/Remove Functionality ----------------------- */
var newCellPlaceholder = "Click to select";

function removeButtonHTML(tableid) {
  return (
    '<button class="removeButton small-btn" onclick="removeRow(\'' +
    tableid +
    "',this)\">Remove</button>"
  );
}

function selectAll() {
  document.execCommand("selectAll", true, "replace this");
  //firefox doesn't allow keyboard operations with scripts
}

function applyBorder(element) {
  element.style.border = "1px solid rgb(150,150,150)";
  element.style.borderRadius = "30px";
}

function replaceDotwithSpace(s) {
  str = new String(s);
  return str.replace(".", " ");
}

function checkFields() {
  var fields = document.getElementsByClassName("input-field");
  var i;
  for (i = 0; i < fields.length; i++) {
    if (fields[i].innerText == "") return false;
  }
  return true;
}

function addEducation() {
  var newrow = document
    .getElementById("education-table")
    .tBodies[0].insertRow(-1);
  var cell = newrow.insertCell(0);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = "<b>" + newCellPlaceholder + "</b>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "text-center");
  cell.innerHTML = newCellPlaceholder;

  /*cell = newrow.insertCell(-1);
    cell.innerHTML = removeButtonHTML('education-table');*/
  // -1 is for appending at last
  ////('added education');
}

function addSkills() {
  var skilltable = document.getElementById("skills-table").tBodies[0];
  var lastrowindex = skilltable.rows.length;
  var newrow = skilltable.insertRow(lastrowindex);
  var cell = newrow.insertCell(0);
  cell.innerHTML = "<b>Technical Electives</b>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;
  //("added Skill");

  document.getElementById("add-skill").classList.add("invisible");
  document.getElementById("remove-skill").classList.remove("invisible");
}

function addInternships() {
  var internshipstable = document.getElementById("internships-table")
    .tBodies[0];
  var lastrowindex = internshipstable.rows.length;
  var newrow = internshipstable.insertRow(lastrowindex);

  var cell = newrow.insertCell(0);
  cell.setAttribute("valign", "top");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "w-20 input-field");
  cell.innerHTML = "<b>" + newCellPlaceholder + "</b>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-60");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p></div><div><p><i>" +
    "Guide: " +
    '<span contenteditable="true" spellcheck="true" class="input-field head-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</span>" +
    "</i></p></div>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20 text-right");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    '</p></div><div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p><div>";
}

function addProjects() {
  var projectstable = document.getElementById("projects-table").tBodies[0];
  var lastrowindex = projectstable.rows.length;
  var newrow = projectstable.insertRow(lastrowindex);
  var cell = newrow.insertCell(0);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()"><b>' +
    newCellPlaceholder +
    "</b></p></div><div><p><i>" +
    "Guide: " +
    '<span contenteditable="true" spellcheck="true" class="input-field head-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</span>" +
    "</i></p><div>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "w-60 input-field");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20 text-right");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    '</p></div><div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p></div>";
}
function addSpace(element) {
  element.parentNode.innerHTML =
    '<br style="padding-top:2rem;">' + element.parentNode.innerHTML;
}
function removeSpace(element) {
  element.parentNode.innerHTML =
    '<button class="addButton" onclick="addSpace(this)">Add Space</button> <button class="removeButton" onclick="removeSpace(this)">Remove Space</button>';
}

function addtoList(list_id) {
  var list = document.getElementById(list_id);
  var cell = document.createElement("li");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("class", "input-field");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;
  list.appendChild(cell);
}

function addAchievements() {
  document.getElementById("awards-table").style.display = "inline";
  setTimeout(function () {
    document.getElementById("awards-table").style.opacity = 1;
    if (document.getElementById("awards-hr"))
      document.getElementById("awards-hr").style.opacity = 1;
  }, 1);
  if (document.getElementById("awards-hr"))
    document.getElementById("awards-hr").style.display = "block";
  document.getElementById("ach-btn").style.opacity = 0;
}

//resume removeButtons utility
function removeRow(tableid, element = null) {
  var list;
  var lastrowindex;

  if (tableid == "skills-table") {
    document.getElementById("remove-skill").classList.add("invisible");
    document.getElementById("add-skill").classList.remove("invisible");
    lastrowindex = document.getElementById(tableid).rows.length - 1;
    document.getElementById(tableid).deleteRow(lastrowindex - 1);
    return;
  } else if (tableid == "hobbies-list") {
    list = document.getElementById("hobbies-list");
    list.removeChild(list.lastChild);
    //printf('removed');printf(list);
    return;
  } else if (tableid == "positions-list") {
    list = document.getElementById("positions-list");
    list.removeChild(list.lastChild);
    return;
  }
  /*
    var rowindex = element.parentNode.parentNode.rowIndex;
    document.getElementById(tableid).deleteRow(rowindex);
    */
  lastrowindex = document.getElementById(tableid).rows.length - 1;
  if (
    (tableid != "education-table" && lastrowindex > 1) ||
    (tableid == "education-table" && lastrowindex > 2)
  )
    document.getElementById(tableid).deleteRow(lastrowindex - 1);
}

function removeAchievements() {
  document.getElementById("awards-table").style.opacity = 0;
  if (document.getElementById("awards-hr") != null)
    document.getElementById("awards-hr").style.opacity = 0;

  setTimeout(function () {
    document.getElementById("ach-btn").style.opacity = 1;
    document.getElementById("awards-table").style.display = "none";
    if (document.getElementById("awards-hr") != null)
      document.getElementById("awards-hr").style.display = "none";
  }, 400);
}

function saveResume() {
  //Heading
  // var template = document.getElementById("template-name").innerHTML;
  var studentname = document.getElementById("stud-name").innerHTML;
  var emailaddr = document.getElementById("e-mail").innerHTML;
  var dob = new Date(document.getElementById("dob").innerText);
  var address = document.getElementById("address").innerHTML;
  var tablerows;
  var i, j;
  //Education
  tablerows = document.getElementById("education-table").tBodies[0].rows;
  ////(tablerows.length);
  var edu_tabledata = [];
  for (i = 0; i < tablerows.length; i++) {
    edu_tabledata[i] = [];
    var rowcells = tablerows[i].cells;
    for (j = 0; j < 4; j++) edu_tabledata[i][j] = rowcells[j].innerHTML;
    ////(i);
  }
  // //(edu_tabledata);
  //Skills
  tablerows = document.getElementById("skills-table").tBodies[0].rows;
  var skills_tabledata = [];
  for (i = 0; i < tablerows.length; i++) {
    skills_tabledata.push(tablerows[i].cells[1].innerHTML);
  }
  ////(skills_tabledata);
  //Internships
  tablerows = document.getElementById("internships-table").tBodies[0].rows;
  var internships_tabledata = [];
  for (i = 0; i < tablerows.length; i++) {
    internships_tabledata[i] = [];
    for (j = 0; j < 3; j++) {
      internships_tabledata[i][j] = tablerows[i].cells[j].innerHTML;
    }
    ////(i);
  }
  //Projects
  tablerows = document.getElementById("projects-table").tBodies[0].rows;
  var projects_tabledata = [];
  for (i = 0; i < tablerows.length; i++) {
    projects_tabledata[i] = [];
    for (j = 0; j < 3; j++) {
      projects_tabledata[i][j] = tablerows[i].cells[j].innerHTML;
    }
  }
  //positions
  var ul = document.getElementById("positions-list");
  var positions_list = ul.innerHTML;
  //hobbies
  ul = document.getElementById("hobbies-list");
  var hobbies_list = ul.innerHTML;
  //achievments
  var awards_list = document.getElementById("awards-list").innerHTML;

  //make resume dictionary map
  var resumeDetails = {
    fullName: studentname,
    institute:
      "Dhirubhai Ambani Institute of Information and Communication Technology",
    email: emailaddr,
    DOB: dob,
    address: address,
    education: edu_tabledata,
    skills: skills_tabledata,
    internships: internships_tabledata,
    projects: projects_tabledata,
    positionOfResponiblity: positions_list,
    intrestAndHobbies: hobbies_list,
    achievements: awards_list,
  };

  //(resumeDetails);
  return resumeDetails;
}

const loadResume = async function () {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const bearer = "BEARER " + token;
  let isUserLoggedIn = false;
  let isFromGoogle = false;
  if (token) isUserLoggedIn = true;
  // //(document.cookie);
  const myInit = {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
      cookie: document.cookie,
    },
    mode: "cors",
    cache: "default",
  };

  let resumesObj;
  const res = await fetch("/api/profile", myInit);
  try {
    if (!res.ok) {
      throw Error("Could not fetch data for that resource");
    } else {
      const jsonRes = await res.json();
      //({ jsonRes });
      resumesObj = jsonRes.data.user?.resumes;
      try {
        let flag = true;
        for (let x of resumesObj) {
          if (x.index === 0) {
            flag = false;
            break;
          }
        }
        if (flag) {
          myInit.method = "POST";
          myInit.body = JSON.stringify({ index: 0 });
          //("here0");

          const res = await fetch("/api/resumeData", myInit);
          //("here1");

          const jsonRes = await res.json();
          //("here2");
          if (!jsonRes.success) throw Error("error");
          //(jsonRes);
          resumesObj.push({ index: 0, id: jsonRes.data.resumeId });
          //(resumesObj);
        }
        //(jsonRes);
      } catch (err) {
        //(err);
      }

      if (!jsonRes.data.user.username) {
        window.location.href = "login.html";
      } else {
        isUserLoggedIn = true;

        if (jsonRes.data.user.isAdmin) {
          document.getElementById("admin-dashboard").style.display = "inline";
        }
        if (jsonRes.data.user.googleId) isFromGoogle = true;
        document.getElementById("user-image").src = jsonRes.data.user.photoURL;
      }
    }
  } catch (err) {
    //(err);
  }
  // //(document.cookie);
  //   if (!resumesObj) return;
  let resumeId;
  for (let i = 0; i < resumesObj.length; i++) {
    if (resumesObj[i].index == 0) {
      resumeId = resumesObj[i].id;
      break;
    }
  }
  myInit.method = "GET";
  delete myInit.body;
  fetch(`/api/resumeData/${resumeId}`, myInit)
    .then((res) => res.json())
    .then((jsonRes) => {
      //(jsonRes);
      const resumeData = jsonRes.data.resumeData;

      let tablerows, i, j;
      // personal info
      document.getElementById("stud-name").innerHTML = "" + resumeData.fullName;
      document.getElementById("e-mail").innerHTML = "" + resumeData.email;
      document.getElementById("dob").innerHTML =
        "" + resumeData.DOB?.slice(0, 10);
      document.getElementById("address").innerHTML = "" + resumeData.address;

      // education
      if(resumeData?.education && resumeData?.education.length>0){
        tablerows = document.getElementById("education-table").tBodies[0].rows;
        let edu_tabledata = resumeData?.education || [];
        let rowstobeupdated = edu_tabledata.length;
        while (rowstobeupdated - tablerows.length > 0) {
          addEducation();
          tablerows = document.getElementById("education-table").tBodies[0].rows;
        } //addextra rows bcoz database has more rows then html table
        while (tablerows.length - rowstobeupdated > 0) {
          removeRow("education-table");
          tablerows = document.getElementById("education-table").tBodies[0].rows;
        } //remove rows bcoz default html has more rows then database
        for (i = 0; i < rowstobeupdated; i++) {
          //update rows
          for (j = 0; j < 4; j++)
            tablerows[i].cells[j].innerHTML = edu_tabledata[i][j];
          ////(i);
        }
        
      }

      //skills
      if(resumeData?.skills && resumeData?.skills.length>0){
        tablerows = document.getElementById("skills-table").tBodies[0].rows;
        let skills_tabledata = resumeData?.skills || [];
        rowstobeupdated = skills_tabledata.length;
        while (rowstobeupdated - tablerows.length > 0) {
          addSkills();
          tablerows = document.getElementById("skills-table").tBodies[0].rows;
        } //when database has more rows
        while (tablerows.length - rowstobeupdated > 0) {
          removeRow("skills-table");
          tablerows = document.getElementById("skills-table").tBodies[0].rows;
        } //when defalt html page got more rows
        for (i = 0; i < rowstobeupdated; i++) {
          tablerows[i].cells[1].innerHTML = skills_tabledata[i];
        }

      }

      //Internships
      if(resumeData?.internships && resumeData?.internships.length>0){
        tablerows = document.getElementById("internships-table").tBodies[0].rows;
        let internships_tabledata = resumeData?.internships || [];
        rowstobeupdated = internships_tabledata.length;
        while (rowstobeupdated - tablerows.length > 0) {
          addInternships();
          tablerows = document.getElementById("internships-table").tBodies[0]
            .rows;
        }
        while (tablerows.length - rowstobeupdated > 0) {
          removeRow("internships-table");
          tablerows = document.getElementById("internships-table").tBodies[0]
            .rows;
        }
        for (i = 0; i < rowstobeupdated; i++) {
          for (j = 0; j < 3; j++) {
            tablerows[i].cells[j].innerHTML = internships_tabledata[i][j];
          }
        }
        
      }

      //Projects
      if(resumeData?.projects && resumeData?.projects.length>0){
        tablerows = document.getElementById("projects-table").tBodies[0].rows;
        let projects_tabledata = resumeData?.projects || [];
        rowstobeupdated = projects_tabledata.length;
        while (rowstobeupdated - tablerows.length > 0) {
          addProjects();
          tablerows = document.getElementById("projects-table").tBodies[0].rows;
        }
        while (tablerows.length - rowstobeupdated > 0) {
          removeRow("projects-table");
          tablerows = document.getElementById("internships-table").tBodies[0]
            .rows;
        }
        for (i = 0; i < rowstobeupdated; i++) {
          for (j = 0; j < 3; j++) {
            tablerows[i].cells[j].innerHTML = projects_tabledata[i][j];
          }
        }

      }

      //positions
      if (resumeData["positionOfResponiblity"] != null) {
        document.getElementById("positions-list").innerHTML =
          resumeData["positionOfResponiblity"];
      }

      //hobbies
      if (resumeData["intrestAndHobbies"]) {
        document.getElementById("hobbies-list").innerHTML =
          resumeData["intrestAndHobbies"];
      }
      //positions
      if (resumeData["achievements"] != null) {
        document.getElementById("awards-list").innerHTML =
          resumeData["achievements"];
      }
    })
    .catch((err) => console.log(err));
};

submitBtn.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const bearer = "BEARER " + token;
  let isUserLoggedIn = false;
  let isFromGoogle = false;
  if (token) isUserLoggedIn = true;
  // //(document.cookie);
  const myInit = {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
      cookie: document.cookie,
    },
    mode: "cors",
    cache: "default",
  };

  let resumesObj;
  const res = await fetch("/api/profile", myInit);
  try {
    if (!res.ok) {
      throw Error("Could not fetch data for that resource");
    } else {
      const jsonRes = await res.json();
      //({ jsonRes });
      resumesObj = jsonRes.data.user.resumes;
      if (!jsonRes.data.user.username) {
        window.location.href = "login.html";
      } else {
        isUserLoggedIn = true;

        if (jsonRes.data.user.isAdmin) {
          document.getElementById("admin-dashboard").style.display = "inline";
        }
        if (jsonRes.data.user.googleId) isFromGoogle = true;
        document.getElementById("user-image").src = jsonRes.data.user.photoURL;
      }
    }
  } catch (err) {
    console.log(err);
  }

  e.preventDefault();
  const resumeBody = saveResume();
  //(resumesObj);
  let resumeId;
  for (let i = 0; i < resumesObj.length; i++) {
    if (resumesObj[i].index == 0) {
      resumeId = resumesObj[i].id;
      break;
    }
  }
  if (!resumeId) {
    console.error("resume id not found, can't proceed");
  } else {
    myInit.method = "POST";
    myInit.body = JSON.stringify(resumeBody);
    fetch(`/api/resumeData/${resumeId}`, myInit)
      .then((res) => res.json())
      .then((jsonRes) => {
        //(jsonRes);
        const alertDiv = document.getElementById("alert-message");
          alertDiv.innerHTML = "";
          alertDiv.style.display = "flex";
          const newDiv = document.createElement("div");
          newDiv.style.width = "fit-content";

          // alertDiv.setAttribute("justify-content","center");
          // alertDiv.setAttribute("align-items","center");
          const str = "alert alert-success alert-dismissible fade show container-md";
          str.split(" ").forEach((c)=>newDiv.classList.add(c));
            newDiv.innerHTML = jsonRes.data.msg;

          const newBtn = document.createElement("button");
          newBtn.classList.add("btn-close");
          newBtn.setAttribute("data-bs-dismiss","alert");
          newBtn.setAttribute("aria-label","Close");
        

          newDiv.append(newBtn);
          alertDiv.append(newDiv);
      })
      .catch((err) => {
        //(err);
        const alertDiv1 = document.getElementById("alert-message-warn");
        alertDiv1.innerHTML = "";
        alertDiv1.style.display = "flex";
        const newDiv = document.createElement("div");
        newDiv.style.width = "fit-content";
        // alertDiv1.setAttribute("justify-content","center");
        // alertDiv1.setAttribute("align-items","center");
        const str = "alert alert-danger alert-dismissible fade show container-md";
        str.split(" ").forEach((c)=>newDiv.classList.add(c));        
          newDiv.innerHTML = err;

        const newBtn = document.createElement("button");
        newBtn.classList.add("btn-close");
        newBtn.setAttribute("data-bs-dismiss","alert");
        newBtn.setAttribute("aria-label","Close");
      

        newDiv.append(newBtn);
        alertDiv1.append(newDiv);
      });
  }
});

loadResume(); //will get called on page load

token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";

bearer = "BEARER " + token;

myInit = {
  method: "GET",
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Authorization: bearer,
    cookie: document.cookie,
  },
  mode: "cors",
  cache: "default",
};

fetch("/api/profile", myInit)
  .then((res) => {
  //(res);
  if (!res.ok) {
    throw Error("Could not fetch data for that resource");
  } else {
    return res.json();
  }
  })
  .then((jsonRes) => {
  //({ jsonRes });
  if (!jsonRes.success) {
    window.location.href = "login.html";
  } else {
    //user is logged in
  }
  })
  .catch((err) => {
    //(err);
    window.location.href = "login.html";
  });
