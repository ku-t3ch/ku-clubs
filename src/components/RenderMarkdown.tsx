import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
interface Props {
    content: string
}

export default function RenderMarkdown(props: Props) {
    return (
        <>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose">
                {props.content}
            </ReactMarkdown>
        </>
    )
}