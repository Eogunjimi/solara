import PageHero from '../components/ui/PageHero.jsx';
import ArticleGrid from '../features/academy/ArticleGrid.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLARA ACADEMY"
        title={
          <>
            Clear answers for
            <br />
            <i>better energy decisions.</i>
          </>
        }
        copy="Useful, honest guidance for homes and businesses considering solar in Lagos."
      />
      <section className="section">
        <div className="container">
          <ArticleGrid showExcerpt />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
