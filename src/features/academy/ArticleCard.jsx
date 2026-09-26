import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article, showExcerpt = false, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;

  return (
    <article className="article-card">
      <Link
        className="article-card-link"
        to={`/blog/${article.id}`}
        aria-label={`Read article: ${article.title}`}
      >
        <div className="article-media" aria-hidden="true">
          <img className="article-img" src={article.image} alt="" loading="lazy" decoding="async" />
          <span className="article-image-arrow">
            <ArrowRight size={20} />
          </span>
        </div>
        <div className="article-body">
          <span className="article-category">{article.category}</span>
          <Heading>{article.title}</Heading>
          {showExcerpt && <p>{article.excerpt}</p>}
          <span className="article-read-more">
            Read article <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
