import React, { useEffect, useState } from "react";
import bg_1 from "../assets/bg_1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faShoppingBasket,
  faSignOut,
  faTimes,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "./FadeIn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { clearAll } from "../features/userSlice";

const navbarItems = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Agent", link: "/agent" },
  { label: "Services", link: "/ourServices" },
  { label: "Properties", link: "/properties" },
  { label: "Blog", link: "/blogs" },
  { label: "Contact", link: "/contact" },
];

const avatarMenu = [
  { label: "My Profile", icon: faUser, link: "" },
  { label: "Property List", icon: faShoppingBasket, link: "/propertyList" },
  { label: "Log Out", icon: faSignOut, link: "" },
];
const Hero = ({ title, subtitle }) => {
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  const toggleMenuIcon = () => {
    setShowMenuIcon(!showMenuIcon);
  };
  const nav = useNavigate();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleMenuItemClick = (label, link) => {
    if (link) {
      nav(link);
    }

    if (label === "Log Out") {
      nav("/", { replace: true });
      dispatch(clearAll());
      toast.success("You are signed out");
    }

    closeDrawer();
  };

  return (
    <>
      <div
        className="h-screen relative flex flex-col items-center"
        style={{ background: `url(${bg_1})`, backgroundSize: "cover" }}
      >
        <div className="relative hidden  w-full max-w-[1490px] md:flex items-center justify-between pt-6 mx-auto px-10">
          <h1 className="text-3xl font-bold">Uptown</h1>
          <ul className="md:flex items-center gap-10 ">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="text-black">
                  {item.label}
                </Link>
              </li>
            ))}
            {user === null && (
              <div className="flex">
                <Link to="/register">Sign In</Link>
              </div>
            )}
            {user !== null && (
              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="image"
                    className="cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </MenuHandler>
                <MenuList className="p-1">
                  {avatarMenu.map(({ label, icon, link }) => (
                    <MenuItem
                      key={label}
                      onClick={() => handleMenuItemClick(label, link)}
                      className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    >
                      <FontAwesomeIcon icon={icon} />
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={label === "Log Out" ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </ul>
        </div>

        <div className="bg-black md:hidden w-full max-w-[1490px] items-center p-2 pt-6 mx-auto px-10 text-white">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Uptown</h1>

            {showMenuIcon ? (
              <button onClick={toggleMenuIcon}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : (
              <button onClick={toggleMenuIcon}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </div>
          {showMenuIcon && (
            <div className="grid p-4 mt-4">
              {navbarItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-white p-2 hover:text-pink-500"
                  onClick={toggleMenuIcon}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center h-full mx-auto">
          <div className="block md:w-3/5 text-center">
            <FadeIn delay={0.2} direction="down">
              <h1 className="mt-[90px] text-center text-5xl leading-tight xs:text-[64px] max-w-[1050px]">
                {title}
              </h1>
            </FadeIn>
            {subtitle && (
              <FadeIn delay={0.4} direction="right">
                <p className=" ">{subtitle}</p>
              </FadeIn>
            )}
          </div>
          <div className="relative  md:w-[600px] mx-auto">
            <input
              type="search"
              className="block w-[400px]  md:w-[600px] p-4  text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50"
              placeholder="Search locations"
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 h-full text-white bg-blue-700 rounded-r-3xl border border-blue-700"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
