import BigNumber from "bignumber.js";

export interface Portfolio {
  earnedMagic: BigNumber | number;
  earnedGovMagic: BigNumber | number;
  stakedStMagic: BigNumber | number;
  vApr: number;
  tvl: number;
}

export interface OperationDetails {
  value: BigNumber | number;
  balance: BigNumber | number;
  approved: boolean;
  confirmed: boolean;
}
