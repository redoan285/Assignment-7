import React from 'react';
import { CiClock2 } from 'react-icons/ci';
import { ImStatsDots } from 'react-icons/im';
import { RiHome4Line } from 'react-icons/ri';
import { Link, NavLink } from 'react-router';
import MyNavLink from './MyNavLink';

const Navbar = () => {

    const NavItems = [
        {
            path: '/',
            name: 'Home',
            icon: <RiHome4Line />
        },
        {
            path: '/timeline',
            name: 'Timeline',
            icon: <CiClock2 />
        },
        {
            path: '/stats',
            name: 'Stats',
            icon: <ImStatsDots />

        }
    ]
    
    return (
        <div>
            <nav className='flex items-center bg-white justify-between p-4 container mx-auto shadow-md'>
                <h1 className='font-bold text-2xl'>Keen<span className='text-green-700 text-2xl font-bold'>Keeper</span></h1>
                <ul className='flex items-center gap-4 text-xl font-bold  p-4'>
                    {NavItems.map((item) => (
                        <li key={item.path}>
                            <MyNavLink className="text-lg font-bold" to={item.path}>
                                {item.icon} {item.name}
                            </MyNavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;