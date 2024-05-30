import { Box } from "@mui/joy";
import { FcImport, FcMenu } from "react-icons/fc";

function Header({ OpenSidebar }) {
  return (
    <div className="header" style={{ justifyContent: " space-between" }}>
      <FcMenu size={50} onClick={OpenSidebar} />
      <FcImport size={50} />
    </div>
  );
}

export default Header;
