import React from 'react';

const Pagination = ({pages, handlePages, firstNine}) => {

    return (
        <div className="controls">
            <div className='pagination' onClick={()=>firstNine()}>0</div>
               {                                  
                pages && pages.length > 0 && pages.map( (page, index) => {
                    return(
                        <div className='pagination' 
                            key={index} 
                            onClick={()=>handlePages(page)}
                            >
                            {index+1}
                        </div>
                    )
                })                    
               }
            
        </div>
    );
}

export default Pagination;
