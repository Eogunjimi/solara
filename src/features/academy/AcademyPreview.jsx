import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleGrid from './ArticleGrid.jsx';

export default function AcademyPreview() {
  return (
    <section className="section blog-preview">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">FROM THE ACADEMY</div>
            <h2>
              Useful thoughts on
              <br />
              <i>better energy.</i>
            </h2>
          </div>
          <Link className="text-link" to="/blog">
            Visit the academy <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ArticleGrid />
      </div>
    </section>
  );
}
