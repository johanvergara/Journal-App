import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { firebase } from '../../firebase/firebaseConfig';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let  store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

    test('debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act( async () => {
            
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456789');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalledWith('LYhrZR738PNtkcNdmZ4MrEhQta23', null);

    });
});