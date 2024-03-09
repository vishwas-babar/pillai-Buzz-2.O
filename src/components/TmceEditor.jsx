import { Editor } from '@tinymce/tinymce-react';
import React, { useState, useRef } from 'react'


function TmceEditor({ className, ...props }) {

    const editorRef = useRef(null);


    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    return (
        <div className={className}>
            <Editor
                tinymceScriptSrc={'../../public/tinymce/tinymce.min.js'}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue='<p>This is the initial content of the editor.</p>'
                {...props}
                onChange={log}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic forecolor backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'link image | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
          
        </div>
    )
}

export default TmceEditor