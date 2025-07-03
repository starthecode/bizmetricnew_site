import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';

const TextEditor = ({ editorContent, setEditorContent }) => {
  const editorInstanceRef = useRef(null);
  const holderId = 'editorjs-container';

  useEffect(() => {
    if (!editorInstanceRef.current) {
      editorInstanceRef.current = new EditorJS({
        holder: holderId,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/uploadFile', // Your file upload endpoint (POST)
                byUrl: '/api/fetchUrl', // Optional: upload by image URL
              },
            },
          },
        },
        data: editorContent ? JSON.parse(editorContent) : {},
        onChange: async (api) => {
          const savedData = await api.saver.save();
          setEditorContent(JSON.stringify(savedData));
        },
      });
    }

    return () => {
      if (editorInstanceRef.current?.destroy) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && editorContent) {
      editorInstanceRef.current.isReady
        .then(() => {
          editorInstanceRef.current.render(JSON.parse(editorContent));
        })
        .catch((err) => console.error('Editor.js initialization error', err));
    }
  }, [editorContent]);

  return (
    <div className="border p-4 rounded-lg min-h-[150px] my-8">
      <div id={holderId} />
    </div>
  );
};

export default TextEditor;
