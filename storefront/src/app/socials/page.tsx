export const metadata = {
  title: "Sustainable Development & the 17 SDGs — Presentation",
  description: "Interactive presentation on the 17 Sustainable Development Goals by Faisal Khan, Sheikh Hemayoou Jawaid, Yash Vishesh & Utsav Upadhyay.",
};

export default function SocialsPage() {
  return (
    <iframe
      src="/sdg_presentation.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      title="SDG Presentation"
    />
  );
}
