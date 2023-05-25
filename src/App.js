import React from 'react'
import { useState, useRef } from 'react'
import Model from './components/Model'


export default function App() {

  const [images, setImages] = useState(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [setectedImage, setSetectedImage] = useState(null)

  const [modelOpen, setModelOpen] = useState(false)


  const surpriseOptions = [

    "A blue ostirich eating melon",
    "A matisee style shark",
    "A girls watching boy"
  ]

  const inputRef = useRef(null);
  const surpriseMe = () => {
    setImages(null);
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    // alert("click")

    console.log(randomValue)
    getImages();
    setValue(randomValue)
    inputRef.current.value = randomValue;
  }
  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError('Error ! Must have a search term')
      return
    }
    try {


      const options = {
        method: 'POST',
        body: JSON.stringify({

          message: value
        }),
        headers: {

          "Content-type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/images', options)
      const data = await response.json();
      console.log(data);
      setImages(data);



    }
    catch (error) {

      console.log(error)

    }
  }

  console.log(value)
  const uploadImage = async (e) => {
    console.log(e.target.files)


    const formData = new FormData()
    {
      formData.append('file', e.target.files[0])
      setModelOpen(true);
      setSetectedImage(e.target.files[0])
      e.target.value=null

      try {
        const options = {
          method: 'POST',
          body: formData
        }

        const response = await fetch('http://localhost:8000/upload', options)
        const data = await response.json();
        console.log(data)

      } catch (error) {

        console.error(error)
      }
    }
  }


  const generaterVariations= async()=>
  {
    setImages(null)
    if(setectedImage===null)
    {
setError('Error! MUST have a exisiting image')
setModelOpen(false)
return
    }
    try {
      
const options={
  method: "POST"
}
      const response =await fetch('http://localhost:8000/variations',options) 
      const data=await response.json();
      console.log(data)

      setImages(data);
      setError(null)
      setModelOpen(false)

    } catch (error) {
      console.error(error)

    }
  }
  return (
    <div className='app'>


      <section className='search-section'>

        <p  > Start with a detailted description  <span className='surprise' onClick={surpriseMe}>Surprise me </span></p>

        <div className='input-container'>


          {/* <input placeholder='An impressionist oil painting of a sunflower in a  purple vase...'
      
      onChange={e=>setValue(e.target.value) }/> */}
          <input
            ref={inputRef}
            placeholder='An impressionist oil painting of a sunflower in a purple vase...'
            onChange={e => setValue(e.target.value)}
          />


          <button onClick={getImages}> Generate</button>

        </div>
        <p className='extra-info'>Or,

          <span>
            <label htmlFor='files'> upload an <em> image</em> </label>
            <input onChange={uploadImage} id='files' accept='image/*' type='file' hidden />

          </span>
          to edit
        </p>

        {error && <p>{error}</p>}


        
    { modelOpen &&
       <div className='overlay'>
       <Model  setModelOpen={setModelOpen} setSetectedImage={setSetectedImage} setectedImage={setectedImage}  generaterVariations={generaterVariations}/>

       </div>
       }


      </section>
      <section className='image-section'>

        {images?.map((image, _index) => (
          <img key={_index} src={image.url} alt={`Generated img of ${value}`} />
        ))}
      </section>


    </div>
  )
}












