import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/activity">Activity</Link>
      </li>
    </ul>
  );
};

export default Header;
