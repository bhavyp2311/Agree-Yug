import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
// import logo from "./assets/logo.png"; 
// import logo from "./assets/logo2.png"; 
import logo from "./assets/logo3.png"; 



function Header() {
  return (
    <>
      <header className=" sticky z-50">
        <nav className="bg-[#fefcf0] border-gray-200 w-full lg:px-5 py-2 shadow-md">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="mr-3 h-12"
              />
            </Link>
            <div className="flex items-center lg:order-2 bg-[#f9be09] px-5 py-2 rounded-2xl">
                        <Link to="/Login" className="flex ">
                            <span class="material-symbols-outlined">person</span><b>Log in</b>
                        </Link>
            </div>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between">
              {/* <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex "><span class="material-symbols-outlined">home</span>Home</p>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/Ai"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex"><span class="material-symbols-outlined">network_intelligence</span>Ai Assistant</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Disease"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex"><span class="material-symbols-outlined">photo_camera</span>Disease Detection</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Markethub"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex"><span class="material-symbols-outlined">moving</span>Market Hub</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Community"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex"><span class="material-symbols-outlined">group</span>Community</p>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/Analysis"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                <p className="flex"><span class="material-symbols-outlined">bar_chart_4_bars</span>Analysis</p>
                </NavLink>
              </li> */}
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
