// import React, {useEffect, useState, useRef} from 'react'
// import axios from 'axios';

const ImageInput = ({onChangeImage}) => {
    // const [image, setImage] = useState('');
    // useEffect(() => {
    //     console.log('ImageInput')
    // }, []);
    const onChangeImageValue = (e) => {
        let newImage = e?.target?.files[0];
        console.log('newImage------',newImage)
        onChangeImage(newImage);
    }
    return(
        <div>
            <input 
                type="file"
                id="imaget" 
                name="imaget"
                onChange={onChangeImageValue}/>
        </div>
    )
}

export default ImageInput;
