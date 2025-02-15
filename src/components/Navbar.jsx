import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { styles } from "../styles";

import { navLinks } from "../constants/index";
import {  menu, close ,mohsin } from "../assets";


const Navbar = () => {

  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)


  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>

        <Link to="/" className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >

          <img src={mohsin} alt="logo" className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>Mohsin Mustafa&nbsp;
            <span className='sm:block hidden'>| MERN Developer</span>
          </p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {
            navLinks.map((link) => {
              return (
                <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => {
                    setActive(link.title)
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              )
            })
          }
        </ul>
        {/* <p className='text-red-500'>Moshn</p> */}

        {/* Mobile Nav */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          {/* <img src={menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' */}
          {/* now add toggle condition */}
          {/* if we click toggle then show menu otherwise show close is condition me menu pehle aye ga or close baad me */}
          {/* other condition if toggle currently open then close it is condition me close pehle aye ga or menu baad me */}
          <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          // is equal to not toggle 
          />


          {/* !toggle is ka matlab if it is not toggle then show hidden else show flex /flex ka mtlb show ho   */}
          <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none  flex justify-end items-start flex-col gap-4'>
              {
                navLinks.map((link) => {
                  return (
                    // ab agr mene click navbar me home pe click krne se toggle ko auto hide krwana hai to ye kren
                    <li key={link.id} className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-red-500 text-[16px] font-medium font-poppins cursor-pointer`}
                      onClick={() => {
                        // ab agr mene click navbar me home pe click krne se toggle ko auto hide krwana hai to ye kren
                        setActive(link.title);
                        setToggle(!toggle);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar