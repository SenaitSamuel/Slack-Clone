import React from "react";
import "./App.css";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import styled from "styled-components";
import Chat from "./Components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoadingContainer>
        <AppLoadingContents>
          <img
            src="https://cdn.freebiesupply.com/logos/thumbs/2x/slack-logo-thumb.png"
            alt="slack"
          />
          <Spinner name="ball-spin-fade-loader" color="purple" />
        </AppLoadingContents>
      </AppLoadingContainer>
    );
  }

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <SideBar />
            <Chat />
          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
