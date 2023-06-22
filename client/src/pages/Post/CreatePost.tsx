import React, { useEffect, useState } from 'react';
import QuillEditor from '../../components/Editor/QuillEditor';
import LineWaveLoader from '../../utils/Loaders';
import { useNavigate } from 'react-router-dom';
import { upload } from '../../utils/utils';
import { newRequest } from '../../utils/createRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../main';

const CreatePost: React.FC = () => {

    const navigate = useNavigate();
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileUrl, setFileUrl] = useState<string>("");
    const id = JSON.parse(localStorage.getItem("currentUser") || "")._id;

    const postArticle = async () => {
        if (!content || !title || !summary) return alert("please fill all the fields");
        if (file !== null) {
            const res = await upload(file);
            setFileUrl(res);
        }

        const newPost = { title, summary, content, cover: fileUrl, tags: [] }

        const res = await newRequest.post(`/api/post/new-post/${id}`, newPost);

        navigate("/")

    }

    useEffect(() => {
        setLoading(true);
        const checkUser = localStorage.getItem("currentUser");
        if (checkUser === null) return navigate("/");
        setLoading(false);
    }, [])

    return (
        <div>
            {loading ? <div className='w-[100vw] flex justify-center'><LineWaveLoader /></div> :
                <div className='w-[90vw] h-[90vh] m-auto mt-5 flex flex-col md:flex-row'>
                    <div className='flex flex-col gap-3 w-[100%] md:w-[20%] mx-auto'>
                        <div className='flex gap-5'>
                            <input placeholder='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                                className='bg-[#EAEAEA] w-[100%] md:w-[80%]'
                            />
                        </div>
                        <div className='flex gap-5'>
                            <textarea placeholder='description/summary' value={summary} onChange={(e) => setSummary(e.target.value)}
                                className='bg-[#EAEAEA] w-[100%] md:w-[80%]'
                            />
                        </div>
                        <div className='flex gap-5 w-[100%] mx-auto'>
                            <input type='file' onChange={(e) => {
                                if (e.target.files != null) setFile(e.target.files[0]);
                            }} />
                        </div>

                        <button className='hidden md:flex rounded-full bg-black flex items-center justify-center h-6 w-[80%] mx-0 mt-5' onClick={postArticle}>
                            <span className='text-white text-[.6rem] font-bold'>POST</span>
                        </button>
                    </div>
                    <div className='w-[100%] md:w-[80%] mt-5'><QuillEditor content={content} setContent={setContent} /></div>
                    <button className='flex md:hidden rounded-full bg-black flex items-center justify-center h-6 w-[100%] mx-0 mt-5' onClick={postArticle}>
                        <span className='text-white text-[.6rem] font-bold'>POST</span>
                    </button>
                </div>
            }
        </div>
    )
}

export default CreatePost