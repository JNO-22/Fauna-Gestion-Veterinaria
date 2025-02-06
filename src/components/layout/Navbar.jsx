import { Link, useLocation } from "react-router";
import { FaTree } from "react-icons/fa";

const NavBar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/clientes", label: "Clientes" },
    { path: "/mascotas", label: "Mascotas" },
    { path: "/turnos", label: "Turnos" },
  ];

  return (
    <div className="navbar bg-transparent px-4 fixed z-10">
      <div className="navbar-start">
        <span className="text-green-500 text-xl md:text-2xl font-bold flex items-start md:justify-center ">
          Fauna
          <FaTree className="w-4 h-4 text-green-500" />
        </span>
      </div>

      <div className="navbar-end px-2 ">
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-25 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  className={`${
                    pathname === item.path
                      ? "bg-brand-lightblue text-white"
                      : ""
                  }`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          role="tablist"
          className="tabs tabs-box px-2 hidden md:flex font-medium"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              role="tab"
              className={`tab ${pathname === item.path ? "tab-active" : ""}`}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
