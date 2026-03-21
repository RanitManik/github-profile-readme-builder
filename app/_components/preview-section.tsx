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
                // Convert deprecated align attribute → text-align CSS so centered divs work
                div: (props) => {
                    const { align, style, ...rest } =
                        props as React.HTMLAttributes<HTMLDivElement> & {
                            align?: string;
                            node?: unknown;
                        };
                    return (
                        <div
                            {...rest}
                            style={{
                                ...(style as React.CSSProperties),
                                ...(align
                                    ? { textAlign: align as React.CSSProperties["textAlign"] }
                                    : {}),
                            }}
                        />
                    );
                },
                // Make images inline-block so stat cards sit side-by-side (mirrors GitHub rendering)
                img: (props) => {
                    const { style, ...rest } =
                        props as React.ImgHTMLAttributes<HTMLImageElement> & {
                            node?: unknown;
                        };
                    return (
                        // The preview needs to mirror GitHub's raw README image rendering,
                        // including arbitrary remote image URLs and inline sizing attributes.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            {...rest}
                            alt={props.alt ?? ""}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                ...(style as React.CSSProperties),
                            }}
                        />
                    );
                },
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
