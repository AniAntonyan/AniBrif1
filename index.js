import {trainees} from './data.js';


initGridList();

window.addEventListener("hashchange", function () {
  let hash = window.location.hash;
  let userPage = document.querySelector(".user-page");

  if (hash === "" ) {
    initGridList();
    showBlocks(["#cv-list-page"]);
    hideBlocks(["#cv-body-page","#register-page","#about-page","#service-page"]);

    return;
  }else if(hash ==="#service") {
    showBlocks(["#service-page"]);
    hideBlocks(["#cv-body-page","#cv-list-page","#register-page","#about-page"]);
  }else if(hash=== "#about"){
    showBlocks(["#about-page"]);
    hideBlocks(["#cv-body-page","#cv-list-page","#register-page","#service-page"]);
  }else if(hash === "#user-page"){
    showBlocks (["#user-page"]);
    hideBlocks(["#cv-body-page","#cv-list-page","#register-page","#about-page", "#service-page"]);
  }else {
    let id = hash.split('=').pop();
    initCvPage(id);
    showBlocks(["#cv-body-page"]);
    hideBlocks(["#cv-list-page","#register-page","#service-page","#about-page"])
  }
});

// creates users cards
function initGridList() {
  let container = document.querySelector("#cv-list-page");

  container.innerHTML = "";
  container.innerHTML += `
        <div class="user-card">
             New-person

           </div>
           `;
  // let user =trainees[0];
  trainees.forEach((user) => {
    container.innerHTML += `
    <div class="user-card">
    <a href="#cv-body-page?id=${user.id}">
         <img class="card-img" src="${
           user.image || "./img/person-icon.jpg"
         }" alt="card-picutre" />
       <div class="contact-info">
         <div class="name">
           <h2>${user.firstName}&nbsp${user.lastName}</h2>
         </div>
         <div class="contact">
             <p class="card-phone"> Phone:${user.phone}</p>
             <p class="card-email">Email:${user.email}</p>
             <p class="card-proffesion">Proffesion:${user.proffesion}</p>
         </div>
         </a>
       </div>
           `;
  });
}

function initCvPage(userId) {

  let user = findObject(userId);
  console.log(user);
  document.querySelector("#cv-body-page").innerHTML = `
  <div class="cv-header">
        <div class="main-info">
          <div class="full-name">
            <h3>${user.firstName}&nbsp${user.lastName}</h3>
          </div>
          <div class="contact">
            <p id="phone">Phone:&nbsp${user.phone}</p>
            <br />
            <p id="email">Email:&nbsp${user.email}</p>
          </div>
        </div>
        <div class="image">
          <img class="cv-header-img" src="${
            user.image || "./img/person-icon.jpg"
          }" />
        </div>
      </div>
      <div class="cv-info">
        <div class="info">
          <h3 class="info-header">Education</h3>
          <div class="education-list">
            ${user.education || "not defined yet"}
          </div>
        </div>
        <div class="info">
          <h3 class="infoH-header">Work Experience</h3>
          <div class="work-experience-list">
            ${user.experience || "not defined yet"}
          </div>
        </div>
      </div>
    
  `;
}

// redirects to new cv read more page with hash change
function readMore(userId) {
  changeHashLocation("read-more?id=" + userId);
}

function hideBlocks(toHide) {
  toHide.forEach((item) => {
    document.querySelector(item).classList.add("hide");
  });
}

function showBlocks(toShow) {
  toShow.forEach((item) => {
    document.querySelector(item).classList.remove("hide");
  });
}

function changeHashLocation(hashValue) {
  window.location.hash = hashValue;
}

function findObject(usierId) {
  return trainees.find((item) => item.id === usierId);
}

function mainPage() {
  changeHashLocation("");
  showBlocks(["#cv-list-page"]);
  hideBlocks(["#cv-body-page"]);
}
