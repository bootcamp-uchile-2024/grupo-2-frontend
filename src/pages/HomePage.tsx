import Listado from "../components/Listado";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="left-column">
        <Sidebar />
      </div>
      <div className="right-column">
        <Listado />
      </div>
    </div>
  );
}