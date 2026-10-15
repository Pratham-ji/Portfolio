import React, { useMemo } from 'react';
import styles from '../PaperViewer.module.css';
import { 
  Info, 
  Lightbulb, 
  Sparkles, 
  AlertTriangle, 
  Quote, 
  Check, 
  Copy 
} from 'lucide-react';

interface DocumentRendererProps {
  content: string;
  fileName?: string;
}

// Regex patterns for inline tokenization
const LINK_OR_TAG_OR_CODE_REGEX = /(\[[^\]]+\]\([^)]+\)|\[[A-Za-z0-9+#/.\- ]+\]|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

/**
 * Parses inline formatting:
 * - Links: [Label](url)
 * - Skill Tags: [Tag]
 * - Inline Code: `code`
 * - Bold: **bold**
 * - Italic: *italic*
 */
export const renderInline = (text: string): React.ReactNode => {
  const parts = text.split(LINK_OR_TAG_OR_CODE_REGEX);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Markdown link: [Label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a 
          key={index} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          {label}
        </a>
      );
    }

    // 2. Skill tag badge: [Tag] (not followed by url)
    const tagMatch = part.match(/^\[([A-Za-z0-9+#/.\- ]+)\]$/);
    if (tagMatch) {
      return (
        <span key={index} className={styles.skillTag}>
          {tagMatch[1]}
        </span>
      );
    }

    // 3. Inline code: `code`
    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return (
        <code key={index} className={styles.inlineCode}>
          {codeMatch[1]}
        </code>
      );
    }

    // 4. Bold: **text**
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={index}>{renderInline(boldMatch[1])}</strong>;
    }

    // 5. Italic: *text*
    const italicMatch = part.match(/^\*([^*]+)\*$/);
    if (italicMatch) {
      return <em key={index}>{renderInline(italicMatch[1])}</em>;
    }

    return part;
  });
};

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <div className={styles.codeBlockHeader}>
        <span>{language.toUpperCase() || 'CODE'}</span>
        <button 
          onClick={handleCopy} 
          className={styles.iconButton} 
          title="Copy code"
          style={{ width: 22, height: 22 }}
        >
          {copied ? <Check size={13} color="#30D158" /> : <Copy size={13} />}
        </button>
      </div>
      <pre className={styles.codeBlockPre}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({ content, fileName = '' }) => {
  const isSourceCodeFile = useMemo(() => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext === 'cpp' || ext === 'code' || ext === 'ts' || ext === 'js' || ext === 'json';
  }, [fileName]);

  // If pure source code file, render directly as code block
  if (isSourceCodeFile && !content.startsWith('#')) {
    const lang = fileName.split('.').pop() || 'text';
    return <CodeBlock language={lang} code={content} />;
  }

  // Parse Markdown / Paper line-by-line / block-by-block
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Section Divider: ---
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={`div-${i}`} className={styles.docDivider} />);
      i++;
      continue;
    }

    // Code Blocks: ```lang
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <CodeBlock 
          key={`code-${i}`} 
          language={lang || 'text'} 
          code={codeLines.join('\n')} 
        />
      );
      continue;
    }

    // Callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION] or standard blockquotes
    if (line.trim().startsWith('>')) {
      const calloutLines: string[] = [];
      let calloutType: 'note' | 'tip' | 'important' | 'warning' | 'quote' = 'quote';

      const firstLineTrim = line.trim();
      if (firstLineTrim.startsWith('> [!NOTE]')) {
        calloutType = 'note';
      } else if (firstLineTrim.startsWith('> [!TIP]')) {
        calloutType = 'tip';
      } else if (firstLineTrim.startsWith('> [!IMPORTANT]')) {
        calloutType = 'important';
      } else if (firstLineTrim.startsWith('> [!WARNING]') || firstLineTrim.startsWith('> [!CAUTION]')) {
        calloutType = 'warning';
      }

      // If typed callout, skip the marker line if it has no additional text
      const markerText = firstLineTrim.replace(/^>\s*\[![A-Z]+\]\s*/, '');
      if (markerText.length > 0 && calloutType !== 'quote') {
        calloutLines.push(markerText);
      } else if (calloutType === 'quote') {
        calloutLines.push(firstLineTrim.replace(/^>\s?/, ''));
      }

      i++;
      while (i < lines.length && lines[i].trim().startsWith('>') && !lines[i].trim().startsWith('> [!')) {
        calloutLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }

      const bodyText = calloutLines.join(' ');

      let calloutClass = styles.calloutBlockquote;
      let calloutIcon = <Quote size={16} />;
      let title = '';

      switch (calloutType) {
        case 'note':
          calloutClass = styles.calloutNote;
          calloutIcon = <Info size={16} />;
          title = 'NOTE';
          break;
        case 'tip':
          calloutClass = styles.calloutTip;
          calloutIcon = <Lightbulb size={16} />;
          title = 'TIP';
          break;
        case 'important':
          calloutClass = styles.calloutImportant;
          calloutIcon = <Sparkles size={16} />;
          title = 'IMPORTANT';
          break;
        case 'warning':
          calloutClass = styles.calloutWarning;
          calloutIcon = <AlertTriangle size={16} />;
          title = 'WARNING';
          break;
      }

      elements.push(
        <div key={`callout-${i}`} className={`${styles.callout} ${calloutClass}`}>
          <div className={styles.calloutIcon}>{calloutIcon}</div>
          <div className={styles.calloutBody}>
            {title && <div className={styles.calloutTitle}>{title}</div>}
            <div>{renderInline(bodyText)}</div>
          </div>
        </div>
      );
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className={styles.docTitle}>
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className={styles.docH2}>
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className={styles.docH3}>
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Unordered Lists: - or *
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < lines.length && 
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className={styles.docList}>
          {listItems.map((item, idx) => (
            <li key={idx} className={styles.docListItem}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered Lists: 1. , 2. , etc.
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className={styles.docList}>
          {listItems.map((item, idx) => (
            <li key={idx} className={styles.docListItem}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular Paragraph
    elements.push(
      <p key={`p-${i}`} className={styles.docParagraph}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
};
