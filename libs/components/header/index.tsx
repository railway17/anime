import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'
import { PageType } from '../../types/data-type'
import Modal from '../modal'

export function Header() {

    const [isOpen, setIsOpen] = useState(false)
    
    const onClick = () => {
        setIsOpen(true)
    }

    return (
        <div className="flex justify-between items-center space-x-10 p-4">
            <Link href={PageType.Home}>
                <a className="basis-1/5 font-bold text-2xl">Anime</a>
            </Link>
            <div className="w-full relative">
                <button className="w-full h-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-300 font-bold py-2 px-10 rounded-3xl text-left" onClick={onClick}>Search ...</button>            
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div className="basis-2/5">
                <span className='sm:hidden whitespace-nowrap'>Today is the {moment().format("Do of MMMM")}</span>
                <span className='md:hidden whitespace-nowrap'>{moment().format("MMM Do")}</span>
            </div>

            <Modal open={isOpen} onClose={()=> setIsOpen(false)}/>
        </div>
    )
}
