import React from "react";
import { PostForm, TmceEditor } from "../components/index.js";
import { useState } from "react";
import { Loader } from "../components/index.js";

function PostEditor() {
  const [uploadingPost, setUploadingPost] = useState(false);

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <PostForm setUploadingPost={setUploadingPost} />

      {uploadingPost && <Loader children={"Creating post..."} />}
    </div>
  );
}

export default PostEditor;
