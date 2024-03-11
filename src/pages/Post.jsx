import { useNavigate, useParams } from "react-router-dom";
import { LikeCmtShrBkmr, PostReadComp } from "../components/index.js"
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorComp } from '../components/index.js'
import { Button } from "../components/index.js";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import postService from "../services/PostService.js";



function Post() {


    const { id: postId } = useParams();

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const [likesCount, setLikesCount] = useState(10);

    // useEffect(() => {

    //     ; (async () => {
    //         try {
    //             setError(false);
    //             setIsLoading(true);
    //             const response = await axios.get(`/api/post/${postId}`)

    //             if (response) {
    //                 console.log(response.data)
    //                 setPost(response.data);
    //                 setIsLoading(false);
    //             }

    //         } catch (error) {
    //             console.log(error)
    //             setError(true);
    //             setIsLoading(false);
    //         }
    //     })()

    // }, [postId])


   
    const { isError, error, data: post, isLoading } = useQuery({
        queryKey: ["post"],
        queryFn: () => postService.getSinglePost(postId)
            .then(res => {
                setLikesCount(res.likesCount)
                return res;
            })
            .catch(error => {
                throw error;
            })
    });

    const likePost = () => {
        setLikesCount(prev => prev + 1);
        postService.likeThePost(postId)
            .then(res => {
                // setLikesCount(prev => prev - 1);
            })
            .catch(error => {
                console.log("error when liking the post: ", error)
                setLikesCount(prev => prev - 1);
            })
    }

    if (isError) {
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

    return (
        <>
            {(userData?._id === post?.author?._id) ? <Button
                className="absolute mt-4 rounded-md right-6"
                children="Edit"
                onClick={() => navigate(`/edit-post/${postId}`)}
            /> : null}
            <PostReadComp author={post?.author} postContent={post?.postContent} />
            <LikeCmtShrBkmr postContent={post?.postContent} likesCount={likesCount} likePost={likePost} />
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