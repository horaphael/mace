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

const SKILLS = [
  {
    id: "Hélicoptère",
    glyph: "🚁",
    name: "Hélicoptère",
    accent: C.blue3,
    accentLight: C.blue1,
    image: "/img/image.png",
    desc: "Découvrez l'île autrement grâce à nos tours en hélicoptère. Survolez des paysages spectaculaires, admirez les lagons, les falaises et les sites naturels emblématiques depuis le ciel.",
    address: "Aéroport de Saint-Gilles, La Réunion",
    phone: "+262 262 45 23 45",
    website: "www.helicopteres-reunion.re",
    operator: "Hélicoptères Réunion",
  },
  {
    id: "Expeditions",
    glyph: "⛰️",
    name: "Expéditions",
    accent: C.green3,
    accentLight: C.green1,
    image: "/img/image.jpg",
    desc: "Partez à l'aventure avec nos expéditions à La Réunion et explorez les merveilles cachées de l'île. Découvrez les impressionnants tunnels de lave et les paysages volcaniques uniques.",
    address: "Bureau d'accueil, Cilaos, La Réunion",
    phone: "+262 262 48 12 34",
    website: "www.expeditions-reunion.fr",
    operator: "Guides Montagne Réunion",
  },
  {
    id: "plongée",
    glyph: "🤿",
    name: "Plongée",
    accent: C.blue2,
    accentLight: C.blue1,
    image: "/img/plong.jpg",
    desc: "Explorez les fonds marins exceptionnels de La Réunion lors d'une sortie en plongée. Accompagné de moniteurs certifiés, découvrez un monde sous-marin riche en coraux et poissons.",
    address: "Port de Saint-Gilles, La Réunion",
    phone: "+262 262 55 66 77",
    website: "www.plongee-reunion.com",
    operator: "Centre de Plongée Océan Indien",
  },
  {
    id: "VTT",
    glyph: "🚲",
    name: "VTT",
    accent: C.green2,
    accentLight: C.green1,
    image: "/img/en-tete6.jpg",
    desc: "Partez à l'aventure en VTT à La Réunion et découvrez l'île à travers ses sentiers spectaculaires. Entre forêts, montagnes et panoramas sur l'océan.",
    address: "Base VTT de Mafate, Saint-Gilles",
    phone: "+262 262 34 56 78",
    website: "www.vtt-reunion.re",
    operator: "VTT Aventure Réunion",
  },
  {
    id: "Aquatique",
    glyph: "🌊",
    name: "Aquatique",
    accent: C.gold,
    accentLight: "#f0ebd0",
    image: "/img/sortie-bateaux.jpg",
    desc: "Embarquez pour une sortie en bateau au large de La Réunion et partez à la découverte de la faune marine. Selon la saison, observez les baleines et les dauphins.",
    address: "Marina de Saint-Gilles, La Réunion",
    phone: "+262 262 23 45 67",
    website: "www.sorties-bateau-reunion.com",
    operator: "Boat Tours Réunion",
  },
  {
    id: "Parapente",
    glyph: "🪂",
    name: "Parapente",
    accent: C.blue3,
    accentLight: C.blue1,
    image: "/img/parapante.jpg",
    desc: "Prenez de la hauteur et découvrez La Réunion autrement avec une sortie en parapente. Accompagné d'un moniteur expérimenté, survolez les paysages spectaculaires.",
    address: "Décollage de Champ Borne, Saint-Gilles",
    phone: "+262 692 45 67 89",
    website: "www.parapente-reunion.fr",
    operator: "Parapente Aventure",
  },
  {
    id: "Canyoning",
    glyph: "🏞️",
    name: "Canyoning",
    accent: C.blue3,
    accentLight: C.blue1,
    image: "/img/reunion-canoyning-2.jpg",
    desc: "Vivez une aventure inoubliable avec une sortie en canyoning à La Réunion. Entre cascades, toboggans naturels et descentes en rappel.",
    address: "Site de Trou Blanc, Salazie",
    phone: "+262 262 67 89 01",
    website: "www.canyoning-reunion.com",
    operator: "Canyoning Réunion Pro",
  },
  {
    id: "Musée",
    glyph: "🏛️",
    name: "Musée",
    accent: C.blue3,
    accentLight: C.blue1,
    image: "/img/musee.jpg",
    desc: "Partez à la découverte des musées de La Réunion et plongez dans l'histoire, la culture et les traditions de l'île.",
    address: "Musée de Villèle, Saint-Paul",
    phone: "+262 262 45 59 02",
    website: "www.musee-villele.re",
    operator: "Patrimoine Réunion",
  },
  {
    id: "Commerce artisanal",
    glyph: "🛒",
    name: "Commerce artisanal",
    accent: C.blue3,
    accentLight: C.blue1,
    image: "/img/marché.jpg",
    desc: "Partez à la rencontre des artisans locaux et découvrez le savoir-faire unique de La Réunion. Explorez des créations authentiques.",
    address: "Marché artisanal de Saint-Gilles",
    phone: "+262 262 12 34 56",
    website: "www.artisans-reunion.com",
    operator: "Coopérative Artisans Locaux",
  },
];

const AMOUNTS = [2, 5, 10, 20];

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

const S = {
  cardW: { xl: 340, lg: 290, md: 250, sm: 210, xs: 175 },
  cardH: { xl: 490, lg: 410, md: 360, sm: 305, xs: 265 },
  spacing: { xl: 440, lg: 370, md: 320, sm: 250, xs: 195 },
  carH: { xl: 600, lg: 510, md: 450, sm: 370, xs: 300 },
  glyph: { xl: 110, lg: 92, md: 80, sm: 68, xs: 58 },
  glyFont: { xl: 46, lg: 38, md: 33, sm: 28, xs: 23 },
  cName: { xl: 38, lg: 32, md: 28, sm: 23, xs: 19 },
  chevW: { xl: 96, lg: 82, md: 70, sm: 56, xs: 42 },
  chevSvg: { xl: 60, lg: 50, md: 44, sm: 36, xs: 28 },
  titleMin: { xl: 88, lg: 70, md: 60, sm: 42, xs: 34 },
  titleMax: { xl: 140, lg: 112, md: 96, sm: 68, xs: 52 },
  detailW: { xl: 1060, lg: 900, md: 780, sm: 680, xs: "100%" },
};

function v(key, bp) {
  return S[key][bp];
}

// ─── InfoBlock - Infos pratiques ──────────────────────────────────────
function InfoBlock({ skill, bp }) {
  const isXs = bp === "xs";
  const h3size = bp === "xl" ? 26 : bp === "lg" ? 24 : bp === "md" ? 22 : 20;
  const infoSize = bp === "xl" ? 16 : bp === "xs" ? 14 : 15;

  return (
    <div
      style={{
        position: "relative",
        background: C.bgCard,
        borderRadius: 22,
        border: `1px solid ${C.borderLight}`,
        padding: isXs ? "24px 22px" : bp === "xl" ? "40px 36px" : "32px 28px",
        boxShadow: `0 8px 40px ${C.shadow}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: `linear-gradient(to bottom, rgba(200, 223, 240, 0.5) 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: h3size,
            fontWeight: 600,
            color: C.text1,
            marginBottom: 20,
          }}
        >
          Infos Pratiques
        </h3>

        <div style={{ marginBottom: 18 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: C.text3,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Opérateur
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: infoSize,
              color: C.text1,
              fontWeight: 500,
            }}
          >
            {skill.operator}
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: C.text3,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            📍 Adresse
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: infoSize,
              color: C.text2,
              lineHeight: 1.6,
            }}
          >
            {skill.address}
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: C.text3,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            ☎️ Téléphone
          </p>
          <a
            href={`tel:${skill.phone}`}
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: infoSize,
              color: skill.accent,
              textDecoration: "none",
              fontWeight: 500,
              transition: "all .2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            {skill.phone}
          </a>
        </div>

        <div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: C.text3,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            🌐 Site Web
          </p>
          <a
            href={`https://${skill.website}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: infoSize,
              color: skill.accent,
              textDecoration: "none",
              fontWeight: 500,
              transition: "all .2s",
              display: "inline-block",
              wordBreak: "break-all",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            {skill.website}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── TipBlock - Donation (plus petit) ──────────────────────────────────
function TipBlock({ skill, bp, onDonate = () => {} }) {
  const [selected, setSelected] = useState(5);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);

  const finalAmount = custom !== "" ? parseFloat(custom) || 0 : selected;
  const isXs = bp === "xs";
  const pad = isXs ? "20px 18px 24px" : "28px 26px 32px";
  const h3 = bp === "xl" ? 22 : bp === "lg" ? 20 : bp === "xs" ? 18 : 19;

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 20,
        border: `1px solid ${C.borderLight}`,
        padding: pad,
        boxShadow: `0 8px 40px ${C.shadow}`,
      }}
    >
      {done ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto 14px",
              background: `linear-gradient(135deg,${C.green1},${C.bgAlt})`,
              border: `1px solid ${C.green2}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            🌿
          </div>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: h3,
              fontWeight: 600,
              color: C.text1,
              marginBottom: 10,
            }}
          >
            Don de {finalAmount}€ reçu
          </h4>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 14,
              color: C.text2,
              marginBottom: 16,
            }}
          >
            Merci pour votre soutien !
          </p>
          <button
            onClick={() => {
              setDone(false);
              setCustom("");
              setSelected(5);
            }}
            style={{
              padding: "8px 20px",
              borderRadius: 10,
              border: `1.5px solid ${C.borderMid}`,
              background: "transparent",
              color: C.text2,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 12,
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.green3)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = C.borderMid)
            }
          >
            Autre don
          </button>
        </div>
      ) : (
        <>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: h3,
              fontWeight: 600,
              color: C.text1,
              marginBottom: 14,
            }}
          >
            Soutenir
          </h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {AMOUNTS.map((amt) => {
              const isActive = custom === "" && selected === amt;
              return (
                <button
                  key={amt}
                  onClick={() => {
                    setSelected(amt);
                    setCustom("");
                  }}
                  style={{
                    flex: "1 1 55px",
                    padding: "10px 0",
                    borderRadius: 10,
                    border: `1px solid ${isActive ? skill.accent : C.borderLight}`,
                    background: isActive ? skill.accentLight : "transparent",
                    color: isActive ? skill.accent : C.text2,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = skill.accent;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = C.borderLight;
                  }}
                >
                  {amt}€
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${C.borderLight}`,
              borderRadius: 10,
              background: C.bgAlt,
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                padding: "0 12px",
                fontSize: 14,
                color: C.text3,
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              €
            </span>
            <input
              type="number"
              min="1"
              placeholder="Montant"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                padding: "10px 0 10px 4px",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 14,
                color: C.text1,
                outline: "none",
              }}
            />
          </div>

          <button
            onClick={() => {
              if (finalAmount > 0) {
                onDonate(skill, finalAmount);
                setDone(true);
              }
            }}
            disabled={finalAmount <= 0}
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: 12,
              border: "none",
              background:
                finalAmount > 0
                  ? `linear-gradient(135deg,${skill.accentLight},${skill.accent})`
                  : C.borderLight,
              color: finalAmount > 0 ? "#fff" : C.text3,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: finalAmount > 0 ? "pointer" : "not-allowed",
              transition: "all .2s",
            }}
          >
            {finalAmount > 0 ? `Donner ${finalAmount}€` : "Montant"}
          </button>
        </>
      )}
    </div>
  );
}

// ─── DetailPage ────────────────────────────────────────────────────────
function DetailPage({ skill, onBack, bp, onDonate }) {
  const maxW = v("detailW", bp);
  const px = bp === "xs" ? "0 16px" : bp === "xl" ? "0 40px" : "0 28px";
  const isXs = bp === "xs";
  const h2size =
    bp === "xl"
      ? 42
      : bp === "lg"
        ? 38
        : bp === "md"
          ? 34
          : bp === "sm"
            ? 30
            : 26;
  const descSize = bp === "xl" ? 18 : bp === "xs" ? 15 : 16;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: bp === "xs" ? 24 : bp === "xl" ? 52 : 36,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          padding: `0 ${isXs ? "16px" : bp === "xl" ? "40px" : "28px"} ${bp === "xl" ? 32 : 22}px`,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: bp === "xl" ? 16 : 14,
            color: C.text3,
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.text1)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.text3)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Retour
        </button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          padding: `0 ${isXs ? "16px" : bp === "xl" ? "40px" : "28px"} ${bp === "xl" ? 32 : 24}px`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: h2size,
            fontWeight: 600,
            fontStyle: "italic",
            color: C.text1,
            letterSpacing: "0.02em",
          }}
        >
          {skill.name}
        </h1>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          padding: px,
          display: "grid",
          gridTemplateColumns: isXs ? "1fr" : "1fr 1fr",
          gap: isXs ? 20 : 32,
          position: "relative",
        }}
      >
        {!isXs && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "50%",
              width: "150%",
              height: "200px",
              background: `linear-gradient(135deg, transparent 0%, rgba(200, 223, 240, 0.3) 40%, rgba(200, 223, 240, 0.15) 100%)`,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 18,
              overflow: "visible",
              boxShadow: `0 8px 40px ${C.shadow}`,
            }}
          >
            <img
              src={skill.image}
              alt={skill.name}
              style={{
                width: "100%",
                height: isXs ? 280 : 360,
                objectFit: "cover",
                display: "block",
                borderRadius: 18,
              }}
            />
          </div>

          <div
            style={{
              background: C.bgCard,
              borderRadius: 18,
              border: `1px solid ${C.borderLight}`,
              padding: isXs ? "22px" : "32px",
              boxShadow: `0 8px 40px ${C.shadow}`,
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 20 : 22,
                fontWeight: 600,
                color: C.text1,
                marginBottom: 14,
              }}
            >
              À propos
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: descSize,
                color: C.text2,
                lineHeight: 1.8,
              }}
            >
              {skill.desc}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          <InfoBlock skill={skill} bp={bp} />
          <TipBlock skill={skill} bp={bp} onDonate={onDonate} />
        </div>
      </div>
    </div>
  );
}

// ─── SkillCard (Carousel) ─────────────────────────────────────────────
function SkillCard({ skill, offset, onShift, onOpen, bp }) {
  const spacing = v("spacing", bp);
  const cardW = v("cardW", bp);
  const cardH = v("cardH", bp);
  const gs = v("glyph", bp);
  const gf = v("glyFont", bp);
  const cn = v("cName", bp);

  const getY = (o) => {
    const d =
      bp === "xl"
        ? [90, 44, 40, 120]
        : bp === "lg"
          ? [76, 38, 34, 104]
          : bp === "md"
            ? [66, 32, 28, 90]
            : bp === "sm"
              ? [54, 24, 22, 72]
              : [42, 18, 16, 56];
    return o === 0
      ? -d[0]
      : Math.abs(o) === 1
        ? -d[1]
        : Math.abs(o) === 2
          ? d[2]
          : d[3];
  };

  const rotX =
    Math.abs(offset) === 3
      ? -12
      : Math.abs(offset) === 2
        ? -8
        : Math.abs(offset) === 1
          ? -4
          : 0;
  const sc = offset === 0 ? 1.08 : 0.84;
  const op =
    offset === 0
      ? 1
      : Math.abs(offset) >= 3
        ? 0
        : Math.abs(offset) === 2
          ? 0.18
          : 0.5;
  const filt =
    offset === 0 ? "none" : "brightness(0.85) blur(1.5px) saturate(0.65)";
  const z = offset === 0 ? 20 : 10 - Math.abs(offset);
  const gap = bp === "xl" ? 26 : bp === "lg" ? 22 : 18;
  const pad =
    bp === "xl" ? "44px 36px" : bp === "lg" ? "38px 32px" : "28px 22px";

  return (
    <div
      style={{
        position: "absolute",
        transform: `translateX(${offset * spacing}px) translateY(${getY(offset)}px) rotateX(${rotX}deg) scale(${sc})`,
        opacity: op,
        zIndex: z,
        filter: filt,
        cursor: offset !== 0 ? "pointer" : "default",
        transition: "all 500ms cubic-bezier(.4,0,.2,1)",
      }}
      onClick={() => offset !== 0 && onShift(offset)}
    >
      <div
        style={{
          width: cardW,
          height: cardH,
          borderRadius: 28,
          background: C.bgCard,
          border: `1.5px solid ${offset === 0 ? skill.accent : C.borderLight}`,
          boxShadow:
            offset === 0
              ? `0 40px 90px ${C.shadow},0 0 0 1px ${skill.accentLight}`
              : `0 6px 24px rgba(44,61,79,.05)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap,
          padding: pad,
          position: "relative",
          transition: "all 500ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "18%",
            right: "18%",
            height: 4,
            borderRadius: "0 0 6px 6px",
            background: `linear-gradient(90deg,${skill.accentLight},${skill.accent},${skill.accentLight})`,
          }}
        />
        <div
          style={{
            width: gs,
            height: gs,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${skill.accentLight},${C.bgAlt})`,
            border: `1px solid ${skill.accent}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: gf,
            boxShadow: `0 4px 20px ${skill.accent}22`,
          }}
        >
          {skill.glyph}
        </div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: cn,
            fontWeight: 600,
            color: C.text1,
          }}
        >
          {skill.name}
        </p>
        {offset === 0 && (
          <button
            style={{
              width: "100%",
              padding: bp === "xl" ? "16px 0" : "12px 0",
              borderRadius: 12,
              border: `1.5px solid ${skill.accent}`,
              background: "transparent",
              color: skill.accent,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: bp === "xl" ? 15 : 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = skill.accent;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = skill.accent;
            }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(skill);
            }}
          >
            Détails
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────
export default function Activities({ onBackToHome, onAddDonation = () => {} }) {
  const bp = useBreakpoint();
  const [selIdx, setSelIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [openSkill, setOpenSkill] = useState(null);

  const dragStart = (x) => {
    setDragging(true);
    setDragX(x);
  };
  const dragMove = (x) => {
    if (!dragging) return;
    if (Math.abs(dragX - x) >= 60) {
      setSelIdx((p) => (dragX - x > 0 ? p + 1 : p - 1));
      setDragging(false);
    }
  };
  const dragEnd = () => setDragging(false);

  const items = Array.from({ length: 7 }, (_, i) => {
    const offset = i - 3;
    let di = (selIdx + offset) % SKILLS.length;
    if (di < 0) di += SKILLS.length;
    return { ...SKILLS[di], originalIdx: di, offset, key: selIdx + offset };
  });

  const carH = v("carH", bp);
  const chevW = v("chevW", bp);
  const chevS = v("chevSvg", bp);
  const tMin = v("titleMin", bp);
  const tMax = v("titleMax", bp);

  const handleDonate = (skill, amount) => {
    onAddDonation(skill, amount);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes chevFloat{0%,100%{opacity:.45}50%{opacity:.82}}
        .fu{animation:fadeUp .78s ease both;}.si{animation:slideIn .44s ease both;}.chev{animation:chevFloat 2.8s ease-in-out infinite;}
        html,body,#root{width:100vw!important;max-width:100vw!important;margin:0!important;padding:0!important;overflow-x:hidden;}
        body>div,#root>div{width:100vw!important;max-width:100vw!important;}
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
            height: 3,
            background: `linear-gradient(90deg,transparent,${C.blue2},${C.green2},${C.blue2},transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,transparent,${C.green2},${C.blue2},${C.green2},transparent)`,
            zIndex: 5,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-12%",
            right: "-8%",
            width: bp === "xl" ? 800 : 500,
            height: bp === "xl" ? 800 : 500,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.blue1}48,transparent 68%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-14%",
            left: "-6%",
            width: bp === "xl" ? 740 : 480,
            height: bp === "xl" ? 740 : 480,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.green1}38,transparent 68%)`,
            pointerEvents: "none",
          }}
        />

        {openSkill ? (
          <div className="si" style={{ width: "100%" }}>
            <DetailPage
              skill={openSkill}
              onBack={() => setOpenSkill(null)}
              bp={bp}
              onDonate={handleDonate}
            />
          </div>
        ) : (
          <>
            {onBackToHome && (
              <div
                style={{
                  position: "absolute",
                  top: 28,
                  left: 28,
                  zIndex: 40,
                }}
              >
                <button
                  onClick={onBackToHome}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: C.bgCard,
                    border: `1.5px solid ${C.borderLight}`,
                    borderRadius: 10,
                    padding: "10px 18px",
                    cursor: "pointer",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 13,
                    color: C.text3,
                    transition: "all .2s",
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
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                  </svg>
                  Accueil
                </button>
              </div>
            )}

            <div
              style={{
                position: "relative",
                zIndex: 10,
                marginTop: 40,
                textAlign: "center",
              }}
              className="fu"
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.40em",
                  color: C.text3,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                ✦ Découvrez la Réunion ! ✦
              </p>
            </div>

            <h1
              className="fu"
              style={{
                position: "relative",
                zIndex: 10,
                fontSize: `clamp(${tMin}px,7.5vw,${tMax}px)`,
                fontWeight: 600,
                fontStyle: "italic",
                color: C.text1,
                marginTop: 16,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Activités
            </h1>

            <div
              style={{
                position: "relative",
                width: "100%",
                zIndex: 10,
                height: carH,
              }}
            >
              <button
                className="chev"
                onClick={() => setSelIdx((p) => p - 1)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: chevW,
                  border: "none",
                  background: `linear-gradient(to right,rgba(240,244,248,.88),transparent)`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 30,
                }}
              >
                <svg width={chevS} height={carH} viewBox="0 0 60 450">
                  <path
                    d="M 50 25 Q 15 225 50 425"
                    stroke={C.blue2}
                    strokeWidth="5.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <button
                className="chev"
                onClick={() => setSelIdx((p) => p + 1)}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: chevW,
                  border: "none",
                  background: `linear-gradient(to left,rgba(240,244,248,.88),transparent)`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 30,
                }}
              >
                <svg width={chevS} height={carH} viewBox="0 0 60 450">
                  <path
                    d="M 10 25 Q 45 225 10 425"
                    stroke={C.blue2}
                    strokeWidth="5.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: dragging ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => dragStart(e.clientX)}
                onMouseMove={(e) => dragMove(e.clientX)}
                onMouseUp={dragEnd}
                onMouseLeave={dragEnd}
                onTouchStart={(e) => dragStart(e.touches[0].clientX)}
                onTouchMove={(e) => {
                  e.preventDefault();
                  dragMove(e.touches[0].clientX);
                }}
                onTouchEnd={dragEnd}
              >
                {items.map((item) => (
                  <SkillCard
                    key={item.key}
                    skill={item}
                    offset={item.offset}
                    onShift={(o) => setSelIdx((p) => p + o)}
                    onOpen={setOpenSkill}
                    bp={bp}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
                marginTop: 40,
                marginBottom: 60,
              }}
              className="fu"
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: C.text3,
                  textTransform: "uppercase",
                }}
              >
                Glisser pour naviguer
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
