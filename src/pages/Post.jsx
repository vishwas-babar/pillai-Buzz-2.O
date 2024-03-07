import { useParams } from "react-router-dom";
import { LikeCmtShrBkmr, PostReadComp } from "../components/index.js"
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorComp } from '../components/index.js'


function Post() {

    
    const { id: postId } = useParams();
    // const { data: post, isLoading, error } = useCustomQuery(`post/${postId}`);

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        ; (async () => {
            try {
                setError(false);
                setIsLoading(true);
                const response = await axios.get(`/api/post/${postId}`)

                if (response) {
                    console.log(response.data)
                    setPost(response.data);
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error)
                setError(true);
                setIsLoading(false);
            }
        })()

    }, [postId])

    if (error) {
        return (
            <div>
                <ErrorComp statusCode={500} />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className=" h-screen w-full flex items-center justify-center">
                <h1 className="text-3xl">Loading...</h1>
            </div>
        )
    }

    if (post) {
        
    }
    return (
        <>
            <PostReadComp author={post?.author} postContent={post?.postContent} />
            <LikeCmtShrBkmr postContent={post?.postContent} likesCount={post?.likesCount} />
        </>
    )
}


// this is custom query for fetching the api it gives the state of api request error/ loading/ data
export const useCustomQuery = async (pathUrl) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    ; (async () => {
        try {
            setError(false);
            setIsLoading(true);
            const response = await axios.get(pathUrl)

            if (response) {
                setData(response.data);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error)
            setError(true);
            setIsLoading(false);
        }
    })()

    return { data, isLoading, error }
}

export default Post;