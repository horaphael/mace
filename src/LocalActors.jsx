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

const DEFAULT_ACTOR_IMAGE = "/img/marché.jpg";
const ACTOR_IMAGE_BY_NAME = {
  "Sophie et Jean-Luc": "/img/producteur4.jpg",
  "Francine Piton": "/img/producteur6.jpg",
};

const ACTEURS_LOCAUX = [
  {
    id: 1,
    nom: "Bernard Duval",
    titre: "Agriculteur Bio - Fruits & Légumes",
    image: "/img/producteur1.jpg",
    histoire:
      "Depuis 25 ans, Bernard cultive les meilleures terres de l'Ouest. Passionné par l'agriculture biologique, il a converti sa ferme en 2010 et produit maintenant les fruits et légumes les plus frais de La Réunion.",
    description:
      "Cultivateur de fruits et légumes biologiques : tomates, courges, poivrons, lettues. Livraisons directes aux restaurants partenaires. Engagé pour la préservation des sols.",
    adresse: "Chemin des Flamboyants, Saint-Paul, 97460",
    telephone: "+262 262 45 23 45",
    email: "bernard.duval@ferme-bio.re",
    accent: C.green3,
    accentLight: C.green1,
  },
  {
    id: 2,
    nom: "Marie Legros",
    titre: "Apicultrice - Miel Créole",
    image: "/img/producteur2.jpg",
    histoire:
      "Marie a grandi dans les champs de sa famille. Amoureux des abeilles, elle a lancé son rucher en 2015 et produit un miel exceptionnel qui ravit les palais locaux et internationaux.",
    description:
      "Production de miel pur créole, gelée royale et pollen. Les abeilles butinent les fleurs endémiques de l'Ouest. Visite du rucher possible sur rendez-vous.",
    adresse: "Route de la Montagne, Trois-Bassins, 97460",
    telephone: "+262 692 34 56 78",
    email: "marie.legros@miel-reunion.re",
    accent: C.gold,
    accentLight: "#f0ebd0",
  },
  {
    id: 3,
    nom: "Antoine Roussel",
    titre: "Distillerie - Rhum Agricole",
    image: "/img/producteur3.jpg",
    histoire:
      "4ème génération de distilleur. Antoine perpétue l'héritage familial en produisant un rhum agricole de qualité, respectueux de la tradition créole et de l'environnement.",
    description:
      "Distillation artisanale de rhum agricole à partir de canne à sucre bio. Visite de la distillerie et dégustation sur rendez-vous. Production limitée et authentique.",
    adresse: "Domaine de Savanna, Saint-Paul, 97460",
    telephone: "+262 262 78 90 12",
    email: "contact@distillerie-roussel.re",
    accent: C.blue3,
    accentLight: C.blue1,
  },
  {
    id: 4,
    nom: "Sophie et Jean-Luc",
    titre: "Artisans Textile - Créations Locales",
    image: ACTOR_IMAGE_BY_NAME["Sophie et Jean-Luc"],
    histoire:
      "Couple passionné par l'artisanat textile. Ils créent des pièces uniques inspirées par la culture créole, utilisant des techniques traditionnelles et des matières durables.",
    description:
      "Création de vêtements, sacs et accessoires 100% réunionnais. Utilisation de tissus durables et teintures naturelles. Chaque pièce est unique et authentique.",
    adresse: "Atelier de l'Ouest, Trois-Bassins, 97460",
    telephone: "+262 262 91 23 45",
    email: "sophie.jeanluc@textile-reunion.re",
    accent: C.blue2,
    accentLight: C.blue1,
  },
  {
    id: 5,
    nom: "Yves Bernard",
    titre: "Guide Nature - Randonnées Engagées",
    image: "/img/producteur5.jpg",
    histoire:
      "Guide de montagne depuis 20 ans. Yves connaît chaque sentier de l'Ouest. Il partage sa passion pour la nature avec respect et sensibilise ses clients à la préservation de l'environnement.",
    description:
      "Randonnées guidées en petit groupe dans les sentiers secrets de l'Ouest. Spécialisé en randos éco-responsables avec focus sur la biodiversité locale et l'histoire des lieux.",
    adresse: "Bureau Montagne, Saint-Paul, 97460",
    telephone: "+262 692 78 90 12",
    email: "yves.bernard@guide-reunion.re",
    accent: C.green3,
    accentLight: C.green1,
  },
  {
    id: 6,
    nom: "Francine Piton",
    titre: "Pâtisserie Créole - Gâteaux Traditionnels",
    image: ACTOR_IMAGE_BY_NAME["Francine Piton"],
    histoire:
      "Francine perpétue les recettes de sa grand-mère. Depuis 30 ans, elle prépare chaque jour les meilleurs gâteaux créoles de la région, sans jamais compromettre sur la qualité.",
    description:
      "Production quotidienne de gâteaux créoles traditionnels : gateau à l'ananas, coco, cannelle. Aussi : confitures maison et spécialités créoles. Commandes spéciales acceptées.",
    adresse: "Pâtisserie du Ciel, Trois-Bassins, 97460",
    telephone: "+262 262 34 56 78",
    email: "francine.piton@patisserie-reunion.re",
    accent: C.gold,
    accentLight: "#f0ebd0",
  },
];

