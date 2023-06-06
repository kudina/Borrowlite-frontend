import React from 'react'
import { brands } from '../data'

const Brands = () => {
  return (
    <section className='min-h-[146px] flex items-center '>
        <div className='container mx-auto flex md:justify-between items-center flex-wrap justify-evenly' >
            {
                brands.map((brand, index) =>{
                    return(
                        <div>
                            <img src={brand.img} alt={brand.name} className='h-12 py-2 lg:py-0'/>
                        </div>
                    )
                })
            }

        </div>
        </section>
  )
}

export default Brands