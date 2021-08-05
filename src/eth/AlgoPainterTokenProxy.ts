import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ContractSendMethod } from 'web3-eth-contract';
import MineNftToken from './MineNftToken.json';
import { NetworkInfo } from 'src/store/user/types';
import getMineNftContractByNetworkId from './Config';

declare global {
  interface Window {
    web3: Web3;
  }
}

export default class MineNftTokenProxy {
  declare mineNft: {
    methods: {
      balanceOf(address: string): ContractSendMethod;
    };
  };

  constructor(networkInfo: NetworkInfo) {
    const contractAddress = getMineNftContractByNetworkId(networkInfo.id);
    this.mineNft = new window.web3.eth.Contract(
      MineNftToken as AbiItem[],
      contractAddress,
    );
  }

  async balanceOf(address: string) {
    return this.mineNft.methods.balanceOf(address).call();
  }
}
