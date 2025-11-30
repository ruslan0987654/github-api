class Storage {
    static getSearchedUsersFromStorage(){
         let users;
         if(localStorage.getItem("search")===null){
            users=[];
         }
         else{
            users=JSON.parse(localStorage.getItem("search"));
         }
         return users;

    }
    static addSearchedUserToStorage(username){
         let users = this.getSearchedUsersFromStorage();

         if(users.indexOf(username)===-1){
            users.push(username);
         }
         localStorage.setItem("search",JSON.stringify(users));
    }
    static  clearAllSearchedUsersFromStorage(){
     localStorage.removeItem("search")
    }
}