const AMOUNTS = [5, 10, 20, 50];

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

// ─── Fiche Acteur Local ──────────────────────────────────────────────────────
function FicheActeur({ acteur, bp }) {
  const [showDonation, setShowDonation] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [donationDone, setDonationDone] = useState(false);

  const isXs = bp === "xs";
  const isSm = bp === "sm";

  const finalAmount =
    customAmount !== "" ? parseFloat(customAmount) || 0 : selectedAmount;
  const cardPad = isXs ? "16px" : isSm ? "20px" : "24px";

  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: 20,
        border: `1px solid ${C.borderLight}`,
        overflow: "hidden",
        boxShadow: `0 8px 40px ${C.shadow}`,
        transition: "all .3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 60px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 40px ${C.shadow}`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "100%",
          height: isXs ? 200 : isSm ? 220 : 240,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg,${acteur.accentLight},${C.bgAlt})`,
        }}
      >
        <img
          src={acteur.image}
          alt={acteur.nom}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .3s ease",
          }}
          onError={(e) => {
            const img = e.currentTarget;
            const fallbackByName = ACTOR_IMAGE_BY_NAME[acteur.nom] || DEFAULT_ACTOR_IMAGE;
            if (img.src.endsWith(fallbackByName)) {
              img.onerror = null;
              img.src = DEFAULT_ACTOR_IMAGE;
              return;
            }
            img.src = fallbackByName;
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg,${acteur.accentLight},${acteur.accent})`,
          }}
        />
      </div>

      <div style={{ padding: cardPad }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 18 : isSm ? 20 : 22,
            fontWeight: 600,
            color: C.text1,
            marginBottom: 4,
            letterSpacing: "0.02em",
          }}
        >
          {acteur.nom}
        </h3>

        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 10 : 11,
            color: acteur.accent,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}
        >
          {acteur.titre}
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 12 : 13,
            color: C.text2,
            lineHeight: 1.6,
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          {acteur.histoire}
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isXs ? 12 : 13,
            color: C.text2,
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          {acteur.description}
        </p>

        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg,transparent,${C.borderLight},transparent)`,
            marginBottom: 14,
          }}
        />

        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 14, marginTop: 2 }}>📍</span>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 11 : 12,
                color: C.text2,
                lineHeight: 1.4,
              }}
            >
              {acteur.adresse}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>☎️</span>
            <a
              href={`tel:${acteur.telephone}`}
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 11 : 12,
                color: acteur.accent,
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              {acteur.telephone}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>✉️</span>
            <a
              href={`mailto:${acteur.email}`}
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isXs ? 11 : 12,
                color: acteur.accent,
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              {acteur.email}
            </a>
          </div>
        </div>

        {!showDonation ? (
          <button
            onClick={() => {
              setShowDonation(true);
              setDonationDone(false);
            }}
            style={{
              width: "100%",
              padding: isXs ? "10px 0" : "12px 0",
              borderRadius: 12,
              border: `1.5px solid ${acteur.accent}`,
              background: "transparent",
              color: acteur.accent,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isXs ? 12 : 13,
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all .2s",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = acteur.accent;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = acteur.accent;
            }}
          >
            Faire un don
          </button>
        ) : (
          <div
            style={{
              background: acteur.accentLight,
              borderRadius: 12,
              padding: isXs ? "12px" : "14px",
              border: `1px solid ${acteur.accent}22`,
            }}
          >
            {donationDone ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>✨</div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 12,
                    color: C.text1,
                    marginBottom: 8,
                  }}
                >
                  Merci pour votre soutien !
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    color: C.text2,
                    marginBottom: 8,
                  }}
                >
                  Don de {finalAmount}€ reçu
                </p>
                <button
                  onClick={() => setShowDonation(false)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: `1px solid ${acteur.accent}`,
                    background: "transparent",
                    color: acteur.accent,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = acteur.accent;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = acteur.accent;
                  }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 10,
                    color: C.text3,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Montant du don
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {AMOUNTS.map((amt) => {
                    const isActive =
                      customAmount === "" && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        style={{
                          flex: "1 1 45px",
                          padding: "6px 0",
                          borderRadius: 8,
                          border: `1px solid ${isActive ? acteur.accent : C.borderLight}`,
                          background: isActive ? acteur.accent : "transparent",
                          color: isActive ? "#fff" : C.text2,
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive)
                            e.currentTarget.style.borderColor = acteur.accent;
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
                    borderRadius: 8,
                    background: C.bgAlt,
                    overflow: "hidden",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      padding: "0 8px",
                      fontSize: 12,
                      color: C.text3,
                      fontFamily: "'Cormorant Garamond',serif",
                    }}
                  >
                    €
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Autre"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      background: "transparent",
                      padding: "6px 0 6px 4px",
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 12,
                      color: C.text1,
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    if (finalAmount > 0) setDonationDone(true);
                  }}
                  disabled={finalAmount <= 0}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    borderRadius: 8,
                    border: "none",
                    background: finalAmount > 0 ? acteur.accent : C.borderLight,
                    color: finalAmount > 0 ? "#fff" : C.text3,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    cursor: finalAmount > 0 ? "pointer" : "not-allowed",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    if (finalAmount > 0) e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    if (finalAmount > 0) e.currentTarget.style.opacity = "1";
                  }}
                >
                  {finalAmount > 0
                    ? `Donner ${finalAmount}€`
                    : "Montant requis"}
                </button>

                <button
                  onClick={() => setShowDonation(false)}
                  style={{
                    width: "100%",
                    padding: "6px 0",
                    marginTop: 6,
                    borderRadius: 8,
                    border: `1px solid ${C.borderLight}`,
                    background: "transparent",
                    color: C.text3,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.text3;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.borderLight;
                  }}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ActeursLocaux({ onBackToHome }) {
  const bp = useBreakpoint();
  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const isMd = bp === "md";

  const gridCols = isXs ? 1 : isSm ? 1 : isMd ? 2 : 3;
  const gridGap = isXs ? 12 : isSm ? 16 : 20;
  const containerPad = isXs
    ? "16px 16px"
    : isSm
      ? "20px 24px"
      : isMd
        ? "28px 32px"
        : "40px 60px";
  const containerMaxW = isXs ? "100%" : isSm ? 600 : isMd ? 900 : 1400;

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
            ✦ &nbsp; Nos Partenaires &nbsp; ✦
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
            Les Acteurs Locaux
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
            Découvrez les producteurs et artisans passionnés qui font vivre le
            territoire. Chaque rencontre est une opportunité de soutenir
            l'authenticité et l'engagement local.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: containerMaxW,
            padding: containerPad,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gap: gridGap,
            }}
          >
            {ACTEURS_LOCAUX.map((acteur, idx) => (
              <div
                key={acteur.id}
                className="fu"
                style={{
                  animationDelay: `${0.1 + idx * 0.08}s`,
                }}
              >
                <FicheActeur acteur={acteur} bp={bp} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
