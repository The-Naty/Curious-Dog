import React from "react";
import HeaderItem from "./HeaderItem";
import { BiWorld } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { MdFeed } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-zinc-200 h-18 lg:px-16">
      <div className="flex justify-between lg:px-16 lg:mx-16 mx-10">
        <h1 className="text-5xl mt-3 mb-2">CuriousDog</h1>

        <nav>
          <label
            htmlFor="collpase-btn-check"
            className="collpase-btn mt-6 mb-2"
          >
            <FaBars style={{ fontSize: "2.2rem" }} />
          </label>
          <input type="checkbox" id="collpase-btn-check" />
          <ul className="header md:flex justify-center md:space-x-11">
            <HeaderItem
              IconComp={<MdFeed style={{ fontSize: "2rem" }} />}
              text="Feed"
              active={true}
            />
            <HeaderItem
              IconComp={<BiWorld style={{ fontSize: "2rem" }} />}
              text="Explore"
            />
            <HeaderItem
              IconComp={<VscAccount style={{ fontSize: "2rem" }} />}
              text="Account"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
