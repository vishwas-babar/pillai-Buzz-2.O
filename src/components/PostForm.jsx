import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, InputGroup, MaskedInput, Uploader } from 'rsuite';
import postService from '../services/PostService.js'
import TmceEditor from './TmceEditor';
import Button from './Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.title || "",
        }
    })

    const [image, setImage] = useState("")
    const [imageBlob, setImageBlob] = useState("")
    const navigate = useNavigate();

    const submit = async (data) => {
    
        try {
            const res = await postService.createNewPost(data)
            console.log(res)
            if (res) {
                navigate(`/post/${res.postId}`)
            }
        } catch (error) {
            
        }
        
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
        if (e.target.files[0]) {
            const blobUrl = URL.createObjectURL(e.target.files[0]);
            setImageBlob(blobUrl);
        }
    }

    return (
        <div className='w-full '>
            <form className='flex flex-nowrap justify-around' onSubmit={handleSubmit(submit)}>
                <div className='w-[50%]'>
                    <Controller
                        name='content'
                        control={control}
                        defaultValue={post?.content || ""}
                        render={({ field }) => (
                            <TmceEditor
                                className="w-full"
                                value={field.value}
                                onEditorChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div className='w-[30%] overflow-hidden'>
                    <label htmlFor="title">title:</label>
                    <Input {...register("title", { required: true })} id="title" as="textarea" className="w-full" rows={3} placeholder="add your title here" />

                    <div className='w-full mt-4'>

                        <label htmlFor="coverImage">coverImage: </label>
                        <div className="aspect-video border border-spacing-1 overflow-hidden flex justify-center items-center">
                            <img id="coverImage" className="object-contain max-w-full max-h-full" src={imageBlob} alt="" />
                        </div>
                        <input {...register("coverImage", { required: true })} name='coverImage' onChange={handleImageChange} type="file" />
                    </div>

                    <div className='w-full display flex justify-end'>
                        {/* <Button className='mt-4 ' type="submit" children="Create Post" /> */}
                        <button type='submit'>submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm