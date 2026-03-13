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

// ─── Hero Block ──────────────────────────────────────────────────────────────
function HeroBlock({ bp }) {
  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const isLg = bp >= "lg";

  const titleSize = isXs
    ? 42
    : isSm
      ? 56
      : bp === "md"
        ? 72
        : bp === "lg"
          ? 92
          : 120;
  const subtitleSize = isXs ? 13 : isSm ? 14 : bp === "md" ? 15 : 16;
  const descSize = isXs ? 13 : isSm ? 14 : bp === "md" ? 15 : 16;
  const padX = isXs ? "20px" : isSm ? "28px" : bp === "md" ? "40px" : "60px";
  const padY = isXs
    ? "32px 0"
    : isSm
      ? "48px 0"
      : bp === "md"
        ? "64px 0"
        : "88px 0";

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: padY,
        paddingLeft: padX,
        paddingRight: padX,
      }}
    >
      <div className="fu" style={{ animationDelay: "0s" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.40em",
            color: C.text3,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          ✦ &nbsp;Bienvenue sur&nbsp; ✦
        </p>
        <div
          style={{
            height: 1,
            width: isXs ? 140 : isSm ? 180 : 240,
            margin: "0 auto",
            background: `linear-gradient(90deg,transparent,${C.borderMid},transparent)`,
          }}
        />
      </div>

      <h1
        className="fu"
        style={{
          fontSize: titleSize,
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 600,
          fontStyle: "italic",
          color: C.text1,
          letterSpacing: "0.04em",
          marginTop: isXs ? 16 : isSm ? 20 : 24,
          marginBottom: isXs ? 8 : 12,
          textShadow: `0 2px 32px rgba(91,156,189,.14)`,
          animationDelay: "0.1s",
          lineHeight: 1.2,
        }}
      >
        ImpactTrip
      </h1>

      <p
        className="fu"
        style={{
          fontSize: subtitleSize,
          fontFamily: "'Cormorant Garamond',serif",
          letterSpacing: "0.22em",
          color: C.text3,
          textTransform: "uppercase",
          marginBottom: isXs ? 20 : 28,
          animationDelay: "0.18s",
        }}
      >
        Transformez votre séjour en engagement
      </p>

      <div
        className="fu"
        style={{
          maxWidth: isXs ? "100%" : isSm ? 480 : bp === "md" ? 600 : 720,
          animationDelay: "0.26s",
        }}
      >
        <p
          style={{
            fontSize: descSize,
            fontFamily: "'Cormorant Garamond',serif",
            color: C.text2,
            lineHeight: 1.85,
            letterSpacing: "0.02em",
          }}
        >
          Découvrez comment chaque choix pendant votre séjour à l'Hôtel Le
          Boucan Canot peut transformer votre expérience en acte d'engagement
          mesurable pour le territoire.
        </p>
      </div>
    </div>
  );
}

