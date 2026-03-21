import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface PreviewSectionProps {
    markdown: string;
}

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw, rehypeHighlight];

const markdownComponents = {
    a: (props: React.ComponentProps<"a">) => (
        <a {...props} className="hover:no-underline!">
            {props.children}
        </a>
    ),
    // Convert deprecated align attribute → text-align CSS so centered divs work
    div: (
        props: React.HTMLAttributes<HTMLDivElement> & {
            align?: string;
            node?: unknown;
        },
    ) => {
        const { align, style, ...rest } = props;
        return (
            <div
                {...rest}
                style={{
                    ...(style as React.CSSProperties),
                    ...(align ? { textAlign: align as React.CSSProperties["textAlign"] } : {}),
                }}
            />
        );
    },
    // Make images inline-block so stat cards sit side-by-side (mirrors GitHub rendering)
    img: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & {
            node?: unknown;
        },
    ) => {
        const { style, ...rest } = props;
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
    picture: (props: React.ComponentProps<"picture">) => (
        <picture {...props} className="inline-block!">
            {props.children}
        </picture>
    ),
};

function PreviewSection({ markdown }: PreviewSectionProps) {
    return (
        <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={markdownComponents}
        >
            {markdown}
        </ReactMarkdown>
    );
}

export default memo(PreviewSection);
