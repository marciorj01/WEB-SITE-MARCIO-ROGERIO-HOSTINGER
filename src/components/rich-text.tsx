import React from 'react'

export function RichText({
  data,
  className = 'article-prose',
}: {
  data: any
  className?: string
}) {
  if (!data) return null

  // If already rendered HTML string
  if (typeof data === 'string') {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    )
  }

  // If Lexical JSON or structured Rich Text object
  if (data?.root?.children && Array.isArray(data.root.children)) {
    return (
      <div className={className}>
        {data.root.children.map((node: any, i: number) => {
          const text =
            node.children?.map((c: any) => c.text || '').join('') || ''

          if (node.type === 'heading') {
            const tag = node.tag || 'h2'
            return React.createElement(tag, { key: i }, text)
          }
          if (node.type === 'paragraph') {
            return <p key={i}>{text}</p>
          }
          if (node.type === 'quote') {
            return <blockquote key={i}>{text}</blockquote>
          }
          if (node.type === 'list') {
            const listTag = node.listType === 'number' ? 'ol' : 'ul'
            return React.createElement(
              listTag,
              { key: i },
              node.children?.map((li: any, j: number) => (
                <li key={j}>
                  {li.children?.map((c: any) => c.text || '').join('')}
                </li>
              )),
            )
          }
          return text ? <p key={i}>{text}</p> : null
        })}
      </div>
    )
  }

  // Strapi blocks format (array of blocks)
  if (Array.isArray(data)) {
    return (
      <div className={className}>
        {data.map((block: any, i: number) => {
          const text =
            block.children?.map((c: any) => c.text || '').join('') || ''

          if (block.type === 'heading') {
            const tag = `h${block.level || 2}`
            return React.createElement(tag, { key: i }, text)
          }
          if (block.type === 'paragraph') {
            return <p key={i}>{text}</p>
          }
          if (block.type === 'quote') {
            return <blockquote key={i}>{text}</blockquote>
          }
          if (block.type === 'list') {
            const listTag = block.format === 'ordered' ? 'ol' : 'ul'
            return React.createElement(
              listTag,
              { key: i },
              block.children?.map((li: any, j: number) => (
                <li key={j}>
                  {li.children?.map((c: any) => c.text || '').join('')}
                </li>
              )),
            )
          }
          return text ? <p key={i}>{text}</p> : null
        })}
      </div>
    )
  }

  return null
}
