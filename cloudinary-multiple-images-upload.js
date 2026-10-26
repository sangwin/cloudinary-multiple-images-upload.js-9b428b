
/**
 * Created By : Sangwin Gawande (https://sangw.in)
 */
import React, { useState } from 'react';

export default function ImgUpload() {
    const [imageData, setImageData] = useState();
    const [imageArray, setImageArray] = useState([]);

    const CLOUD_NAME = 'cloud_name';
    const UPLOAD_PRESET = 'upload_preset';


    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageData(onLoadEvent.target.result);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            const data = await fetch('https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/image/upload', {
                method: 'POST',
                body: formData
            }).then(r => r.json());
            setImageArray(prevState => {
                return [...prevState, data]
            });
        }
    }

    return (
        <div >
            <main>
                <h3>Upload multiple images to your image to Cloudinary</h3>
                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <input type="file" name="file" multiple/>
                    <hr />
                    <ul>
                        {(imageArray.length > 0) && imageArray.map(a => <li key={a.asset_id}><img width={40} src={a.secure_url} /> {a.secure_url} </li>)}
                    </ul>
                    <hr />
                    {imageData && <button>Upload Files</button>}
                </form>
            </main>
        </div>
    )
}
/**
 * Created By : Sangwin Gawande (https://sangw.in)
 */