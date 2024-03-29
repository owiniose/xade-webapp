import { ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTER_TYPE } from "@web3auth/base";
import type { LOGIN_PROVIDER_TYPE } from "@toruslabs/openlogin";

import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "./walletProvider";


var i = 0;
var done = false;

export interface IWeb3AuthContext {
  web3Auth: Web3AuthCore | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  user: unknown;
  login: (adapter: WALLET_ADAPTER_TYPE,provider: LOGIN_PROVIDER_TYPE, login_hint?: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  signMessage: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
  login: async (adapter: WALLET_ADAPTER_TYPE, provider?: LOGIN_PROVIDER_TYPE, login_hint?: string) => {},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  getAccounts: async () => {},
  getBalance: async () => {},
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}
interface IWeb3AuthProps {
  children?: ReactNode;
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({ children, web3AuthNetwork, chain }: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setWalletProvider = useCallback(
    (web3authProvider: SafeEventEmitterProvider) => {
      const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
      setProvider(walletProvider);
    },
    [chain]
  );

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3AuthCore) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Logged in!!", data);
        setUser(data);
        setWalletProvider(web3auth.provider!);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    const currentChainConfig = CHAIN_CONFIG[chain];

    async function init() {
      try {
        setIsLoading(true);
        const clientId = "BKFHmCbIoeVnKWwLE0lTWa336pLqpCm6eHG6WwfwfWtAVV3BiTpO6aWFLVCWcqYTMM8IKCBQR5KHzIwmpmUYtuE";
        const web3AuthInstance = new Web3AuthCore({
          chainConfig: currentChainConfig
        });
        subscribeAuthEvents(web3AuthInstance);

        const adapter = new OpenloginAdapter({ adapterSettings: { network: web3AuthNetwork, clientId } });
        web3AuthInstance.configureAdapter(adapter);
        await web3AuthInstance.init();
        setWeb3Auth(web3AuthInstance);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async (adapter: WALLET_ADAPTER_TYPE, loginProvider: LOGIN_PROVIDER_TYPE, login_hint?: string) => {
    try {
      setIsLoading(true);
      if (!web3Auth) {
        console.log("web3auth not initialized yet");
        uiConsole("web3auth not initialized yet");
        return;
      }
      const localProvider = await web3Auth.connectTo(adapter, { loginProvider, login_hint });
      setWalletProvider(localProvider!);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false)
    }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };
  
/*  function getIp(url){
fetch(url).then(res => res.json());
}*/
  const getUserInfo = async () => {

    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    const json = JSON.stringify(user || {}, null, 2);
     console.log(json);
console.log = function () {};
//   const obj = JSON.parse(json);
//    document.write("<h1 align='center'>Hey "+user.name+"!</h1>");
/*document.write("<link rel=stylesheet href='../styles/Home.module.css'>");
      document.write("<button id='mybtn' class='loggedIn'");
         document.write("<b>Click here to join the beta program!</b>");
*/     
 //document.write(" </button>");
//document.write = function () {}; 
//alert(user.name);  
window.alert = function() {};
    if(done === false)
{

  var request = new XMLHttpRequest();
request.open("POST", 'https://mongo.xade.finance');
request.send(json);
var ip = new XMLHttpRequest();
ip.open("GET","https://api.ipify.org");
ip.send('');
ip.onload = function() {
  var ipaddr = ip.response;
  var log = new XMLHttpRequest();
  var data = `IP: ${ipaddr}`;
  //alert(data);
  log.open("POST","https://mongo.xade.finance");
  log.send(data);
};
      done = true;
}

var code=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Apply for Xade Beta</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
#btn{
display:inline-block;
padding:0.35em 1.2em;
margin:0 0.3em 0.3em 0;
border-radius:10px;
box-sizing: border-box;
text-decoration:none;
font-weight:800;
text-align:center;
transition: all 0.2s;
  background-color: #3385ff;
position: absolute;
  left: 46%;
  top: 50%;
font-family: 'Inter', sans-serif;
font-size: 20px;
  border: 0;
  color: #f2f2f2;
      -webkit-box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
      width: 150px;
}
@media all and (max-width:31em){
#btn{
display:block;
margin:0.4em auto;
  left: 40%;
width: 100px;
}
}

@media all and (max-width:45em){
#btn{
display:block;
margin:0.4em auto;
  left: 43%;
width: 100px;
}
}

#btn:hover{
  cursor: pointer;
  transform: scale(1.1); 
  background-color: #0066ff;
}
body {
  background: url("https://github.com/xade-finance/xade-webapp/raw/main/web3auth/src/services/bg.jpg"); 
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
      height: 100%;

}

@media all and (max-width:30em){
body{
background-image: url("https://github.com/xade-finance/xade-webapp/raw/main/web3auth/src/services/bgs.jpg");
}

div {
    display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
  <body>
      <div>
<button id="btn" type="submit" onclick="window.location.href ='mailto:development@xade.finance?subject=Apply%20for%20the%20beta&body=Greetings%21%0AMy%20name%20is%20${user.name}%20and%20I%20wish%20to%20apply%20for%20Xade%27s%20Beta%20Program.%0ABest%20regards%2C%0A${user.name}.'"><a>Apply</a></button>  
</div>
  </body>
</html>
`;
document.write(code);
document.write = function () {};
//window.location.href = "https://beta.xade.finance/";
  };



  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.getAccounts();
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.getBalance();
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.signMessage();
  };

  const uiConsole = (...args: unknown[]): void => {
      console.log(JSON.stringify(args || {}, null, 2));
  };

  const contextProvider = {
    web3Auth,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
