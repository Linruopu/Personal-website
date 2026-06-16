import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

interface Props {
  content: string
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose max-w-none
                    prose-headings:scroll-mt-20
                    prose-code:font-mono
                    prose-code:before:content-none prose-code:after:content-none
                    prose-pre:font-mono prose-pre:text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
