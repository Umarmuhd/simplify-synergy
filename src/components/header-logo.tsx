import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/">
      <div className="items-center hidden lg:flex">
        <img src={logo} alt="Logo" height={28} width={28} />
        <p className="font-semibold text-2xl ml-2.5">Bolt</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
