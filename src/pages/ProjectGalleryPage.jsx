import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import { projects } from '../data/projects.js';

/** Large-format project gallery. Uses the same past-work widget as the homepage, in gallery mode. */
export default function ProjectGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="PAST WORK"
        title="Project gallery"
        copy="Browse our power projects at full size, from rooftop systems to backup power for homes and businesses."
      >
        <ButtonLink to="/contact#quote">Discuss your project</ButtonLink>
      </PageHero>
      <section className="section project-gallery-notice" aria-label="About these images">
        <div className="container">
          <p role="note">
            <strong>About these images:</strong> the photographs below are illustrative stock
            images, not photographs of Solara installations. Photographs of our completed projects
            will replace them as they become available.
          </p>
        </div>
      </section>
      <ProjectsSection
        items={projects}
        gallery
        eyebrow="GALLERY"
        title={
          <>
            Systems we design, <i>shown large.</i>
          </>
        }
        description="Select a category to filter the gallery. Each image opens the quote form so you can discuss a similar system for your property."
      />
    </>
  );
}
