import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({box}) =>{
    return (
     <div className="bounding-box" 
         style={{top:box.topRow,right:box.rightCol,left:box.leftCol,bottom:box.bottomRow}}>
    </div>
    )
}

export default FaceRecognition;