import React from 'react'
import WomanImg from '../assets/img/bg.svg'

const Hero = () => {
  return (
    <section id='home' className='
    lg:h-[85vh] flex items-center bg-white lg:bg-cover lg:bg-center
    lg:bg-no-repeat py-32 lg:py-0 overflow-hidden'>
        <div className='container mx-auto h-full'> 
        <div className='flex items-center h-full pt-8'>
        
            <div className='flex-1 flex flex-col  lg:items-start '>
            <div className='lg:hidden mb-8'>
                <img src={WomanImg} alt=''/>
            </div>
                <p className='text-[30px] lg:text-[50px] font-light text-herotext mb-4'>Borrow light now 
                {/* <span>
                <span className='text-4xl lg:text-6xl font-light text-white mb-4'>later</span>
                </span> */}
                
                </p>
                <p className='text-4xl   font-body font-bold text-accent lg:text-7xl'>Payback later</p>
               
                {/* <span className='text-4xl lg:text-6xl font-light text-herotext mb-4 lg:mt-2 mt-5' >later</span> */}
                
                <p className='text-lg lg:text-1xl font-light herotext mt-4 mb-4 py-2 lg:py-3 flex  items-center lg:items-start text-start lg:text-start'>
                Currently out of power? without money? let us help you meet that target.. With borrowlite you can borrow electricity token now and pay later  
                </p>

                {/* <p className='text-lg lg:text-3xl font-light text-start  mb-4 py-2 lg:py-1'>Download our app to get started</p>
                <div className='flex space-x-4'>
                    <a href='/' className='bg-accent text-white px-6 py-3 rounded-[5px] lg:text-lg font-medium'>Google play store</a>
                    <a href='/' className='bg-transparent border-2 border-accent text-accent p-2 py-3 rounded-[5px] text-[14px] lg:text-lg font-medium'>Apple store</a>
                 
                    </div> */}
            </div>
            <div className='hidden lg:flex flex-1 justify-end items-center h-full'>
                <img src={WomanImg} alt=''/>
            </div>

        </div>
        </div>
    </section>
  )
}

export default Hero