import { useParams } from 'react-router-dom';
import { articles } from '../data/articles.js';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ArticlePage() {
  const { articleId } = useParams();
  const article = articles.find((item) => item.id === articleId);
  if (!article) return <NotFoundPage />;
  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} copy={article.excerpt} />
      <section className="section">
        <div className="container">
          <p>
            The full guide has not been published yet. In the meantime, explore the academy or ask
            us about your solar needs.
          </p>
          <ButtonLink to="/blog">Back to the academy</ButtonLink>
        </div>
      </section>
    </>
  );
}
