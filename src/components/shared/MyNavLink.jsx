import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({to, children, className}) => {
    return (
        <div>
            <NavLink className={({isActive})=> 
                                    `flex flex-1 items-center gap-1 ${className}  ${isActive ? 'btn bg-green-700 text-white font-bold' : ''}`} to={to}>
                {children}
            </NavLink>
        </div>
    );
};

export default MyNavLink;