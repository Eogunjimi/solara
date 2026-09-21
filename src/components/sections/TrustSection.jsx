import { trustLogos } from '../../data/trust.js';

export default function TrustSection() {
  const rows = [trustLogos, [...trustLogos].reverse(), trustLogos];
  return (
    <section className="trust-badges marquee-section">
      <div className="trust-caption">TRUSTED NAMES IN POWER & POSSIBILITY</div>
      <div className="marquee-window">
        {rows.map((row, r) => (
          <div className={'marquee-row row-' + r} key={r}>
            {[...row, ...row].map((b, i) => (
              <div className="logo-tile" key={r + '-' + i}>
                <strong>{b.name}</strong>
                <span>{b.caption}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
