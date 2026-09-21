import { images } from '../../data/images.js';

export default function FounderSection() {
  return (
    <section className="about-founder">
      <div className="container about-founder-grid">
        <div className="founder-portrait" style={{ backgroundImage: `url(${images.install})` }}>
          <div className="founder-caption">
            <strong>AFEEZ ORIYOMI</strong>
            <span>Founder, Afeez Tech Solar Global Service Technology</span>
          </div>
        </div>
        <div className="founder-copy">
          <h2>
            Built on experience.
            <br />
            <i>Driven by better power.</i>
          </h2>
          <p>
            <b>I&apos;m Afeez Oriyomi,</b> the founder of Afeez Tech Solar Global Service
            Technology. And I&apos;ll tell you straight: my passion has never been just about
            installing solar panels and inverters. It&apos;s about helping Nigerians enjoy
            dependable electricity and the comfort, freedom, and peace of mind that come with it.
          </p>
          <p>
            I&apos;ve spent <b>17+ years</b> working in solar and inverter technology, helping homes
            and businesses across Nigeria find practical solutions to their power needs. Every
            project starts with understanding the customer, recommending the right system, and
            delivering professional installation using quality products.
          </p>
          <p>
            And here&apos;s what makes us different: we don&apos;t believe in one-size-fits-all
            solutions. Every home and business has unique energy needs, and we take the time to
            understand yours. From installation to routine maintenance, we&apos;re committed to
            quality workmanship and support you can count on.
          </p>
          <p>
            When you work with us, you&apos;re choosing a team that listens, understands your needs,
            and cares about helping you enjoy dependable power.
          </p>
          <div className="founder-signoff">
            Your power needs are personal to you, and they&apos;re personal to me too.
          </div>
        </div>
      </div>
    </section>
  );
}
