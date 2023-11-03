import { useEffect, useRef } from "react";
import userAvatar from "../assets/images/avatar-icon.png";
import logo from "../assets/images/logo.png";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

const navlinks = [
  { path: "/", display: "Home" },
  { path: "/services", display: "Services" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/contact", display: "Contact" },
];

export default function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // * Explain how the sticky header and toggle icon features are working

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      )
        headerRef.current.classList.add("sicky_header");
      else headerRef.current.classList.remove("sicky_header");
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ====== Logo ====== */}
          <div>
            <img className="w-40" src={logo} alt="logo" />
          </div>

          {/* ====== Menu ====== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navlinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ====== Nav Right ====== */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={userAvatar}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Login
              </button>
            </Link>

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
