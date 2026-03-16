export const metadata = {
  title: "System Architecture — VyapaarPe",
  description: "Interactive System Architecture Diagram for the VyapaarPe Multi-Tenant Platform.",
};

export default function SystemDiagramPage() {
  return (
    <iframe
      src="/system_diagram.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      title="System Architecture Diagram"
    />
  );
}
