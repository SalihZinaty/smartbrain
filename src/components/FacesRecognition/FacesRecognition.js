import React from 'react';
import FaceRecognition from '../FaceRecognition/FaceRecognition'
const FacesRecognition = ({imageURL,box}) =>{
        const Faces = box.map((element,i) => {
            return (
                <FaceRecognition
                    key={i}
                      box = {element} />
            )
            }
        )
    return (
        <div className=" ma center">
        <div className='absolute ma2'>
            <img 
                id="inputImage"
                alt= ''
                src={imageURL}
                width="500"
                height="auto" />
                {Faces}
            </div>
        </div>
    );
}

export default FacesRecognition;