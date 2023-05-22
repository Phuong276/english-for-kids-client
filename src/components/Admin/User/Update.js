import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import helper, { getAllData } from "../../../helper/helper";
import NavBarAdmin from "../NavBar";

export default function UpdateUserAdmin() {
  const params = useParams();
  const [user, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const fecthDetailUser = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/users/${params.id}`
      );
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const changePassword = (password) => {
    setPassword(password);
  };
  const changeName = (name) => {
    setName(name);
  };

  useEffect(() => {
    fecthDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/users/" + user.id;
    try {
      await helper.put(
        UPDATE_USER_URL,
        JSON.stringify({
          password,
          name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      toast.success("Update Success");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
  };
  if (isLoading) return;
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="content">
        <div className="container">
          <div>
            <div>
              <div>
                <form>
                  <div>
                    <label> Username: </label>
                    <input
                      name="username"
                      className="form-control"
                      value={user.username}
                      disabled
                    />
                  </div>
                  <div>
                    <label> Password: </label>
                    <input
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      onChange={(e) => changePassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      onChange={(e) => changeName(e.target.value)}
                    />
                  </div>
                  <button onClick={(e) => handleUpdateUser(e)}>Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
