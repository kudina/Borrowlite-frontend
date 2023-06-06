import React,{useEffect} from 'react'
import Logo from '../assets/img/logo.png'
import Nav from './Nav'
import NavMobile from './NavMobile'
import Socials from './Socials'

const Header = () => {
  const [bg, setBg] = React.useState('false')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setBg(true)
      } else {
        setBg(false)
      }
    })
  })
  return ( 
  <header className={`${
    bg ? 'bg-white h-20' : 'h-24 bg-transparent'}
    flex  items-center fixed top-0 w-full text-white z-10 transition-all duration-300 
    
    `}>
           <div className='container mx-auto h-full flex items-center justify-between'>
            <a href='/' className='flex items-center'>
              <img src={Logo} alt='logo' className='h-12'/>
            </a>
            <div className='hidden lg:block '>
              <Nav/>
            </div>
            <div className='hidden lg:block'>
              <Socials/>
            </div>
            <div className='lg:hidden'>
              <NavMobile/>
            </div>
           

            </div>
  </header> 
  );  
}

export default Header