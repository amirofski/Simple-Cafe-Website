import React from 'react';

interface MaskedLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  innerClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const MaskedLines: React.FC<MaskedLinesProps> = ({
  lines,
  className = '',
  lineClassName = '',
  innerClassName = '',
  as: Component = 'h2',
}) => {
  const fullText = lines.join(' ');

  return (
    <Component className={className} aria-label={fullText}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={`block overflow-hidden py-1 ${lineClassName}`}
          aria-hidden="true"
        >
          <span
            className={`block split-line transform-gpu will-change-transform ${innerClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
};

interface MaskedWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  innerClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const MaskedWords: React.FC<MaskedWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  innerClassName = '',
  as: Component = 'p',
}) => {
  const words = text.split(' ');

  return (
    <Component className={className} aria-label={text}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`inline-block overflow-hidden align-top mr-[0.28em] ${wordClassName}`}
          aria-hidden="true"
        >
          <span
            className={`inline-block split-word transform-gpu will-change-transform ${innerClassName}`}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
