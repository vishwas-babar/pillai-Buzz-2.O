import axios from "axios";

class UserService {
  // add api fetching methods here, related to user data
  loginUserAccount = async ({ email, password }) => {
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (response) {
        console.log("this is status code: ", response.status);
        return response;
      }
    } catch (error) {
      console.log("error occured in loginuseraccount");
      throw error;
    }
  };

  getCurrentUser = async () => {
    //get the user details
    try {
      const res = await axios.get("/api/user/get-current-user");
      if (res) {
        return res;
      }
    } catch (error) {
      throw error;
    }
  };

  getUserDetails = async (_id) => {
    try {
      const res = await axios.get(`/api/user/${_id}/get-details`);

      if (res) {
        console.log(res.data);
        return res;
      }
    } catch (error) {
      throw error;
    }
  };
}

const userService = new UserService();

export default userService;
