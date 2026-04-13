import React from 'react';
import { CiClock2 } from 'react-icons/ci';
import { ImStatsDots } from 'react-icons/im';
import { RiHome4Line } from 'react-icons/ri';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <nav className='flex items-center bg-white justify-between p-4 container mx-auto shadow-md'>
                <h1 className='font-bold text-2xl'>Keen<span className='text-green-800 text-2xl font-bold'>Keeper</span></h1>
                <ul className='flex items-center gap-4 text-xl font-bold  p-4'>
                    <li><NavLink className={({isActive})=> 
                        `flex flex-1 items-center gap-1   ${isActive ? 'btn bg-green-700 text-white font-bold' : ''}`} to="/"><RiHome4Line />Home</NavLink></li>
                    <li><NavLink className={({isActive})=> 
                        `flex flex-1 items-center gap-1   ${isActive ? 'btn bg-green-700 text-white font-bold' : ''}`} to='/timeline'><CiClock2 />  Timeline</NavLink></li>
                    <li><NavLink className={({isActive})=> 
                        `flex flex-1 items-center gap-1   ${isActive ? 'btn bg-green-700 text-white font-bold' : ''}`} to="/stats"><ImStatsDots />Stats</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;