import { StrictMode, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BoucanConnectHome from "./Home";
import LocalActors from "./LocalActors";
import MyImpact from "./MyImpact";
import TopNav from "./TopNav";
import FundPage from "./FundPage";
import Activities from "./Activities";

const INITIAL_DONATIONS = [
  {
    id: 1,
    skillId: "plongée",
    skillName: "Plongée",
    amount: 25,
    at: "2026-03-11T14:10:00.000Z",
  },
  {
    id: 2,
    skillId: "Canyoning",
    skillName: "Canyoning",
    amount: 18,
    at: "2026-03-12T09:30:00.000Z",
  },
  {
    id: 3,
    skillId: "Commerce artisanal",
    skillName: "Commerce artisanal",
    amount: 30,
    at: "2026-03-12T11:05:00.000Z",
  },
];

const GOAL = 600;

function AppWrapper() {
  const [currentPage, setCurrentPage] = useState("home");
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const total = useMemo(
    () => donations.reduce((sum, d) => sum + d.amount, 0),
    [donations],
  );
  const progress = Math.min(100, Math.round((total / GOAL) * 100));

  const addDonation = (skill, amount) => {
    setDonations((current) => [
      ...current,
      {
        id: Date.now(),
        skillId: skill.id,
        skillName: skill.name,
        amount,
        at: new Date().toISOString(),
      },
    ]);
  };

  const addActivity = (activity) => {
    setSelectedActivities([...selectedActivities, activity]);
  };

  const goHome = () => setCurrentPage("home");
  const goActivities = () => setCurrentPage("activities");
  const goActeurs = () => setCurrentPage("acteurs");
  const goImpact = () => setCurrentPage("impact");
  const goFund = () => setCurrentPage("fund");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
        @keyframes fadeUp   {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn  {from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes chevFloat{0%,100%{opacity:.45}50%{opacity:.82}}
        .fu  {animation:fadeUp   .78s ease both;}
        .si  {animation:slideIn  .44s cubic-bezier(.4,0,.2,1) both;}
        .chev{animation:chevFloat 2.8s ease-in-out infinite;}
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
          background: "#f8f9fb",
          fontFamily: "'Cormorant Garamond',serif",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <TopNav
          currentPage={currentPage}
          goHome={goHome}
          goActivities={goActivities}
          goActeurs={goActeurs}
          goImpact={goImpact}
          goFund={goFund}
        />

        {currentPage === "home" && (
          <BoucanConnectHome onNavigateToActivities={goActivities} />
        )}

        {currentPage === "activities" && (
          <Activities
            onBackToHome={goHome}
            onAddActivity={addActivity}
            onAddDonation={addDonation}
            donations={donations}
            total={total}
            progress={progress}
          />
        )}

        {currentPage === "acteurs" && (
          <LocalActors onBackToHome={goHome} onAddDonation={addDonation} />
        )}

        {/* {currentPage === "impact" && (
          <MyImpact
            onBackToHome={goHome}
            donations={donations}
            selectedActivities={selectedActivities}
          />
        )} */}

        {currentPage === "fund" && (
          <FundPage
            bp="md"
            total={total}
            progress={progress}
            donations={donations}
          />
        )}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);