import { NextPage } from "next";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef } from "react";
import axios, { AxiosRequestConfig } from 'axios';

interface Props {
    onChange?: (content: string) => void;
    initialValue?: string;
    error?: string;
}

const RichTextEditor: NextPage<Props> = ({ onChange, initialValue, error }) => {
    const editorRef = useRef<TinyMCEEditor | null>(null);

    const handleImageUpload = (blobInfo: any, progress: (percent: number) => void, failure?: (message: string) => void): Promise<string> => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            const config: AxiosRequestConfig = {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    progress(percentCompleted);
                },
            };

            axios.post('/api/attachments', formData, config)
                .then((response) => {
                    const json = response.data;

                    if (!json || typeof json.location !== 'string') {
                        reject('Invalid JSON: ' + JSON.stringify(json));
                        return;
                    }

                    resolve(json.location);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        // Handle cancelation
                    } else {
                        reject({ message: 'Image upload failed', remove: true });

                        if (failure && typeof failure === 'function') {
                            failure('Image upload failed');
                        }
                    }
                });
        });
    };

    return (
        <>
            {error && <span className="text-red-500">*{error}</span>}
            <Editor
                tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={initialValue}
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
                        "blocks | removeformat | alignleft aligncenter alignright  |" +
                        "bold italic underline strikethrough | bullist numlist | link table image media file |" +
                        "removeformat fullscreen",
                    content_style: "body { font-size: 16px }",
                    images_upload_url: "/api/attachments",
                    automatic_uploads: true,
                    images_reuse_filename: true,
                    images_upload_handler: handleImageUpload
                }}
            />
        </>
    );
};

export default RichTextEditor;
