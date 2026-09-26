import { panelTypes } from '../../data/panels.js';

export default function PanelTypesSection() {
  return (
    <section className="panel-types">
      <div className="container panel-types-inner">
        <div className="panel-heading">
          <div className="eyebrow">SOLAR TECHNOLOGY</div>
          <h2>
            Panel types
            <br />
            <i>we work with</i>
          </h2>
        </div>
        <div className="panel-list">
          {panelTypes.map((panel) => (
            <article className="panel-type" key={panel.name}>
              <div className="panel-photo" style={{ backgroundImage: `url(${panel.image})` }} />
              <b>{panel.name}</b>
              <span>{panel.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
