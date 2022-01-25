import React from 'react';

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg)'
                }}
            >
            </div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    A new day
                </p>
                <p className='journal__entry-content'>
                    It is a long established fact that a reader.
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>    
    );
};
