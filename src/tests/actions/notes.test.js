/**
 * @jest-environment node
 */
import { deleteDoc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { db, doc } from '../../firebase/firebaseConfig';
// import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock("../../helpers/fileUpload", () => {
    return {
      fileUpload: () => {
        return Promise.resolve('https://Cualquierlinlk/cualquierimagen.jpg');
      },
    };
});
   
global.scrollTo = jest.fn();
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'Testing'
    },
    notes: {
        active: {
            id: 'acnNyzDdUVKe6rQl7gZT',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let  store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });

    test('debe de crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        // console.log(actions)

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        const noteRef = doc(db, `/Testing/journal/notes/${docId}`);
        await deleteDoc(noteRef);
    });

    test('debe de cargar las notas startLoadingNotes', async () => {
        
        await store.dispatch( startLoadingNotes('Testing') );
        
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('debe de actualizar la nota startSaveNote', async () => {

        const note = {
            id: 'acnNyzDdUVKe6rQl7gZT',
            title: 'Title',
            body: 'Body'
        }

        await store.dispatch(startSaveNote(note));
        
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = doc(db, `/Testing/journal/notes/${note.id}`);
        const docSnap = await getDoc(docRef);

        expect(docSnap.data().title).toBe(note.title);
    });
    
    test('debe de actualizar el url del entry startUploading', async () => { 
        
        const file = [];
        await store.dispatch( startUploading(file) );

        const docRef = doc(db, `/Testing/journal/notes/acnNyzDdUVKe6rQl7gZT`);
        const docSnap = await getDoc(docRef);

        expect(docSnap.data().url).toBe('https://Cualquierlinlk/cualquierimagen.jpg');

    })
    
});
