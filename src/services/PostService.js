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
}

const postService = new PostService();
export default postService;