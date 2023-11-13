//Importamos los 3 paquetes que necesitamos
const cloudinary = require('cloudinary').v2; //verifica credenciales, paquete donde se envia la data imagen
const { CloudinaryStorage } = require('multer-storage-cloudinary'); //genera un bundle (bolsita) para trasmitir imagen y configs
const multer = require('multer'); //no tiene que ver directamente con cloudinary, sirve para poder trasmitir data mas compleja (archivos)
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png'],
    folder: 'SeaScape-pics-app' // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  }
});
 
//                     storage: storage
module.exports = multer({ storage });