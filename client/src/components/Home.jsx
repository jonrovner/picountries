import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className='home'>
            <div className='homeTitle'>

            
            <h1>COUNTRIES</h1>
            <h3>with activities</h3>
            
            <Link className='homeButton' to='/countries' >
              <h2 >lets go!</h2>   
            </Link>

            </div>
        </div>
    );
}

export default Home;
