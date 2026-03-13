import { useState, useEffect } from "react";

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

function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  if (w >= 1600) return "xl";
  if (w >= 1280) return "lg";
  if (w >= 1024) return "md";
  if (w >= 600) return "sm";
  return "xs";
}

// Impact Card Component
function ImpactCard({ label, value, unit, icon, accent, accentLight, bp }) {
  const isXs = bp === "xs";
  const isSm = bp === "sm";

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 16,
        border: `1px solid ${C.borderLight}`,
        padding: isXs ? "20px 16px" : isSm ? "24px 20px" : "28px 24px",
        boxShadow: `0 8px 40px ${C.shadow}`,
        textAlign: "center",
        transition: "all .3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 16px 60px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.borderLight;
        e.currentTarget.style.boxShadow = `0 8px 40px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: isXs ? 56 : isSm ? 64 : 80,
          height: isXs ? 56 : isSm ? 64 : 80,
          borderRadius: "50%",
          margin: "0 auto 12px",
          background: `linear-gradient(135deg,${accentLight},${C.bgAlt})`,
          border: `1px solid ${accent}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isXs ? 28 : isSm ? 32 : 40,
          boxShadow: `0 4px 20px ${accent}22`,
        }}
      >
        {icon}
      </div>

      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isXs ? 10 : 11,
          color: C.text3,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 8,
        }}
      >
        {label}
      </p>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isXs ? 28 : isSm ? 32 : 40,
          fontWeight: 600,
          color: accent,
          letterSpacing: "0.02em",
          marginBottom: 4,
        }}
      >
        {value}
      </h3>

      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isXs ? 12 : 13,
          color: C.text2,
        }}
      >
        {unit}
      </p>
    </div>
  );
}

