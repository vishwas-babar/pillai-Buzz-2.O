import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "rsuite";
import postService from "../services/PostService.js";
import TmceEditor from "./TmceEditor";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateThePost } from "../store/PostsSlice.js";

function PostForm({ post, setUploadingPost }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.discription || "",
        coverImage: post?.coverImage || "",
      },
    });

  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [imageBlob, setImageBlob] = useState(post?.coverImage);
  const navigate = useNavigate();

  const submit = async (data) => {
    setUploadingPost(true);
    if (post) {
      try {
        const res = await postService.updateThePost(post._id, data);
        console.log(res._id);
        if (res) {
          console.log("after update - ");
          console.log(res.data);
          setUploadingPost(false);
          dispatch(updateThePost(res.data)); // provided the post _id, title, coverImage
          navigate(`/post/${res.data._id}`);
        }
      } catch (error) {
        console.log("failed to update the post!", error);
        setUploadingPost(false);
      }
    } else {
      try {
        const res = await postService.createNewPost(data);

        if (res) {
          navigate(`/post/${res.postId}`);
          setUploadingPost(false);
        }
      } catch (error) {
        setUploadingPost(false);
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setImageBlob(blobUrl);
    }
  };

  return (
    <div className="w-full ">
      <form
        className="flex flex-nowrap justify-around dark:bg-gray-900 p-4 gap-2"
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-[50%]">
          <Controller
            name="content"
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
        <div className="w-[30%] overflow-hidden">
          <label htmlFor="title" className=" dark:text-gray-300">Title:</label>
          <Input
            {...register("title", { required: true })}
            id="title"
            as="textarea"
            className="w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 p-2 rounded-md"
            rows={3}
            placeholder="add your title here"
          />

          <div className="w-full mt-4">
            <label htmlFor="coverImage" className="dark:text-gray-300">CoverImage: </label>
            <div className="aspect-video border border-spacing-1 overflow-hidden flex justify-center items-center dark:border-gray-600">
              <img
                id="coverImage"
                className="object-contain max-w-full max-h-full"
                src={imageBlob}
                alt=""
              />
            </div>
            <input
              {...register("coverImage", { required: post ? false : true })}
              accept="image/*"
              name="coverImage"
              onChange={handleImageChange}
              type="file"
              className="w-full mt-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            />
          </div>

          <div className="w-full display flex justify-end">
            <Button
              className="mt-4 rounded-md dark:text-gray-300"
              type="submit"
              children={post ? "Update" : "Create"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
