import * as React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
  toolbar?: boolean;
  readOnly?: boolean;
}

const QuillEditor = ({
  value,
  setValue,
  toolbar = true,
  readOnly,
}: EditorProps) => {
  const editorRef = React.useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      // [{ font: [] }],
      // [{ script: "sub" }, { script: "super" }],
      // [{ color: [] }, { background: [] }],
      // ["link", "image"],
      // ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "font",
    "script",
    "color",
    "background",
    "link",
    "image",
    "clean",
  ];

  const handleChange = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const html = editor.root.innerHTML;
      setValue(html);
    }
  };

  return (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={toolbar ? modules : { toolbar: false }}
      formats={formats}
      className=""
      placeholder="Write something awesome..."
      readOnly={readOnly}
    />
  );
};

export default QuillEditor;
