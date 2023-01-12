import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import {Header, Footer} from "./components/HeaderFooter"
import HomePage from "./pages/HomePage";
import Enter from "./pages/Enter";
import Submissions from "./pages/Submissions";
import NewSubmission from "./pages/NewSubmission";
import MTQ from "./pages/MTQ";
import Standings from "Pages/Standings";
import ThankYou from "Pages/ThankYou";
import Rules from "Pages/Rules";
import About from "Pages/About";
import firebase from "./utilities/firebase";

const db = firebase.firestore();

async function addSubmission(season, formState) {
   try {
     await db
       .collection("seasons")
       .doc(season)
       .collection("submissions")
       .doc(formState.email)
       .set(formState);
   } catch (error) {
     // eslint-disable-next-line no-console
     console.error(`Could not add submission.: ${error}`);
   }
 }

export default function App() {
  const [season, setSeason] = useState({queens:[]});

  async function fetchSeasons() {
    const seasonsRef = await db
      .collection("seasons")
      .where("active", "==", true)
      .get();
    
    const activeSeason = seasonsRef.docs[0].data(); 
    setSeason(activeSeason);
  }

  useEffect(() => {
    fetchSeasons(setSeason);
  }, []);

  return (
    <>
      {sessionStorage.getItem("entered") !== "true" &&
        window.innerWidth / window.innerHeight <= 0.65 && <Enter />}
      <Header />
      <div className="app-container">
        <Router primary={false}>
          {!!season.seasonId && (
            <ScrollToTop path="/">
              <HomePage path="/" season={season} />
              <Submissions path="/submissions" season={season} />
              <NewSubmission
                path="/submissions/new"
                season={season}
                addSubmission={addSubmission}
              />
              <ThankYou path="/thanks" season={season} />
              <Rules path="/rules" season={season} />
              <MTQ path="/mtq" season={season} />
              <Standings path="/standings" season={season} />
              <About path="/about" season={season} />
            </ScrollToTop>
          )}
        </Router>
      </div>
      <Footer />
    </>
  );
}

export const ScrollToTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};