// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".search-btn");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = "Place Write GitHub Username";
    reposData.style.color = "red";
    reposData.style.fontSize = "20px";
  } else {
    fetchapi();
  }
}

// Api Function
async function fetchapi() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${theInput.value}/repos`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    reposData.innerHTML = "";

    data.forEach((repo) => {
      // console.log(repo.name);
      let repoName = repo.name;
      let theUrl = `https://github.com/${theInput.value}/${repoName}`;
      reposData.innerHTML += `
        <div>      
            <p>${repoName}</p>
            <a href="${theUrl}" target="_blank">Visit</a>
        </div>
      `;
    });
  } catch (error) {
    console.error("خطأ في البيانات", error);
  }
}
