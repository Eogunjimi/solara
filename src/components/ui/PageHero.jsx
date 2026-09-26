export default function PageHero({ eyebrow, title, copy, children, visual }) {
  return (
    <section className="page-hero">
      <div className={`container${visual ? ' page-hero-grid' : ''}`}>
        <div className="page-hero-copy">
          <div className="eyebrow gold">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{copy}</p>
          {children}
        </div>
        {visual}
      </div>
    </section>
  );
}
