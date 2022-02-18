import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navBar'>
            <Link to='/countries'>            
                <button>Browse</button>            
            </Link>
            <Link to='/create'>            
                <button>New Activity</button>            
            </Link>            
        </div>
    );
}

export default Navbar;
