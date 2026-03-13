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

const GOAL = 600;

function euros(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function timeSince(at) {
  const ms = Date.now() - new Date(at).getTime();
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `il y a ${minutes || 1} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  return `il y a ${days} j`;
}

export default function FundPage({ bp, total, progress, donations }) {
  const compact = bp === "xs";

  return (
    <div
      style={{
        position: "relative",
        zIndex: 8,
        width: "min(1180px, calc(100% - 32px))",
        margin: "32px auto 80px",
        padding: compact ? "22px" : "34px",
        borderRadius: 32,
        background: C.bgCard,
        boxShadow: "0 24px 70px rgba(38,74,64,0.14)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "1.05fr .95fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: C.text2,
            }}
          >
            Cagnotte en direct
          </p>
          <h2
            style={{
              margin: "12px 0 14px",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: compact ? 46 : 58,
              lineHeight: 1,
              color: C.text1,
            }}
          >
            Chaque don depuis les activités fait monter ce total.
          </h2>
          <p
            style={{
              color: C.text1,
              lineHeight: 1.65,
              fontSize: compact ? 17 : 20,
              maxWidth: 560,
            }}
          >
            Le montant se met à jour en direct à chaque donation réalisée dans
            une activité Impact Trip.
          </p>
          <div
            style={{
              marginTop: 24,
              padding: compact ? "18px" : "22px 24px",
              borderRadius: 24,
              background: `linear-gradient(135deg, ${C.bgAlt}, #ffffff)`,
              border: `1px solid ${C.borderLight}`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.text2,
              }}
            >
              Montant collecté
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: compact ? 42 : 56,
                lineHeight: 1,
                fontWeight: 700,
                color: C.green3,
              }}
            >
              {euros(total)}
            </div>
          </div>
          <div
            style={{
              marginTop: 22,
              height: 18,
              borderRadius: 999,
              background: "rgba(90,156,189,0.14)",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 999,
                background: `linear-gradient(90deg,${C.green2},${C.blue3})`,
              }}
            />
          </div>
        </div>
        <div
          style={{
            borderRadius: 24,
            padding: compact ? "20px" : "24px",
            background: C.bgAlt,
            border: `1px solid ${C.borderLight}`,
            boxShadow: "0 18px 40px rgba(44,61,79,.08)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.text2,
            }}
          >
            Derniers dons
          </div>
          <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
            {donations
              .slice()
              .reverse()
              .slice(0, 6)
              .map((donation) => (
                <div
                  key={donation.id}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.92)",
                    border: `1px solid ${C.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      fontWeight: 700,
                      color: C.text1,
                      fontSize: 17,
                    }}
                  >
                    <span>{donation.skillName}</span>
                    <span style={{ color: C.green3 }}>
                      {euros(donation.amount)}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: C.text2,
                      fontWeight: 600,
                    }}
                  >
                    {timeSince(donation.at)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
