import { useState, useEffect } from "react";

import Web3 from "web3";

function App() {
  const [accounts, setAccounts] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState("");

  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    loadBalance();
  }, [accounts]);
  
  async function loadBalance() {
    const network = await web3.eth.net.getNetworkType();
    const balance = await web3.eth.getBalance(accounts);

    setNetwork(network);
    setBalance((balance/1e18).toFixed(4));
  }

  async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts();

    setAccounts(accounts[0]);
  }

  
  if (!accounts || !network || !balance) {
    return <div>Loading...</div>;
  }
  
  else {
    return (
      <div>
        <h1>Account: {accounts}</h1>
        <h1>Network: {network}</h1>
        <h1>Balance: {balance}</h1>
      </div>
    );
  }
}

export default App;
