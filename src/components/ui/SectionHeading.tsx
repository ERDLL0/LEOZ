import { Link } from 'react-router-dom';
import { DirectionalArrow } from './DirectionalArrow';

export function SectionHeading({
  eyebrow,
  title,
  link,
  linkTo,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  link?: string;
  linkTo?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-5 ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {link && linkTo && (
        <Link to={linkTo} className="text-link transition-colors hover:text-brass-bright">
          {link}
          <DirectionalArrow size={16} />
        </Link>
      )}
    </div>
  );
}
