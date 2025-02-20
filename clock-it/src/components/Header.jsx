import LogOutButton from "./buttons/LogOut";
import HomeButton from "./buttons/Home";
import { useUser } from "../context/userContext.jsx";

function Header() {
 const { userRole } = useUser();
  return (
    <header>
      <LogOutButton/>
      {userRole === "user" && <HomeButton/>}
    </header>
  );
}

export default Header
