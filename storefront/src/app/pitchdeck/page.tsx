export const metadata = {
  title: "Investor Pitch Deck — VyapaarPe",
  description: "VyapaarPe Investor Pitch Deck 2026 — India's Next-Gen E-Commerce Enablement Platform.",
};

export default function PitchDeckPage() {
  return (
    <iframe
      src="/pitch_deck.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      title="Investor Pitch Deck"
    />
  );
}
