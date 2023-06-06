import React from "react";
import { navigation } from "../data";
import { Outlet, Link } from "react-router-dom";

const Nav = () => {

  



  return (
    <nav>
      <ul className="flex space-x-8 capitalize text-[15px]">
        {navigation.map((item, index) => (
          <li
            key={index}
            className="text-primary hover:text-accent cursor-pointer  hover:transition-all duration-300 hover:scale-110"
          >
            <Link
             
              to={item.href}
              activeClass="active"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className='transition-all
               duration-300' 
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
