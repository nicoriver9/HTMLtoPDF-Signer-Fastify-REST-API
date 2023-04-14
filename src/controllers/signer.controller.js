import SignPDF from "../utils/SignPDF.js";
import fs from "node:fs";
import path from "node:path";

let bufferIndexHtml;

export const PDFsigner = async() =>{    
    const pdfBuffer = new SignPDF(
    path.resolve('./exports/exported_file.pdf'),
    path.resolve(`./src/keys/localhost.p12`)
    );

    const signedDocs = await pdfBuffer.signPDF();    
    const pdfName = `./exports/exported_file.pdf`;

    fs.writeFileSync(pdfName, signedDocs);
    bufferIndexHtml = fs.readFileSync(pdfName);
    console.log(`New Signed PDF created called: ${pdfName}`);    
};


export const uploader = async (request, reply) => { 
    try {
        
        const {data} = request.body;

        //Use the next method to receive with form data of client app (like postman) 
        //const data = await request.file();                
        //fs.writeFile('./uploads/uploaded.pdf', await data.toBuffer(), 'base64', async (error) => {

        fs.writeFile('./uploads/uploaded.pdf', data, 'base64', async (error) => {
            if (error) {
                throw error;
            } 
            await PDFsigner();
            console.log('file successfully uploaded and signed');  
             
            
        });
        
        
    } catch (error) {
        console.error(error);
    }
    
  }

