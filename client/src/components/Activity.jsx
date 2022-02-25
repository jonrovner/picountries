import React from 'react';

const Activity = ({activity}) => {
    return (
        <div className='activityCard'>
            <h3>{activity.name}</h3>
            <p>Season: {activity.season}</p>
            <p>Duration: {activity.duration}</p>
            <p>Difficulty: {activity.difficulty}</p>
            
        </div>
    );
}

export default Activity;
