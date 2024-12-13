import { logout } from "../../utils/logout";
import { isAuth } from "../../utils/auth";

export const NavbarDashboard = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow flex justify-end p-4 h-[60px]">
      {isAuth() && (
        <div className="flex space-x-4">
            <button className="text-black">
              <i className="fas fa-home"></i>
            </button>
          <button className="text-black">
            <i className="fas fa-user"></i> Hola!
          </button>
          <button className="text-black">
            <i className="fas fa-cog"></i>
          </button>
          <button className="text-black" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </nav>
  );
};
