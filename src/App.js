import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { getWeb3, getWallet } from './utils';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const wallet = await getWallet(web3);
    const approvers = await wallet.methods.getApprovers().call();
    const quorum = await wallet.methods.quorum().call();
    fetchTransfers(wallet);
    setWeb3(web3);
    setAccounts(accounts);
    setWallet(wallet);
    setApprovers(approvers);
    setQuorum(quorum);
  };

  const fetchTransfers = async (wallet) => {
    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers);
  };

  const createTransfer = async (transfer) => {
    await wallet.methods.createTransfer(transfer.amount, transfer.to).send({
      from: accounts[0],
    });
    fetchTransfers(wallet);
  };

  const approveTransfer = async (transferId) => {
    await wallet.methods.approveTransfer(transferId).send({
      from: accounts[0],
    });
    fetchTransfers(wallet);
  };

  if (
    typeof web3 === 'undefined' ||
    typeof accounts === 'undefined' ||
    typeof wallet === 'undefined' ||
    approvers.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

export default App;
