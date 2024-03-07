import { createSlice } from "@reduxjs/toolkit";

const initialState ={ posts: [
    {
        authorDetails: {
            name: "",
            profilePhoto: "",
            userId: "",
            _id: "",
        },
        title: "",
        coverImage: "",
        createdAt: "",
        _id: "",
        likesCounts: 0,
        commentsCounts: 0,
        reads: 0,
    }
]}
 
const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addArrOfPosts: (state, action) => {
            // state = state.concat(action.payload)
            state.posts.push(...action.payload)
        },
        removeAllPosts: (state) => {
            state.posts = [] // :todo
        },
    }
})


export const { addArrOfPosts, removeAllPosts } = PostSlice.actions;

const postReducer = PostSlice.reducer;

export default postReducer;