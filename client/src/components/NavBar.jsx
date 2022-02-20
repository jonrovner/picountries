import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCountries } from '../actions';

const Navbar = () => {
    const dispatch = useDispatch()
    return (
        <div className='navBar'>
            <Link to='/countries'>            
                <button onClick={()=>dispatch(getCountries())}>Browse</button>            
            </Link>
            <Link to='/create'>            
                <button>New Activity</button>            
            </Link>            
        </div>
    );
}

export default Navbar;
