import { useState } from "react";
import { toast } from "react-toastify";
import helper from "../../../helper/helper";
import NavBarAdmin from "../NavBar";

export default function CreateUserAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const changeUsername = (username) => {
    setUsername(username);
  };
  const changePassword = (password) => {
    setPassword(password);
  };
  const changeName = (name) => {
    setName(name);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const CREATE_USER_URL = "/api/register";
    try {
      await helper.post(
        CREATE_USER_URL,
        JSON.stringify({
          username,
          password,
          name,
          role: "USER",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      toast.success("Create Success");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
  };

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="content">
        <div className="container">
          <form>
            <div>
              <label> Username: </label>
              <input
                placeholder="Username"
                name="username"
                onChange={(e) => changeUsername(e.target.value)}
              />
            </div>
            <div>
              <label> Password: </label>
              <input
                placeholder="Password"
                name="password"
                onChange={(e) => changePassword(e.target.value)}
              />
            </div>
            <div>
              <label> Name: </label>
              <input
                placeholder="Name"
                name="name"
                onChange={(e) => changeName(e.target.value)}
              />
            </div>
            <button onClick={(e) => handleCreateUser(e)}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
