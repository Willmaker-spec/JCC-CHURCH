function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
}

export default function simpleMarkdownToHtml(markdown = '') {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n')
  const output = []
  let paragraph = []
  let listType = null
  let inCodeBlock = false
  let codeLines = []

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${paragraph.map(renderInline).join('<br />')}</p>`)
      paragraph = []
    }
  }
  const closeList = () => {
    if (listType) {
      output.push(`</${listType}>`)
      listType = null
    }
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      flushParagraph()
      closeList()
      if (inCodeBlock) {
        output.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
        codeLines = []
      }
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    const listItem = line.match(/^\s*([-*+]|\d+\.)\s+(.+)$/)
    if (heading) {
      flushParagraph()
      closeList()
      const level = heading[1].length
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`)
    } else if (listItem) {
      flushParagraph()
      const nextType = /^\d/.test(listItem[1]) ? 'ol' : 'ul'
      if (listType !== nextType) {
        closeList()
        listType = nextType
        output.push(`<${listType}>`)
      }
      output.push(`<li>${renderInline(listItem[2])}</li>`)
    } else if (/^\s*>\s?/.test(line)) {
      flushParagraph()
      closeList()
      output.push(`<blockquote><p>${renderInline(line.replace(/^\s*>\s?/, ''))}</p></blockquote>`)
    } else if (!line.trim()) {
      flushParagraph()
      closeList()
    } else {
      closeList()
      paragraph.push(line)
    }
  }

  flushParagraph()
  closeList()
  if (inCodeBlock) {
    output.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
  }
  return output.join('\n')
}
