// ======================= 1st option  ========================
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo3.png"; 

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky z-50">
        <nav className="bg-[#fefcf0] border-gray-200 w-full lg:px-5 py-2 shadow-md">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4">
            
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" className="mr-3 h-12" />
            </Link>

            {/* Right Section: Login + Language + Hamburger */}
            <div className="flex items-center space-x-2 lg:space-x-4 order-2">
              
              {/* Login + Language (always visible) */}
              <div className="flex items-center space-x-2">
                <select
                  onChange={changeLanguage}
                  value={i18n.language}
                  className="px-2 py-1 rounded-xl text-gray-700 border border-gray-300 bg-[#fffcf0]"
                > 
                  <option value="en">English</option>
                  <option value="gu">Gujarati(ગુજરાતી)</option>
                  <option value="hi">Hindi(हिन्दী)</option>
                  <option value="be">Bengali(বাংলা)</option>
                  <option value="te">Telugu(తెలుగు)</option>
                  <option value="mr">Marathi(मराठी)</option>
                  <option value="ma">Malayalam(മലയാളം)</option>
                  <option value="ta">Tamil(தமிழ்)</option>
                  <option value="ka">Kannada(ಕನ್ನಡ)</option>
                  <option value="pu">Punjabi(ਪੰਜਾਬੀ)</option>
                  <option value="od">Odia(ଓଡିଆ)</option>
                  <option value="as">Assamese(অসমীয়া)</option>
                  <option value="ur">Urdu(اردو)</option>
                </select>

                <Link to="/Login" className="flex items-center bg-[#f9be09] space-x-2 px-4 py-2 rounded-2xl">
                  <span className="material-symbols-outlined">person</span>
                  <b>{t("Log in")}</b>
                </Link>
              </div>

              {/* Hamburger toggle button (mobile only) */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-700 hover:text-orange-700"
                  aria-label="Toggle menu"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {isMenuOpen ? "close" : "menu"}
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation Links (Desktop) */}
            <ul className="hidden lg:flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between">
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

          {/* Mobile Menu (Tablet & Mobile) */}
          <div
            className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-[#fefcf0] border-t border-gray-200`}
          >
            <ul className="flex flex-col font-medium px-4 py-2 space-y-2">
              <li>
                <NavLink
                  to="/Ai"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 rounded duration-200 ${
                      isActive ? "text-orange-700 bg-orange-50" : "text-gray-700"
                    } hover:bg-gray-50 hover:text-orange-700`
                  }
                >
                  <span className="material-symbols-outlined mr-2">network_intelligence</span>
                  {t("Ai Assistant")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Disease"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 rounded duration-200 ${
                      isActive ? "text-orange-700 bg-orange-50" : "text-gray-700"
                    } hover:bg-gray-50 hover:text-orange-700`
                  }
                >
                  <span className="material-symbols-outlined mr-2">photo_camera</span>
                  {t("Disease Detection")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Markethub"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 rounded duration-200 ${
                      isActive ? "text-orange-700 bg-orange-50" : "text-gray-700"
                    } hover:bg-gray-50 hover:text-orange-700`
                  }
                >
                  <span className="material-symbols-outlined mr-2">moving</span>
                  {t("Market Hub")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Community"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 rounded duration-200 ${
                      isActive ? "text-orange-700 bg-orange-50" : "text-gray-700"
                    } hover:bg-gray-50 hover:text-orange-700`
                  }
                >
                  <span className="material-symbols-outlined mr-2">group</span>
                  {t("Community")}
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

// // ============================= 2nd option =================================



// import React from "react";
// import { Link, NavLink, Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import logo from "./assets/logo3.png";

// function Header() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (e) => {
//     i18n.changeLanguage(e.target.value);
//   };

//   return (
//     <>
//       <header className="sticky z-50 top-0">
//         <nav className="bg-[#fefcf0] border-gray-200 w-full lg:px-5 py-2 shadow-md">
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mx-auto max-w-screen-xl px-4">

//             {/* Logo */}
//             <Link to="/" className="mb-2 lg:mb-0">
//               <img src={logo} alt="Logo" className="mr-3 h-12" />
//             </Link>

//             {/* Login + Language */}
            

//             {/* Navigation Links */}
//             <ul className="flex flex-col lg:flex-row lg:space-x-8 font-medium">
//               <li>
//                 <NavLink
//                   to="/Ai"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-orange-700" : "text-gray-700"
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   <p className="flex items-center">
//                     <span className="material-symbols-outlined mr-1">network_intelligence</span>
//                     {t("Ai Assistant")}
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/Disease"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-orange-700" : "text-gray-700"
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   <p className="flex items-center">
//                     <span className="material-symbols-outlined mr-1">photo_camera</span>
//                     {t("Disease Detection")}
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/Markethub"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-orange-700" : "text-gray-700"
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   <p className="flex items-center">
//                     <span className="material-symbols-outlined mr-1">moving</span>
//                     {t("Market Hub")}
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/Community"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-orange-700" : "text-gray-700"
//                     } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                 >
//                   <p className="flex items-center">
//                     <span className="material-symbols-outlined mr-1">group</span>
//                     {t("Community")}
//                   </p>
//                 </NavLink>
//               </li>
//             </ul>
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mb-2 py-2 lg:mb-0">
//               <select
//                 onChange={changeLanguage}
//                 value={i18n.language}
//                 className="px-2 py-2  rounded-xl text-gray-700 border border-gray-300 bg-[#fffcf0] mb-2 lg:mb-0"
//               >
//                 <option value="en">English</option>
//                 <option value="gu">Gujarati(ગુજરાતી)</option>
//                 <option value="hi">Hindi(हिन्दী)</option>
//                 <option value="be">Bengali(বাংলা)</option>
//                 <option value="te">Telugu(తెలుగు)</option>
//                 <option value="mr">Marathi(मराठी)</option>
//                 <option value="ma">Malayalam(മലയാളം)</option>
//                 <option value="ta">Tamil(தமிழ்)</option>
//                 <option value="ka">Kannada(ಕನ್ನಡ)</option>
//                 <option value="pu">Punjabi(ਪੰਜਾਬੀ)</option>
//                 <option value="od">Odia(ଓଡିଆ)</option>
//                 <option value="as">Assamese(অসমীয়া)</option>
//                 <option value="ur">Urdu(اردو)</option>
//               </select>

//               <Link to="/Login" className="flex items-center bg-[#f9be09] space-x-2 px-4 py-2 rounded-2xl">
//                 <span className="material-symbols-outlined">person</span>
//                 <b>{t("Log in")}</b>
//               </Link>
//             </div>
//           </div>
          
//         </nav>
//       </header>
//       <Outlet />
//     </>
//   );
// }

// export default Header;
