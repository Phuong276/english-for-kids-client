import "../styles/NavBar.css";

export default function NavBar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="topnav">
      <a href="/">Home</a>
      <a className="logout" href="/login" onClick={logout}>
        Log out
      </a>
    </div>
  );
}
