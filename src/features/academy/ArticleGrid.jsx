import { articles } from '../../data/articles.js';
import ArticleCard from './ArticleCard.jsx';

export default function ArticleGrid({ showExcerpt = false }) {
  return (
    <div className="blog-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} showExcerpt={showExcerpt} />
      ))}
    </div>
  );
}
