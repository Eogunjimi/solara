import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import { policies } from '../data/policies.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function PolicyPage({ type }) {
  const policy = policies[type];
  if (!policy) return <NotFoundPage />;

  return (
    <>
      <PageHero eyebrow="WEBSITE INFORMATION" title={policy.title} copy={policy.introduction} />
      <section className="section">
        <div className="container policy-copy">
          <p className="policy-notice">
            This is a demonstration site. These notices describe the current demo and require review
            before production use.
          </p>
          {policy.sections.map(({ title, body }) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <Link className="text-link" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
