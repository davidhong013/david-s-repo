import axios from "axios";
import {useState} from "react";

export default function PhotosUploader({addedPhotos,myonChange}){
    const[photoLink,setphotoLink] = useState('');
    async function addPhotoByLink(event){
        event.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
        myonChange(prev => {
            return [...prev,filename];
        })
        setphotoLink('');
    }

    function uploadPhoto(event){
        const files = event.target.files;
        const data = new FormData();
        for(let i =0;i<files.length;++i){
            data.append('photos',files[i]);
        }

        axios.post('/upload-user-photo',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then(response => {
            const{data: filenames} = response;
            myonChange(prev => {
                return [...prev,...filenames];
            })
        })
    }

    return(
        <>
            <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={(event) =>{
                    setphotoLink(event.target.value);
                }} placeholder="Add using a link"/>
                <button onClick={addPhotoByLink} className="bg-gray-200 grow px-4 rounded-2xl">Add&nbsp; Photo</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(mypic => {
                    return (
                        <div className="h-32 flex" key={mypic}>
                            <img className="rounded-2xl w-full object-cover"
                                 src={"http://localhost:4000/upload/"+mypic}
                                 alt = ""/>
                        </div>
                    )
                })}
                <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-gray-500">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    Upload From Your device
                </label>
            </div>
        </>
    )
}