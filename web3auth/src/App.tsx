import "./App.css";
import { useState } from "react";
import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
import styles from "./styles/Home.module.css";
import { Web3AuthProvider } from "./services/web3auth";
import Setting from "./components/Setting";
import Main from "./components/Main";


function App() {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("fantom");

  return (
    <div className={styles.container}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <h1 className={styles.title}>
          XADE
        </h1>
        <Main />
      </Web3AuthProvider>
      <br/>
      <Setting setNetwork={setWeb3AuthNetwork} setChain={setChain} />
         

{/*      <footer className={styles.footer}>
      

      </footer>*/}
    </div>
  );
}

export default App;



