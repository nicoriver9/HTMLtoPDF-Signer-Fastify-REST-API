import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { uploader} from "../controllers/signer.controller.js";

export const routes = [
    {
        method: 'GET',
        url: '/',
        handler: (request, reply) =>{      
            reply.type('text/html').sendFile('index.html'); 
        },
    },

    {
        method: 'POST',
        url: '/uploader',        
        handler: async (request, reply) =>{         
            
            await uploader(request, reply);
            reply.send({ response: 'File successfully uploaded and signed' });
            // const __dirname =  dirname(fileURLToPath(import.meta.url));                    
            // const stream = fs.createReadStream(__dirname.replace('\\src\\routes','') + '/uploads/uploaded.pdf');
            
            // reply.raw.writeHead(200,{'Content-Type': 'application/pdf',});

            // stream.on('data', (chunk) => {
            //     reply.raw.write(chunk);
            //   });
            
            // stream.on('end', () => {
            //     reply.raw.end();
            //   });    
        }        
    },
    {
        method: 'GET',
        url: '/filesigned',
        handler: (request, reply) =>{
            const __dirname =  dirname(fileURLToPath(import.meta.url));            
            const stream = fs.createReadStream(__dirname.replace('\\src\\routes','') + '/uploads/uploaded.pdf');
            reply.header('Content-Type', 'application/pdf');
            reply.send(stream).type('application/pdf').code(200);            
        },
    }


]

    
