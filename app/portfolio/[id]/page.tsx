import Navbar from "@/components/sections/Navbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-ink)" }}
    >
      {/* ─── Navbar ──────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ─────────────────────────────────────────────────────────────────────
          HERO SECTION
          Create the hero section here.
          Suggested content: project title, client name, a short tagline,
          cover image or video, and a CTA button (e.g. "Visit site").
      ───────────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="section-padding flex items-center"
        style={{
          minHeight: "80vh",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          {/* create the hero section here */}
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">{id}</span>
          </div>
          <h1
            className="display-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Project title goes here
          </h1>
          <p
            className="mt-4 text-sm max-w-lg"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Short project tagline or description goes here.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          ABOUT SECTION
          Create the about section here.
          Suggested content: project background, challenge, goals,
          client overview, and key results / metrics.
      ───────────────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="section-padding"
        style={{
          background: "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          {/* create the about section here */}
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">About</span>
          </div>
          <h2
            className="display-md mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About the project
          </h2>
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Project description goes here. Explain the challenge, the client's
            goals, and the context of the work.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SERVICES SECTION
          Create the services section here.
          Suggested content: list of deliverables / services provided for
          this project (e.g. UI design, development, SEO, CMS setup).
      ───────────────────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="section-padding"
        style={{
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-custom">
          {/* create the services section here */}
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">Services</span>
          </div>
          <h2
            className="display-md mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What we delivered
          </h2>
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            List the services and deliverables provided for this project.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          CONTACT SECTION
          Create the contact section here.
          Suggested content: call-to-action prompting visitors to start
          their own project, contact form or link, and office info.
      ───────────────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="section-padding"
        style={{ background: "var(--color-surface-1)" }}
      >
        <div className="container-custom">
          {/* create the contact section here */}
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">Contact</span>
          </div>
          <h2
            className="display-md mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start your project
          </h2>
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Contact form or CTA goes here.
          </p>
        </div>
      </section>
    </main>
  );
}
