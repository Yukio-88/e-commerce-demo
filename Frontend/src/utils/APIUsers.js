import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/users';


/*
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  responseType: "json"
});
*/

class UserApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    checkListUser() {
        return axios.post(USER_API_BASE_URL + "/listUsers" );
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    login(user) {
        return axios.post(""+USER_API_BASE_URL + '/login', user);
    }

  
    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }
   
    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
   
    
    
}


export default new UserApiService();
