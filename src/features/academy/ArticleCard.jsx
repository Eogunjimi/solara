import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article, showExcerpt = false }) {
  return (
    <article className="article-card">
      <div className="article-img" style={{ backgroundImage: `url(${article.image})` }} />
      <div className="article-body">
        <span>{article.category}</span>
        <h2>{article.title}</h2>
        {showExcerpt && <p>{article.excerpt}</p>}
        <Link className="text-link" to={`/blog/${article.id}`}>
          Read article <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
