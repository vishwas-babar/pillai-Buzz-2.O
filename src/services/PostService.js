import axios from "axios";


class PostService{


    // add your all fetching methods here for
    getPostForHomePage = async (page, postsPerPage=5) => {
        try {
            const response = await axios.get(`api/post/load?page=${page}&postsPerPage=${postsPerPage}`)
            if (response) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    getSinglePost = async (postId) => {
        try {
            const response = await axios.get(`/api/post/${postId}`)
            if (response) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    getUserPosts = async (user_id) => {
        try {
            const res = await axios.get(`/api/post/userposts/${user_id}`)
            if (res) {
                return res;
            }
        } catch (error) {
            throw error
        }
    }

    createNewPost = async ({ title, content, coverImage }) => {

        const formData = new FormData();
        console.log("the image is : ", coverImage[0])
        formData.append('title', title)
        formData.append('content', content)
        formData.append('coverImage', coverImage[0])

        try {
            const res = await axios.post('/api/post/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (res) {
                console.log("post is created")
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    }

    // uploadFileToCloudinary = async (coverImage) => {
    //     console.log(coverImage)
    //     const res = await axios.post('/api/images/add')
    // }
}

const postService = new PostService();
export default postService;