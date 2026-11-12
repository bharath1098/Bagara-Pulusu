import { PageHero, PublicShell } from "@/components/PublicShell";

export default function GalleryPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="Gallery"
        title="Moments that matter"
        subtitle="Photos coming soon — for now, meet us at the table in Jubilee Hills."
      />
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="wrap">
          <p className="lead muted" style={{ maxWidth: "40ch" }}>
            The gallery is empty while we refresh the look. Explore the menu or
            reserve a table in the meantime.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}
