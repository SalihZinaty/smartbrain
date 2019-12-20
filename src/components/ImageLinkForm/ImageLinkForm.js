import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {//destructuring the onInputChange from props
    return (
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your picture, Try it! '}
            </p>
            <div className=' bgForm center pa4 br3 shadow-5 w-70'>
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                <button onClick={onButtonSubmit}  className="w-30 grow pointer f4 link ph3 pv2 dib white bg-light-purple">Detect!</button>
            </div>

        </div>
    )
}

export default ImageLinkForm;