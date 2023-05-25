// npm i express cors openai fs multer nodemon dotenv
// npm run start:frontend 
// npm run start:backend 

const PORT = 8000;

const express = require('express');
const cors = require('cors');
//npm i express cors dotenv openai fs multer
// cors is gong to help us with error messafes that we get from cause
// npm openai(help us in communicated better with opnai)
// npm fs and multer  which help us deal with actually into our project . 

const fs=require('fs')
const multer=require('multer')



const app = express();
app.use(cors());

app.use(express.json())   // send stuff from the fontend to backend,specfically json 


require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});






const openai = new OpenAIApi(configuration);


const storage=multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null,'public')

    },
    filename:(req,file,cb)=>
    {
        console.log('file',file)

        cb(null,Date.now()+ "-" + file.originalname)
    }
})

const upload=multer({storage :storage}).single('file')



let filePath

// npm i buffer path-browserify stream-browserify util browserify-zlib
// npm i path-browserify stream-http
// npm i path-browserify stream-http

app.post('/images', async (req, res) => {

    try {
        const response = await openai.createImage({
            prompt: req.body.message,
            n: 5,
            size: "1024x1024",
        });
        console.log(response.data.data)
        res.send(response.data.data)
    }
    catch (error) {
        console.error(error)
    }

})

app.post('/upload',(req,res)=>
{
   upload(req,res,(err)=>
   {
    if(err instanceof multer.MulterError)
    {
        return res.status(500).json(err)
    }
    else if(err){
        return res.status(500).json(err)

    }
    console.log(req.file.path)
    filePath=req.file.path;

   })
})


app.post('/variations',async(req,res)=>{


try {

    
const response = await openai.createImageVariation(
  fs.createReadStream(filePath),
  5,
  "1024x1024"
)
    res.send(response.data.data);


} catch (error) {
    console.error(error)

}

})
app.listen(PORT, () => {
    console.log(`server is runnnig in ${PORT}`);


})

