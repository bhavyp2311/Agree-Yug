import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import logo from "./assets/logo.png"; 
// import logo from "./assets/logo2.png"; 
import logo from "./assets/logo3.png"; 

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <header className="sticky z-50">
        <nav className="bg-[#fefcf0] border-gray-200 w-full lg:px-5 py-2 shadow-md">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" className="mr-3 h-12" />
            </Link>
            
            {/* Right Section: Login + Language Dropdown */}
            <div className="flex items-center lg:order-2 space-x-4 flex-wrap  px-1 py-1  rounded-2xl ">
              <select
                onChange={changeLanguage}
                value={i18n.language}
                className="px-1 py-1 flex rounded text-grey-700 border-transparent bg-[#fefcf0] text-right"
                
              > 
                <option value="en" className="text-center">English</option>
                <option value="gu" className="text-center">Gujarati(ગુજરાતી)  </option>
                <option value="hi" className="text-center">Hindi(हिन्दी)</option>
                <option value="be" className="text-center">Bengali(বাংলা)</option>
                <option value="te" className="text-center">Telugu(తెలుగు)</option>
                <option value="mr" className="text-center">Marathi(मराठी)</option>
                <option value="ma" className="text-center">Malayalam(മലയാളം)</option>
                <option value="ta" className="text-center">Tamil(தமிழ்)</option>
                <option value="ka" className="text-center">kannada(ಕನ್ನಡ)</option>
                <option value="pu" className="text-center">Punjabi(ਪੰਜਾਬੀ)</option>
                <option value="od" className="text-center">Odia(ଓଡିଆ)</option>
                <option value="as" className="text-center">Assamese(অসমীয়া)</option>
                <option value="ur" className="text-center">Urdu(اردو)</option>


              </select>
              {/* Login Button */}
              <section className="py-1">
                <Link to="/Login" className="flex items-center bg-[#f9be09] space-x-4 px-5 py-2 rounded-2xl">
                <span className="material-symbols-outlined">person</span>
                <b>{t("Log in")}</b>
              </Link>

              </section>
              {/* Language Dropdown */}
              
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between">
              <li>
                <NavLink
                  to="/Ai"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  <p className="flex">
                    <span className="material-symbols-outlined">network_intelligence</span>
                    {t("Ai Assistant")}
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Disease"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  <p className="flex">
                    <span className="material-symbols-outlined">photo_camera</span>
                    {t("Disease Detection")}
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Markethub"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  <p className="flex">
                    <span className="material-symbols-outlined">moving</span>
                    {t("Market Hub")}
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Community"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  <p className="flex">
                    <span className="material-symbols-outlined">group</span>
                    {t("Community")}
                  </p>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;

