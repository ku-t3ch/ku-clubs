import { NextPage } from "next";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef } from "react";

interface Props {
  onChange?: (content: string) => void;
  initialValue?: string;
}

const RichTextEditor: NextPage<Props> = ({ onChange, initialValue }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <>
      <Editor
        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        onEditorChange={(evt, editor) => onChange && onChange(editor.getContent())}
        init={{
          branding: false,
          promotion: false,
          menubar: false,
          min_height: 500,
          height: 500,
          max_height: 700,
          autoresize_bottom_margin: 30,
          plugins:
            "autoresize autolink lists link image searchreplace fullscreen media table code codesample directionality",
          toolbar:
            "blocks | alignleft aligncenter alignright  |" +
            "bold italic underline strikethrough | bullist numlist | link table image media file |" +
            "removeformat fullscreen",
          content_style: "body { font-size: 16px }",
          images_upload_url: "postAcceptor.php",
          automatic_uploads: false,
        }}
      />
    </>
  );
};

export default RichTextEditor;
