import React from 'react';
import notFoundimg from "../../assets/App-Error.png"
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <img src={notFoundimg} alt="Page Not Found" />
           <h1>Page Not Found</h1> 
              <p>The page you are looking for does not exist.</p>
              <p><Link className='btn btn-error' to="/">Go back to the home page</Link></p>
        </div>
    );
};

export default NotFoundPage;