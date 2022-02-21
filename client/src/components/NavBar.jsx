import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFilters, getActivities, getCountries } from '../actions';

const Navbar = () => {
    const dispatch = useDispatch()
    return (
        <div className='navBar'>
            <Link to='/countries'>            
                <button onClick={()=>{
                    dispatch(getCountries())
                    dispatch(clearFilters())
                    dispatch(getActivities())}}>Browse</button>            
            </Link>
            <Link to='/create'>            
                <button>New Activity</button>            
            </Link>            
        </div>
    );
}

export default Navbar;
