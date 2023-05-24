export default function NavBarAdmin() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div>
      <div class="sidenav">
        <a href="/login" onClick={logout}>
          Log out
        </a>
        <a href="/admin/users">Users</a>
        <a href="/admin/games">Games</a>
      </div>
    </div>
  );
}
