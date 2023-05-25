import React from 'react'
import { useState ,useRef} from 'react'



const  Model=({setModelOpen,setSetectedImage,setectedImage,generaterVariations})=> {


console.log('setectedImage',setectedImage)



    const [error,setError]=useState(null)
    const ref=useRef(null)




const closeModel=()=>
{
    setModelOpen(false);
    setSetectedImage(null)

}

const checkSize=()=>
{
 if(ref.current.width===256 && ref.current.height===256 )
 {
    
    generaterVariations();

 }
 else{
    setError('Error : choose 256x256 image');

 }
}
  return (
    <div className='modal'>  
    
       <div onClick={closeModel}>✘</div>
       <div className='img-container'>

        { setectedImage && <img ref={ref}  src={URL.createObjectURL(setectedImage)}   alt='uploaded image'/>}
       </div>

<p > {error || "*  Image must be 256x256"} </p>

    {  !error && 
     <button onClick={checkSize}>Generate</button>}
    {/* // <button onClick={() => generaterVariations()}>Generate</button> */}

     {error && <button onClick={closeModel}> Close This and try again</button>}

    </div>

      
    
  )
}
export default Model;
