import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useRef } from "react";
import postService from "../services/PostService";
import axios from "axios";

function TmceEditor({ className, ...props }) {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className={className}>
      <Editor
        apiKey="s9iejl90ug9ofv0k8y8dlz4ydhh7v97mwy5x3r0w9hmgsaw8"
        onInit={(evt, editor) => (editorRef.current = editor)}
        {...props}
        onChange={log}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "link media | removeformat | help", // Removed 'image' from toolbar
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_types: "", // Removed 'image' from file picker types
        }}
      />
    </div>
  );
}

export default TmceEditor;
