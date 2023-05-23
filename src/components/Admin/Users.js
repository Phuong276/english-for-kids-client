import NavBarAdmin from "./NavBar";
import { getAllData } from "../../helper/helper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UsersAdmin() {
  const [users, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllUser = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/users`,
        {
          pageIndex: 1,
          pageSize: 100,
        }
      );
      setUsersData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fecthAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteData = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVERHOST}/api/users/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  const navigate = useNavigate();

  const updateData = (id) => {
    const link = "/admin/users/" + id;
    navigate(link);
  };

  const createData = () => {
    const link = "/admin/users/add";
    navigate(link);
  };

  if (isLoading) return;
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="content">
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Password</th>
            <th>Action</th>
          </tr>

          {users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>
                <input
                  id="user.id"
                  type="button"
                  name="edit"
                  value="Edit"
                  onClick={() => updateData(user.id)}
                />
                <input
                  id={user.id}
                  type="button"
                  name={user.id}
                  value="Delete"
                  onClick={() => deleteData(user.id)}
                />
              </td>
            </tr>
          ))}
        </table>
        <button onClick={() => createData()}>Add User</button>
      </div>
    </div>
  );
}
