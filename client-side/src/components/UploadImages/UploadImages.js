import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';

const UploadImages = () => {
    const [image, setImage] = useState('');
    const fileInput = useRef(null);
    useEffect(() => {
        console.log('compodidmount')
    }, []);
    const submitImage = (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",image);
        console.log('formdata' , formData)
        axios.post('http://localhost:5000/file/upload', formData, {
            headers: {
                "content-type": "application/json"
              }
        }).then( ac => {
            console.log('acccc', ac)
        }).catch(err => {
            console.log('error', err)
        })
        // prompt('hello', e)
    }
    const onChangeImage = (e) => {
        // let { current} = fileInput;
        let newImage = e?.target?.files[0];
        console.log(newImage,'file-----')
        setImage(newImage)
    }
    console.log('Upload images is rendered 1');
    return(
        <div>
            <form onSubmit={submitImage}>
                {/* <label htmlFor="imaget">Image:</label> */}
                <input 
                type="file" 
                ref={fileInput}
                id="imaget" 
                name="imaget"
                onChange={onChangeImage}/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default UploadImages;
