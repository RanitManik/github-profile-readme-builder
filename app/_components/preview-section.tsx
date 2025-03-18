import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface PreviewSectionProps {
    markdown: string;
}

export default function PreviewSection({ markdown }: PreviewSectionProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
                a: (props) => (
                    <a {...props} className="hover:no-underline!">
                        {props.children}
                    </a>
                ),
                picture: (props) => (
                    <picture {...props} className="inline-block!">
                        {props.children}
                    </picture>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
}
