import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useRef, useEffect } from "react";

function TmceEditor({ className, ...props }) {
  const editorRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => { // :todo 
    const darkMode = document.documentElement.classList.contains("dark");

    if (darkMode) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

  }, [])
  

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className={className}>
      <Editor
        apiKey={import.meta.env.VITE_APP_TINYMCE_APIKEY}
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
            skin: isDarkMode ? 'oxide-dark' : 'oxide',
            content_css: isDarkMode ? 'dark' : '',
          file_picker_types: "", // Removed 'image' from file picker types
        }}
      />
    </div>
  );
}

export default TmceEditor;
