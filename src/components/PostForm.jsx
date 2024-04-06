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
        className="flex flex-nowrap justify-around"
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
          <label htmlFor="title">title:</label>
          <Input
            {...register("title", { required: true })}
            id="title"
            as="textarea"
            className="w-full"
            rows={3}
            placeholder="add your title here"
          />

          <div className="w-full mt-4">
            <label htmlFor="coverImage">coverImage: </label>
            <div className="aspect-video border border-spacing-1 overflow-hidden flex justify-center items-center">
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
            />
          </div>

          <div className="w-full display flex justify-end">
            <Button
              className="mt-4 "
              type="submit"
              children={post ? "UPDATE POST" : "CREATE POST"}
            />
            {/* <button type='submit'>submit</button> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
