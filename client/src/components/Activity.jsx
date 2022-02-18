import React from 'react';

const Activity = ({activity}) => {
    return (
        <div className='activityCard'>
            <h3>{activity.name}</h3>
            <p>season: {activity.season}</p>
            <p>duration: {activity.duration}</p>
            <p>difficulty: {activity.difficulty}</p>
            
        </div>
    );
}

export default Activity;
