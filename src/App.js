import { useEffect, useRef, useState } from "react";
import "./App.css";
import FormContainer from "./component/FormContainer";
import appLogoImg from "./images/appLogo.png";
function App() {
  const displayWidth = window.innerWidth;
  const pageRef = useRef();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBox, setShowInstallBox] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallDisplay = () => {
    if (showInstallBox) {
      console.log("scrolling");
      setShowInstallBox(false);
      pageRef.current.removeEventListener("touchstart", handleInstallDisplay);
    }
  };
  useEffect(() => {
    pageRef.current.addEventListener("touchstart", handleInstallDisplay);
    if (displayWidth <= 600) {
      setTimeout(() => {
        setShowInstallBox(true);
      }, 2000);
    }
    return () => {
      clearTimeout(() => {
        setShowInstallBox(true);
      });
      pageRef.current.removeEventListener("touchstart", handleInstallDisplay);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <div className="App">
      <div onClick={handleInstallDisplay} ref={pageRef}>
        <FormContainer></FormContainer>
      </div>
      <div>
        {deferredPrompt && showInstallBox && (
          <div className="install-box">
            <img className="install-img" src={appLogoImg} alt="app-logo"></img>
            <h1 className="install-title"> Aryan Enterprises</h1>
            <button className="install-btn" onClick={handleInstall}>
              {" "}
              Install App
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
