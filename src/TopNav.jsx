const C = {
  bg: "#f8f9fb",
  bgAlt: "#f0f4f8",
  bgCard: "#ffffff",
  borderLight: "#dde8f0",
  borderMid: "#b8d0e0",
  blue1: "#c8dff0",
  blue2: "#8fbfd8",
  blue3: "#5a9cbd",
  green1: "#c8e6d8",
  green2: "#8fc4a8",
  green3: "#5a9e82",
  gold: "#c8b87a",
  text1: "#2c3d4f",
  text2: "#607080",
  text3: "#99aab8",
  shadow: "rgba(90,156,189,0.14)",
};

const navPill = (active) => ({
  borderRadius: 999,
  border: `1px solid ${active ? C.blue3 : "transparent"}`,
  padding: "10px 16px",
  fontSize: 13,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 700,
  cursor: "pointer",
  background: active ? C.blue3 : "rgba(255,255,255,0.8)",
  color: active ? "#fff" : C.text3,
  transition: "all .2s",
});

export default function TopNav({
  currentPage,
  goHome,
  goActivities,
  goFund,
  goActeurs,
  goImpact,
}) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "min(1180px, calc(100% - 32px))",
        margin: "0 auto",
        padding: "30px 0 0",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <button
        onClick={goHome}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 32,
          fontStyle: "italic",
          letterSpacing: "0.08em",
          color: C.text1,
          cursor: "pointer",
        }}
      >
        ImpactTrip
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button style={navPill(currentPage === "home")} onClick={goHome}>
          Accueil
        </button>
        <button
          style={navPill(currentPage === "activities")}
          onClick={goActivities}
        >
          Activités
        </button>
        <button style={navPill(currentPage === "acteurs")} onClick={goActeurs}>
          Acteurs
        </button>
        {/* <button style={navPill(currentPage === "impact")} onClick={goImpact}>
          Mon Impact
        </button> */}
        <button style={navPill(currentPage === "fund")} onClick={goFund}>
          Cagnotte
        </button>
      </div>
    </div>
  );
}
