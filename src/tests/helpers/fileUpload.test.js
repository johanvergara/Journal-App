import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'johanvergara', 
    api_key: '252468193474659', 
    api_secret: 't--6uKSDmM0j3JPQOFdwDi3bbFE',
    // secure: true
});

describe('Pruebas en <fileUpload />', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1].replace('.png','');

        cloudinary.v2.api.delete_resources(imageId, {}, ()=> {
            // done
        });
    });

    test('debe de retornar un error', async () => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect(url).toBe(null);
    });
    
});