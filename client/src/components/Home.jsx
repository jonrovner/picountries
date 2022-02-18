import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const styles = {
        home: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",           
        },
        image: {
            width: "20vw",
            marginBottom: "1.5rem",
            marginTop: "1.5rem"
            
        },
       
        h2: {
            borderRadius: "1rem",
            padding: "10px 10px 10px 10px",
            textAlign: "center",
            backgroundColor: "mistyrose",
            boxShadow: "3.3px 6.6px 6.6px hsl(0deg 0% 0% / 0.40)",
            fontSize: "1rem",
            color: "blue",
            width: "5rem"
        }
    }


    return (
        <div style={styles.home}>
            <h1>COUNTRIES</h1>
            <h6>with activities</h6>
            <img src="./world.jpg" style={styles.image}  alt="background" />    
            <Link to='/countries' style={styles.button}>
              <h2 style={styles.h2}>lets go!</h2>   
            </Link>
        </div>
    );
}

export default Home;
