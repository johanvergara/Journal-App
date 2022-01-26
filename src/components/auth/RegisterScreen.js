import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValue, handleInputChange] = useForm({
        name: 'Steven',
        last: 'Morales',
        email: 'correo@correo.com',
        password: '123456',
        password2: '123456'
    });

    const {name, last, email, password, password2} = formValue;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if(isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {

        if (validator.isEmpty(name)) {
            dispatch(setError('Invalid name'))
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('Invalid email'))
            return false;
        } else if ((!validator.equals(password, password2)) || (validator.isStrongPassword(password, { minLenght: 5 }))) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth_title'>Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    placeholder='Last name'
                    name='last'
                    className='auth__input'
                    autoComplete='off'
                    value={last}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder='Confirm Password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className='link'
                >
                    Already registerd?
                </Link>
            </form>   
        </>
    )
};
