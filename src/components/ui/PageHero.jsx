export default function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="eyebrow gold">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