function DonationItem({ nom, montant, bp }) {
  const isXs = bp === "xs";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isXs ? "12px 0" : "14px 0",
        borderBottom: `1px solid ${C.borderLight}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>🤝</span>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 12 : 13,
            color: C.text1,
            fontWeight: 500,
          }}
        >
          {nom}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isXs ? 12 : 13,
          fontWeight: 600,
          color: C.green3,
        }}
      >
        +{montant}€
      </p>
    </div>
  );
}

export default function MyImpact({
  onBackToHome,
  donations = [],
  selectedActivities = [],
}) {
  const bp = useBreakpoint();
  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const isMd = bp === "md";

  const totalDonations = donations.reduce((sum, d) => sum + d.montant, 0);
  const numberOfActorsSupported = [...new Set(donations.map((d) => d.acteur))]
    .length;

  const calculateCO2Saved = () => {
    return selectedActivities.length * 8;
  };

  const co2Saved = calculateCO2Saved();
  const water = co2Saved * 100;
  const energySaved = co2Saved * 2;
  const treeCount = Math.round(co2Saved / 25);

  const gridCols = isXs ? 1 : isSm ? 2 : 3;
  const containerPad = isXs ? "16px 16px" : isSm ? "20px 24px" : "28px 32px";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .78s ease both;}
        html,body,#root{width:100vw !important;max-width:100vw !important;margin:0 !important;padding:0 !important;overflow-x:hidden;}
        body>div,#root>div{width:100vw !important;max-width:100vw !important;}
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: C.bg,
          fontFamily: "'Cormorant Garamond',serif",
          position: "relative",
          overflowX: "hidden",
          paddingTop: isXs ? 60 : isSm ? 80 : 100,
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: bp === "xl" ? 4 : 3,
            background: `linear-gradient(90deg,transparent,${C.blue2},${C.green2},${C.blue2},transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: bp === "xl" ? 3 : 2,
            background: `linear-gradient(90deg,transparent,${C.green2},${C.blue2},${C.green2},transparent)`,
            zIndex: 5,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: isXs ? "-20%" : "-12%",
            right: isXs ? "-12%" : "-8%",
            width: isXs ? 300 : isSm ? 450 : 800,
            height: isXs ? 300 : isSm ? 450 : 800,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.blue1}48,transparent 68%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isXs ? "-25%" : "-14%",
            left: isXs ? "-14%" : "-6%",
            width: isXs ? 280 : isSm ? 420 : 740,
            height: isXs ? 280 : isSm ? 420 : 740,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.green1}38,transparent 68%)`,
            pointerEvents: "none",
          }}
        />

        {onBackToHome && (
          <div
            style={{
              position: "absolute",
              top: isXs ? 12 : isSm ? 16 : 20,
              left: isXs ? 12 : isSm ? 16 : 20,
              zIndex: 40,
            }}
          >
            <button
              onClick={onBackToHome}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: C.bgCard,
                border: `1.5px solid ${C.borderLight}`,
                borderRadius: 10,
                padding: isXs ? "6px 12px" : "8px 16px",
                cursor: "pointer",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 11 : 12,
                color: C.text3,
                letterSpacing: "0.1em",
                transition: "all .2s",
                boxShadow: `0 4px 16px ${C.shadow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.blue3;
                e.currentTarget.style.color = C.blue3;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.borderLight;
                e.currentTarget.style.color = C.text3;
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
              {!isXs && "Retour"}
            </button>
          </div>
        )}

        <div
          className="fu"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            marginBottom: isXs ? 24 : isSm ? 32 : 48,
          }}
        >
          <p
            style={{
              fontSize: isXs ? 9 : 10,
              letterSpacing: "0.40em",
              color: C.text3,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ✦ &nbsp; Votre Engagement &nbsp; ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isXs ? 32 : isSm ? 42 : isMd ? 52 : 64,
              fontWeight: 600,
              fontStyle: "italic",
              color: C.text1,
              letterSpacing: "0.04em",
              marginBottom: 12,
              textShadow: `0 2px 32px rgba(91,156,189,.14)`,
            }}
          >
            Mon Impact
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isXs ? 13 : isSm ? 14 : 15,
              color: C.text2,
              lineHeight: 1.7,
              maxWidth: isXs ? "100%" : isSm ? 500 : 700,
              margin: "0 auto",
            }}
          >
            Découvrez l'impact réel de votre engagement pendant votre séjour à
            l'Hôtel Le Boucan Canot.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: isXs ? "100%" : isSm ? 600 : isMd ? 900 : 1200,
            padding: containerPad,
          }}
        >
          <div style={{ marginBottom: isXs ? 32 : 48 }}>
            <p
              className="fu"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 13 : 14,
                color: C.text3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Impact Environnemental
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gap: isXs ? 12 : isSm ? 16 : 20,
              }}
            >
              <div className="fu" style={{ animationDelay: "0.1s" }}>
                <ImpactCard
                  label="CO2 Économisé"
                  value={co2Saved}
                  unit="kg"
                  icon="💚"
                  accent={C.green3}
                  accentLight={C.green1}
                  bp={bp}
                />
              </div>

              <div className="fu" style={{ animationDelay: "0.18s" }}>
                <ImpactCard
                  label="Eau Économisée"
                  value={Math.round(water)}
                  unit="litres"
                  icon="💧"
                  accent={C.blue3}
                  accentLight={C.blue1}
                  bp={bp}
                />
              </div>

              <div className="fu" style={{ animationDelay: "0.26s" }}>
                <ImpactCard
                  label="Énergie Économisée"
                  value={Math.round(energySaved)}
                  unit="kWh"
                  icon="⚡"
                  accent={C.blue2}
                  accentLight={C.blue1}
                  bp={bp}
                />
              </div>

              <div className="fu" style={{ animationDelay: "0.34s" }}>
                <ImpactCard
                  label="Arbres Plantés (équivalent)"
                  value={treeCount}
                  unit="arbres"
                  icon="🌳"
                  accent={C.green2}
                  accentLight={C.green1}
                  bp={bp}
                />
              </div>

              <div className="fu" style={{ animationDelay: "0.42s" }}>
                <ImpactCard
                  label="Dons Totaux"
                  value={totalDonations}
                  unit="€"
                  icon="💰"
                  accent={C.gold}
                  accentLight="#f0ebd0"
                  bp={bp}
                />
              </div>

              <div className="fu" style={{ animationDelay: "0.50s" }}>
                <ImpactCard
                  label="Acteurs Soutenus"
                  value={numberOfActorsSupported}
                  unit="producteurs"
                  icon="🤝"
                  accent={C.blue3}
                  accentLight={C.blue1}
                  bp={bp}
                />
              </div>
            </div>
          </div>

          <div
            className="fu"
            style={{
              height: 1,
              background: `linear-gradient(90deg,transparent,${C.borderMid},transparent)`,
              margin: isXs ? "24px 0" : isSm ? "32px 0" : "48px 0",
              animationDelay: "0.58s",
            }}
          />

          {donations.length > 0 && (
            <div className="fu" style={{ animationDelay: "0.66s" }}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: isXs ? 13 : 14,
                  color: C.text3,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Détail de vos Dons
              </p>

              <div
                style={{
                  background: C.bgCard,
                  borderRadius: 16,
                  border: `1px solid ${C.borderLight}`,
                  padding: isXs ? "16px" : isSm ? "20px" : "24px",
                  boxShadow: `0 8px 40px ${C.shadow}`,
                }}
              >
                {donations.map((donation, idx) => (
                  <DonationItem
                    key={idx}
                    nom={donation.acteur}
                    montant={donation.montant}
                    bp={bp}
                  />
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isXs ? "14px 0 0" : "16px 0 0",
                    borderTop: `2px solid ${C.green3}`,
                    marginTop: isXs ? 12 : 14,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: isXs ? 13 : 14,
                      fontWeight: 600,
                      color: C.text1,
                      marginTop: 8,
                    }}
                  >
                    Total
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: isXs ? 14 : 15,
                      fontWeight: 700,
                      color: C.green3,
                      marginTop: 8,
                    }}
                  >
                    {totalDonations}€
                  </p>
                </div>
              </div>
            </div>
          )}

          {donations.length === 0 && (
            <div
              className="fu"
              style={{
                textAlign: "center",
                padding: isXs ? "20px 0" : isSm ? "28px 0" : "40px 0",
                animationDelay: "0.66s",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: isXs ? 13 : 14,
                  color: C.text3,
                }}
              >
                Vous n'avez pas encore fait de dons pendant ce séjour.
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: isXs ? 13 : 14,
                  color: C.text2,
                  marginTop: 8,
                }}
              >
                Visitez la page "Acteurs Locaux" pour soutenir les producteurs !
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
