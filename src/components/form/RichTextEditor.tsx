import { NextPage } from "next";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { BlockTypeSelect, BoldItalicUnderlineToggles, ChangeCodeMirrorLanguage, CodeToggle, ConditionalContents, CreateLink, DiffSourceToggleWrapper, InsertCodeBlock, InsertImage, InsertTable, KitchenSinkToolbar, ListsToggle, MDXEditor, MDXEditorMethods, UndoRedo, codeBlockPlugin, codeMirrorPlugin, frontmatterPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, sandpackPlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import toast from "react-hot-toast";

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

    async function imageUploadHandler(image: File) {
        const formData = new FormData()
        formData.append('file', image)
        // send the file to your server and return
        // the URL of the uploaded image in the response
        const key = toast.loading('Uploading...')
        const response = await fetch('/api/attachments', {
            method: 'POST',
            body: formData
        })
        const json = (await response.json()) as { location: string }
        toast.success('Uploaded', { id: key })
        return json.location
    }

    const ref = useRef<MDXEditorMethods>(null)

    return (
        <>
            {error && <span className="text-red-500">*{error}</span>}
            {/* <MDXEditor className="border relative overflow-hidden rounded-xl prose" ref={ref} markdown={initialValue ?? ""} plugins={[
                toolbarPlugin({
                    toolbarContents: () => <DiffSourceToggleWrapper>
                        <UndoRedo />
                        <BlockTypeSelect />
                        <BoldItalicUnderlineToggles />
                        <CreateLink />
                        <ListsToggle />
                        <CodeToggle />
                        <InsertImage />
                        <InsertTable />
                    </DiffSourceToggleWrapper>,

                }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        python: "Python",
                        c: "C",
                        cpp: "C++",
                        java: "Java",
                    },
                    theme: "light",
                }),
                listsPlugin(),
                quotePlugin(),
                headingsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin({
                    imageUploadHandler: imageUploadHandler
                }),
                tablePlugin(),
                thematicBreakPlugin(),
                frontmatterPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                markdownShortcutPlugin()
            ]}

                onChange={onChange} /> */}
            
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
                        "autoresize autolink lists link image searchreplace fullscreen media table code codesample directionality textpattern",
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