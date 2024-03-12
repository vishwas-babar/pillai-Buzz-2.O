import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    // {
    //     authorDetails: {
    //         name: "",
    //         profilePhoto: "",
    //         userId: "",
    //         _id: "",
    //     },
    //     title: "",
    //     coverImage: "",
    //     createdAt: "",
    //     _id: "",
    //     likesCounts: 0,
    //     commentsCounts: 0,
    //     reads: 0,
    // }
  ],
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addArrOfPosts: (state, action) => {
      // state = state.concat(action.payload)
      state.posts.push(...action.payload);
    },
    removeAllPosts: (state) => {
      state.posts = []; // :todo
    },
    updateThePost: (state, action) => {
      state.posts.map((post) =>
        post._id === action.payload._id
          ? {
              ...post,
              title: action.payload.title,
              coverImage: action.payload.coverImage,
            }
          : post,
      );
    },
  },
});

export const { addArrOfPosts, removeAllPosts, updateThePost } =
  PostSlice.actions;

const postReducer = PostSlice.reducer;

export default postReducer;
