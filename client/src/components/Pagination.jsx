import React from 'react';

const Pagination = ({pages, handlePagesIndex, firstNine, nextPage}) => {
console.log('pages in pagination', pages)
    return (

        <div className="controls">
        <div className='pagination' onClick={()=>{}}>≪</div>
        
        <div className='pagination' onClick={firstNine}>0</div>
               {                                  
                pages && pages.length > 0 && pages.map( (pageIndex, index) => {
                    return(
                        <div className='pagination' 
                            key={index} 
                            onClick={()=>handlePagesIndex(pageIndex)}
                            >
                            {index+1}
                        </div>
                    )
                })                    
               }

        <div className='pagination' onClick={()=>{nextPage()}}>≫</div>    
        </div>
    );
}

export default Pagination;
