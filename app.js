const githubForm =document.getElementById("github-form");
const nameInput =document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

addeventlisteners();
function addeventlisteners(){
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();
    if(username===""){
        alert("Istifadeci adi girin. ")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message==="Not Found"){
                // hata mesaji
               ui.showError( "danger" ,"Istifadeci adi duzgun deyil!");
            }
            else{
                ui.addSearcedUsersToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
                 ui.showError( "success" ,"Istifadeci ugurla tapildi");
            }
        }
        )
        .catch(err => console.log(err));
    }

    e.preventDefault();
    ui.clearInput()
}
function clearAllSearched(){
    if(confirm("Axtarmalar hamisi silinsin mi?")){
        ui.clearAllSearchFromUI();
      
        Storage.clearAllSearchedUsersFromStorage();
    }
}
function getAllSearched(){
    let result="";
      let users = Storage.getSearchedUsersFromStorage();
      users.forEach(user => {
        result += ` <li class="list-group-item">${user}</li> `
      });
      lastUsers.innerHTML=result;
}