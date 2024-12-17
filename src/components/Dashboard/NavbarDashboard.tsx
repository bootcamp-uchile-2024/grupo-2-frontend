import { logout } from "../../utils/logout";
import { isAuth } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NavbarDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow flex justify-end p-4 h-[60px]">
      {isAuth() && (
        <div className="flex space-x-4">
          <button
            className="text-black"
            onClick={() => {
              navigate("/");
            }}
          >
            <i className="fas fa-home" />
          </button>
          <button className="text-black">
            <i className="fas fa-user" /> Hola!
          </button>
          <button className="text-black">
            <i className="fas fa-cog" />
          </button>
          <button
            className="text-black"
            onClick={() => logout(dispatch, navigate)}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </nav>
  );
};
