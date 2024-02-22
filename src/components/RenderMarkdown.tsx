import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { sanitize } from "isomorphic-dompurify";
import '@mdxeditor/editor/style.css'
interface Props {
    content: string
}

export default function RenderMarkdown(props: Props) {
    const clean = sanitize(props.content);
    return (
        <>
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className="prose">
                {props.content}
            </ReactMarkdown> */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: clean }}></div>
        </>
    )
}