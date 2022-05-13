import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import InputsWallet from '../components/InputsWallet';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <HeaderWallet />
        <InputsWallet />
        <TableWallet />
      </>
    );
  }
}

export default Wallet;
