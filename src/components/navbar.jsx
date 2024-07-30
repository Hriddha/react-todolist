import React from 'react'




const navbar = ({h1, h2}) => {
  return (
    <div className=' flex sm:justify-around items-center sm:flex-row  justify-center flex-col bg-sky-400 text-white sm:h-auto h-36 3xl:h-20'>
        <div className='font-extrabold sm:m-0 my-3 sm:text-base text-2xl 3xl:text-4xl'>myToDo</div>
        <ul className='flex sm:justify-center justify-around h-10 items-center sm:flex-row flex-col '>
            <li onClick={h2} className='sm:mx-8 3xl:text-2xl transition-all hover:font-bold cursor-pointer '>Home</li>
            <li onClick={h1} className='transition-all hover:font-bold cursor-pointer sm:m-0 m-1 3xl:text-2xl '>Your Completed Tasks</li>
        </ul>
    </div>
  )
}

export default navbar
