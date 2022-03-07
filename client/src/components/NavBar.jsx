import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFilters, getActivities, getCountries } from '../actions';

const Navbar = () => {
    const dispatch = useDispatch()
    return (
        <div className='navBar'>
            <Link to='/'>
                <div className='logo'></div>
            </Link>
            <div>

            <Link to='/countries'>            
                <button className='myButton' onClick={()=>{
                    dispatch(getCountries())
                    dispatch(clearFilters())
                    dispatch(getActivities())}}>Browse</button>            
            </Link>
            <Link to='/create'>            
                <button className='myButton'>New Activity</button>            
            </Link>            

            </div>

        </div>
    );
}

export default Navbar;
