import axios from "axios";

class PostService {
  // add your all fetching methods here for
  getPostForHomePage = async (page, postsPerPage = 5) => {
    try {
      const response = await axios.get(
        `api/post/load?page=${page}&postsPerPage=${postsPerPage}`,
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  getSinglePost = async (postId) => {
    try {
      console.log("getting the single post");
      const response = await axios.get(`/api/post/${postId}`);
      console.log(response.data);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("response data is undefined");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserPosts = async (user_id) => {
    try {
      const res = await axios.get(`/api/post/userposts/${user_id}`);
      if (res) {
        return res;
      }
    } catch (error) {
      throw error;
    }
  };

  createNewPost = async ({ title, content, coverImage }) => {
    const formData = new FormData();
    console.log("the image is : ", coverImage[0]);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage[0]);

    try {
      const res = await axios.post("/api/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        console.log("post is created");
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  };

  updateThePost = async (id, { title, content, coverImage }) => {
    console.log("updating the post...");
    console.log(content, coverImage);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage[0] || coverImage);

    try {
      const res = await axios.post(`/api/post/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        return res.data;
      }
    } catch (error) {
      console.log("failed to update post!", error);
      throw error;
    }
  };

  // uploadFileToCloudinary = async (coverImage) => {
  //     console.log(coverImage)
  //     const res = await axios.post('/api/images/add')
  // }

  uploadSingleImageToClodianry = async (blobInfo) => {
    const formData = new FormData();

    formData.append("upload", blobInfo.blob(), blobInfo.filename());

    try {
      const res = await axios.post("/api/post/create/uploadimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("failed to upload the iamge to cloudinary, ", error);
      throw error;
    }
  };

  likeThePost = async (postId) => {
    try {
      const res = await axios.post(`/api/post/${postId}/like`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  };

  getAllComments = async (postId) => {
    try {
      const res = await axios.get(`/api/post/${postId}/comments`);

      if (!res.data) {
        throw new Error("not got any comments");
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("failed to get the comments  - ", error);
      throw error;
    }
  };

  addCommentOnPost = async (postId, { content }) => {
    try {
      const res = await axios.post(`/api/post/${postId}/addcomment`, {
        content,
      });

      if (!res.data) {
        throw new Error("failed to add the post!");
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  likeTheComment = async (postId, commentId) => {
    try {
      const res = await axios.post(
        `/api/post/${postId}/likethecomment/${commentId}`,
      );
      if (!res) {
        throw new Error("response is undefined!");
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  bookmarkThePost = async (postId) => {
    try {
      const res = await axios.post(`/api/post/${postId}/bookmark`);
      if (!res.data) {
        throw new Error("failed to bookmark the post");
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  getAllBookmarks = async () => {
    try {
      const res = await axios.get("/api/post/get-bookmarks");
      if (!res.data) {
        throw new Error("res.data cant be undefined");
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  searchPosts = async (text) => {
    try {
      const encodedText = encodeURIComponent(text)

      console.log(encodedText)

      const res = await axios.get(`/api/post/search?query=${encodedText}`)

      if (!res.data) {
        throw new Error("res.data dont have any data");
      }

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
