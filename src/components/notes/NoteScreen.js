import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return( 
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>
                <input 
                    type='text'
                    placeholder='Somo awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                />
                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                ></textarea>
                <div className='notes__image'>
                    <img 
                        src='https://images.ctfassets.net/hrltx12pl8hq/66lRNN2kfHcVSUMrmrcKxf/76b78071032586ff9766d8eb51592f21/free-nature-images.jpg?fit=fill&w=840&h=350'
                        alt='imagen'
                    />
                </div>
            </div>
        </div>
    )
};
