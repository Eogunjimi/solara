import ButtonLink from '../components/ui/ButtonLink.jsx';
import PageHero from '../components/ui/PageHero.jsx';

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="404 — PAGE NOT FOUND"
        title="Let’s get you back on track."
        copy="This page doesn’t exist or may have moved."
      />
      <section className="section">
        <div className="container">
          <ButtonLink to="/">Back to home</ButtonLink>
        </div>
      </section>
    </>
  );
}
