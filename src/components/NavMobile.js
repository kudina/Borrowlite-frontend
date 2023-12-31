import React,{useState  } from 'react'
import { navigation } from "../data";
import {XIcon } from '@heroicons/react/outline'
import { MenuAlt3Icon } from '@heroicons/react/outline'

import Socials from './Socials'
import {motion} from 'framer-motion'
import { Outlet, Link } from "react-router-dom";







  


const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const circleVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 180,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 60,
       
      },
      }

    };

  const ulVariants = {
    hidden: {
      opacity: 0,
    
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
      }
    },  
  };

  return (
    <nav className='relative'>
      <div onClick={() => setIsOpen(true)} className='cursor-point text-primary'>
        <MenuAlt3Icon  className='h-8 w-8'/>
        </div>

        <motion.div variants={circleVariants} initial='hidden' animate={isOpen ? 'visible' : 'hidden'} 
        className='w-4 h-4 rounded-full bg-accent fixed top-0 right-0'>
          </motion.div>

          <motion.ul variants={ulVariants} initial='hidden'  animate={ isOpen ? 'visible' :  '' }
           className={`${isOpen ? 'right-0' : 'right-full'} fixed top-0 bottom-0 w-full flex flex-col justify-center items-center transition-all
           duration-300 overflow-hidden 
           `}>

            <div onClick={()=> setIsOpen(false)} className='cursor-pointer absolute top-8 right-8 text-white' >
              <XIcon className='h-8 w-8'/>
            </div>

            {
              navigation.map((item, index) => {
                return(
                  <li key={index} className='mb-8'>
              <Link
              onClick={()=>{setIsOpen(false)}}
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
                )
                
})
            }

             
          
          </motion.ul>
      </nav>
  )
}

export default NavMobile