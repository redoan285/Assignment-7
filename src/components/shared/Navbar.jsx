import React, { useState } from 'react';
import { CiClock2, CiMenuBurger } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
import { RiHome4Line } from 'react-icons/ri';
import MyNavLink from './MyNavLink';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavItems = [
        { path: '/', name: 'Home', icon: <RiHome4Line /> },
        { path: '/timeline', name: 'Timeline', icon: <CiClock2 /> },
        { path: '/stats', name: 'Stats', icon: <ImStatsDots /> }
    ];

    return (
        <nav className='relative flex items-center justify-between p-4 bg-white container mx-auto shadow-md'>
            
            {/* Logo */}
            <h1 className='font-bold text-2xl'>
                Keen<span className='text-green-700'>Keeper</span>
            </h1>

            {/* Desktop Menu */}
            <ul className='hidden md:flex items-center gap-4 text-xl font-bold p-4'>
                {NavItems.map((item) => (
                    <li key={item.path}>
                        <MyNavLink className="text-lg font-bold" to={item.path}>
                            {item.icon} {item.name}
                        </MyNavLink>
                    </li>
                ))}
            </ul>

            {/* Hamburger Button */}
            <button
                className='md:hidden text-2xl p-2'
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
                {isMobileMenuOpen ? <IoClose /> : <CiMenuBurger />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50'>
                    <ul className='flex flex-col items-center gap-4 text-xl font-bold p-4'>
                        {NavItems.map((item) => (
                            <li key={item.path} className='w-full text-center'>
                                <MyNavLink
                                    className="text-lg font-bold block py-2"
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.icon} {item.name}
                                </MyNavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;