import React from 'react';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { getWallet, getWeb3 } from './utils';
import { Flex, Heading, Box } from '@chakra-ui/react';
function App() {
  const [web3, setWeb3] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const [approvers, setApprovers] = React.useState([]);
  const [quorum, setQuorum] = React.useState(null);
  const [transfers, setTransfers] = React.useState([]);

  React.useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);
  const createTransfer = (transferObj) => {
    wallet.methods
      .createTransfer(transferObj.amount, transferObj.to)
      .send({ from: accounts[0] });
  };
  const approveTransfer = (transferId) => {
    wallet.methods.approveTransfer(transferId).send({ from: accounts[0] });
  };
  if (!web3 || !accounts || !wallet) {
    return <div>Loading....</div>;
  }
  return (
    <Box bgImage="url('/bg.png')" bgPosition="center" bgRepeat="no-repeat">
      <Flex justifyContent="center" alignItems="center" h="20vh">
        <Heading
          color="whitesmoke"
          // css={{
          //   background:
          //     'linear-gradient(120deg, #FF00C7 0%, #51003F 100%), linear-gradient(120deg, #0030AD 0%, #00071A 100%), linear-gradient(180deg, #000346 0%, #FF0000 100%), linear-gradient(60deg, #0029FF 0%, #AA0014 100%), radial-gradient(100% 165% at 100% 100%, #FF00A8 0%, #00FF47 100%), radial-gradient(100% 150% at 0% 0%, #FFF500 0%, #51D500 100%)',
          //   backgroundBlendMode:
          //     'overlay, color-dodge, overlay, overlay, difference, normal',
          // }}
        >
          Multi Signature Wallet
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center" h="80vh" w="100vw">
        <Flex mr={12} bgColor="white" p="12px 14px" borderRadius="6px">
          <TransferList
            approveTransfer={approveTransfer}
            transfers={transfers}
          />
        </Flex>
        <Flex ml={12} direction="column">
          <Heading>Approvers List</Heading>
          <Header approvers={approvers} quorum={quorum} />
          <NewTransfer createTransfer={createTransfer} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