// ─── Story Card ──────────────────────────────────────────────────────────────
function StoryCard({
  icon,
  title,
  desc,
  accent,
  accentLight,
  bp,
  clickable,
  onClick,
}) {
  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const cardPad = isXs
    ? "24px 20px"
    : isSm
      ? "32px 28px"
      : bp === "md"
        ? "40px 36px"
        : "48px 44px";
  const iconSize = isXs ? 56 : isSm ? 64 : bp === "md" ? 72 : 88;
  const titleSize = isXs ? 20 : isSm ? 23 : bp === "md" ? 26 : 30;
  const descSize = isXs ? 13 : isSm ? 13 : bp === "md" ? 14 : 15;

  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        background: C.bgCard,
        borderRadius: 20,
        border: `1px solid ${C.borderLight}`,
        padding: cardPad,
        boxShadow: `0 8px 40px ${C.shadow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: isXs ? 14 : 18,
        transition: "all .3s ease",
        cursor: clickable ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 16px 60px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(-4px)";
        if (clickable) {
          e.currentTarget.style.background = accent;
          e.currentTarget.querySelector("h3").style.color = "#fff";
          e.currentTarget.querySelector("p").style.color =
            "rgba(255,255,255,0.9)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.borderLight;
        e.currentTarget.style.boxShadow = `0 8px 40px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(0)";
        if (clickable) {
          e.currentTarget.style.background = C.bgCard;
          e.currentTarget.querySelector("h3").style.color = C.text1;
          e.currentTarget.querySelector("p").style.color = C.text2;
        }
      }}
    >
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: "50%",
          background: `linear-gradient(135deg,${accentLight},${C.bgAlt})`,
          border: `1px solid ${accent}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isXs ? 32 : isSm ? 40 : 48,
          boxShadow: `0 4px 20px ${accent}22`,
          transition: "all .3s ease",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: titleSize,
          fontWeight: 600,
          color: C.text1,
          letterSpacing: "0.02em",
          transition: "color .3s ease",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: descSize,
          color: C.text2,
          lineHeight: 1.7,
          letterSpacing: "0.01em",
          transition: "color .3s ease",
        }}
      >
        {desc}
      </p>

      <div
        style={{
          width: 4,
          height: 32,
          background: `linear-gradient(180deg,${accentLight},${accent})`,
          borderRadius: 2,
          marginTop: 4,
          transition: "all .3s ease",
        }}
      />

      {clickable && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 11 : 12,
            color: accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 8,
            transition: "all .3s ease",
          }}
        >
          Cliquez pour explorer →
        </p>
      )}
    </div>
  );
}

// ─── CTA Block ──────────────────────────────────────────────────────────────
function CTABlock({ onExplore, bp }) {
  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const btnPad = isXs
    ? "14px 28px"
    : isSm
      ? "16px 36px"
      : bp === "md"
        ? "18px 44px"
        : "20px 52px";
  const btnFz = isXs ? 14 : isSm ? 15 : bp === "md" ? 16 : 18;
  const maxW = isXs ? "100%" : isSm ? 500 : 700;

  return (
    <div
      className="fu"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: maxW,
        padding: isXs ? "32px 20px" : isSm ? "48px 28px" : "64px 40px",
        animationDelay: "0.34s",
      }}
    >
      <div
        style={{
          height: 1,
          width: isXs ? 100 : isSm ? 140 : 180,
          margin: "0 auto 20px",
          background: `linear-gradient(90deg,transparent,${C.borderMid},transparent)`,
        }}
      />

      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isXs ? 14 : isSm ? 15 : 16,
          color: C.text2,
          lineHeight: 1.8,
          marginBottom: isXs ? 24 : 32,
          letterSpacing: "0.01em",
        }}
      >
        Prêt à explorer les activités qui transforment votre séjour ? Découvrez
        comment chaque expérience contribue à un impact réel sur le territoire.
      </p>

      <button
        onClick={onExplore}
        style={{
          padding: btnPad,
          borderRadius: 14,
          border: "none",
          background: `linear-gradient(135deg,${C.green1},${C.green3})`,
          color: "#fff",
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: btnFz,
          letterSpacing: "0.16em",
          cursor: "pointer",
          transition: "all .3s ease",
          boxShadow: `0 8px 32px ${C.green3}33`,
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 12px 48px ${C.green3}55`;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 32px ${C.green3}33`;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Découvrir les activités
      </button>

      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 11,
          color: C.text3,
          marginTop: 16,
          letterSpacing: "0.1em",
        }}
      >
        ✦ &nbsp; Responsable &nbsp; ✦
      </p>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function BoucanConnectHome({
  onNavigateToLocal,
  onNavigateToActivities,
  onNavigateToImpact,
}) {
  const bp = useBreakpoint();
  const isXs = bp === "xs";
  const isSm = bp === "sm";

  const gridCols = isXs ? 1 : isSm ? 2 : bp === "md" ? 2 : 4;
  const gridGap = isXs ? 16 : isSm ? 20 : bp === "md" ? 24 : 28;
  const sectionPad = isXs
    ? "32px 20px"
    : isSm
      ? "48px 28px"
      : bp === "md"
        ? "64px 40px"
        : "80px 60px";
  const containerMaxW = isXs ? "100%" : isSm ? 600 : bp === "md" ? 900 : 1200;

  const storyItems = [
    {
      icon: "🌿",
      title: "Engagé sur le Territoire",
      desc: "L'Hôtel Le Boucan Canot est certifié Clef Verte et s'inscrit dans une démarche responsable. Nous travaillons activement avec les producteurs locaux et protégeons les écosystèmes de La Réunion.",
      accent: C.green3,
      accentLight: C.green1,
      clickable: false,
    },
    {
      icon: "👥",
      title: "Connecté aux Producteurs",
      desc: "Découvrez nos différents acteurs locaux aux 4 coins de l'île: fermiers, guides, artisans. Votre soutien les aide à prospérer et à préserver l'authenticité du territoire.",
      accent: C.blue3,
      accentLight: C.blue1,
      clickable: true,
      onClick: onNavigateToLocal,
    },
    {
      icon: "📊",
      title: "Impact Mesuré",
      desc: "Voyez en temps réel comment vos choix contribuent. Chaque décision génère un impact mesurable : économies d'énergie, revenus locaux, engagement territorial.",
      accent: C.gold,
      accentLight: "#f0ebd0",
      clickable: true,
      onClick: onNavigateToImpact,
    },
    {
      icon: "🎯",
      title: "Nos Activités",
      desc: "Explorez notre sélection d'activités responsables et engagées. Chaque expérience a été pensée pour maximiser votre impact positif sur le territoire tout en créant des souvenirs inoubliables.",
      accent: C.blue3,
      accentLight: C.blue1,
      clickable: true,
      onClick: onNavigateToActivities,
    },
  ];

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
            top: isXs ? "-20%" : isSm ? "-18%" : "-12%",
            right: isXs ? "-12%" : isSm ? "-10%" : "-8%",
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
            bottom: isXs ? "-25%" : isSm ? "-20%" : "-14%",
            left: isXs ? "-14%" : isSm ? "-8%" : "-6%",
            width: isXs ? 280 : isSm ? 420 : 740,
            height: isXs ? 280 : isSm ? 420 : 740,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.green1}38,transparent 68%)`,
            pointerEvents: "none",
          }}
        />

        <HeroBlock bp={bp} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: sectionPad,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: containerMaxW,
              display: "grid",
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: gridGap,
            }}
          >
            {storyItems.map((item, idx) => (
              <div
                key={idx}
                className="fu"
                style={{ animationDelay: `${0.42 + idx * 0.08}s` }}
              >
                <StoryCard
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  accent={item.accent}
                  accentLight={item.accentLight}
                  bp={bp}
                  clickable={item.clickable || false}
                  onClick={item.onClick}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="fu"
          style={{
            position: "relative",
            zIndex: 10,
            width: isXs ? "60%" : isSm ? "50%" : "40%",
            height: 1,
            background: `linear-gradient(90deg,transparent,${C.borderMid},transparent)`,
            margin: isXs ? "24px 0" : isSm ? "32px 0" : "48px 0",
            animationDelay: "0.66s",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isXs
              ? "32px 20px 64px"
              : isSm
                ? "48px 28px 80px"
                : "64px 40px 100px",
          }}
        >
          <CTABlock onExplore={onNavigateToActivities} bp={bp} />
        </div>
      </div>
    </>
  );
}
