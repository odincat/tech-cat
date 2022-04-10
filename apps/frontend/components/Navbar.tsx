import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: NextComponentType = () => {
  const menuItems = [{
    name: "Home",
    route: "/"
  },
  {
    name: "About me",
    route: "/about"
  },
  {
    name: "Projekte",
    route: "/projects"
  },
];

interface NavLinkArgs {
  target: string;
  displayName: string;
  }
  const NavLink = ({target, displayName}: NavLinkArgs) => {
    const router = useRouter();

    return(
      <a href={target} className={`${router.pathname == target ? " active" : ""}`}>{displayName}</a>
    );
  };

  const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);

    const handleButtonClick = () => {
      setOpen(!open);
    };

    return(
    <nav className="hamburger-menu">
      <button onClick={handleButtonClick} className="nav-mobile-button">
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`nav-links-mobile-container ${open ? "opened" : ""}`}>
        {menuItems.map((entry) => <NavLink key={entry.route} target={entry.route} displayName={entry.name} />)}
      </div>
    </nav>
    );
  };

  return (
      <div className="navigation">
        <div className="pt-2 pb-2 flex flex-row pl-4 pr-4 text-xl items-center justify-between">
          <div className="flex items-center">
            <img src="logo-cropped.png" alt="TechCat Logo" width="50px" className="inline mr-2 logo"></img>
            <h1 className="inline branding">TechCat</h1>
          </div>
          <nav className="navlinks-desktop">
            {menuItems.map((entry) => <NavLink key={entry.route} target={entry.route} displayName={entry.name} />)}
          </nav>
          <HamburgerMenu />
        </div>
      </div>
  );
};

export default Navbar;