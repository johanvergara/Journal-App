import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        if(note.id !== activeId.current ) {
            reset(note);
            activeId.current = note.id
        }
    }, [note, reset]);
    

    return( 
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>
                <input 
                    type='text'
                    placeholder='Somo awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {
                    (note.url)
                    && (
                        <div className='notes__image'>
                            <img 
                                src='https://images.ctfassets.net/hrltx12pl8hq/66lRNN2kfHcVSUMrmrcKxf/76b78071032586ff9766d8eb51592f21/free-nature-images.jpg?fit=fill&w=840&h=350'
                                alt='imagen'
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
};
