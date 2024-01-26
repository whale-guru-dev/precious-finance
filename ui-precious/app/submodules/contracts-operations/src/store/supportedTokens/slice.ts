import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AmmID, AmmName, ammNames, SupportedNetworkId, tokenAddressToSymbolsMapping } from '../../defi/constants'
import { getTokenId, UniqueObjectSet } from '../../utils/types'
import { getTokenIconURL } from './utils'

export type CrossChainId = string

interface APIToken {
  address: string;
  decimals: string;
  symbol: string;
  crossChainId: CrossChainId;
}

type TokenOmitted =
 | 'decimals'

export interface Token extends Omit<APIToken, TokenOmitted> {
  decimals: number;
  imageURL: string;
  chainId: SupportedNetworkId;
}

type CrossChainTokenOmitted =
 | 'address'

type ChainIdTokenAddressPair = Partial<{
  [chainId in SupportedNetworkId]: string;
}>

export interface CrossChainToken extends Omit<Token, CrossChainTokenOmitted> {
  addresses: ChainIdTokenAddressPair;
}

type DistinctCrossChainTokens = {
  crossChainIds: Set<CrossChainId>;
  tokens: Array<CrossChainToken>;
}

interface APILiquidityToken {
  token: APIToken;
  iouToken: APIToken;
  receiptToken: APIToken;
}

type LiquidityTokenOmitted =
 | 'token'
 | 'iouToken'
 | 'receiptToken'

export interface LiquidityToken extends Omit<APILiquidityToken, LiquidityTokenOmitted> {
  token: Token;
  iouToken: Token;
  receiptToken: Token;
}

interface APITransferPair {
  sourceToken: APIToken;
  destinationToken: APIToken;
  destinationChainId: string;
  minTransferAmount: string;
  maxTransferAmount: string;
}

type TransferPairOmitted =
  | 'sourceToken'
  | 'destinationToken'
  | 'destinationChainId'
  | 'minTransferAmount'
  | 'maxTransferAmount'

export interface TransferPair extends Omit<APITransferPair, TransferPairOmitted> {
  sourceToken: Token;
  destinationToken: Token;
  destinationChainId: SupportedNetworkId;
  minTransferAmount: number;
  maxTransferAmount: number;
}

interface APISupportedAmm {
  ammAddress: string;
  ammId: AmmID;
  name: AmmName;
}

type SupportedAmmOmitted =
  | 'name'

export interface SupportedAmm extends Omit<APISupportedAmm, SupportedAmmOmitted> {
  apiName: AmmName;
  name: string;
}

interface APIChainSupportedTokens {
  chainId: number,
  liquidityTokens: Array<APILiquidityToken>;
  transferPairs: Array<APITransferPair>;
  supportedAmms: Array<APISupportedAmm>;
}

type ChainSupportedTokensOmitted =
  | 'chainId'
  | 'liquidityTokens'
  | 'transferPairs'
  | 'supportedAmms'

export interface ChainSupportedTokens extends Omit<APIChainSupportedTokens, ChainSupportedTokensOmitted> {
  chainId: SupportedNetworkId;
  liquidityTokens: Array<LiquidityToken>;
  transferPairs: Array<TransferPair>
  supportedAmms: Array<SupportedAmm>;
}

export type APISupportedTokens = Array<APIChainSupportedTokens>

export type SupportedTokens = Array<ChainSupportedTokens>

export type ReceiptTokens = {
  [key: string]: Token;
}

type SupportedTokensState = {
  crossChainTokens: Array<CrossChainToken>;
  networks: Array<SupportedNetworkId>;
  receiptTokens: ReceiptTokens;
  supportedTokens: SupportedTokens;
  tokens: Array<Token>;
  liquidityTokens: Array<Token>;
}

const initialState: SupportedTokensState = {
  crossChainTokens: [],
  networks: [],
  receiptTokens: {},
  supportedTokens: [],
  tokens: [],
  liquidityTokens: [],
}

export const supportedTokensSlice = createSlice({
  name: 'supportedTokens',
  initialState,
  reducers: {
    updateSupportedTokens: (
      state,
      action: PayloadAction<APISupportedTokens>
    ) => {
      const supportedTokens = action.payload.map((element: APIChainSupportedTokens) : ChainSupportedTokens => ({
        ...element,
        chainId: element.chainId as SupportedNetworkId,
        liquidityTokens: element.liquidityTokens.map((lToken: APILiquidityToken): LiquidityToken => ({
          token: {
            ...lToken.token,
            decimals: Number.parseInt(lToken.token.decimals),
            symbol: tokenAddressToSymbolsMapping?.[lToken.token.address]?.[element.chainId] || lToken.token.symbol,
            imageURL: getTokenIconURL(
              element.chainId,
              lToken.token.address
            ),
            chainId: element.chainId as SupportedNetworkId,
          },
          iouToken: {
            ...lToken.iouToken,
            decimals: Number.parseInt(lToken.iouToken.decimals),
            symbol: tokenAddressToSymbolsMapping?.[lToken.iouToken.address]?.[element.chainId] || lToken.iouToken.symbol,
            imageURL: getTokenIconURL(
              element.chainId,
              lToken.iouToken.address
            ),
            chainId: element.chainId as SupportedNetworkId,
          },
          receiptToken: {
            ...lToken.receiptToken,
            decimals: Number.parseInt(lToken.receiptToken.decimals),
            symbol: tokenAddressToSymbolsMapping?.[lToken.receiptToken.address]?.[element.chainId] || lToken.receiptToken.symbol,
            imageURL: getTokenIconURL(
              element.chainId,
              lToken.receiptToken.address
            ),
            chainId: element.chainId as SupportedNetworkId,
          },
        })),
        supportedAmms: element.supportedAmms.map((amm: APISupportedAmm) : SupportedAmm => ({
          ...amm,
          apiName: amm.name,
          name: ammNames[amm.ammId],
        })),
        transferPairs: element.transferPairs.map((pair: APITransferPair) : TransferPair => ({
          ...pair,
          destinationChainId: parseInt(pair.destinationChainId) as SupportedNetworkId,
          sourceToken: {
            ...pair.sourceToken,
            decimals: Number.parseInt(pair.sourceToken.decimals),
            symbol: tokenAddressToSymbolsMapping?.[pair.sourceToken.address]?.[element.chainId] || pair.sourceToken.symbol,
            imageURL: getTokenIconURL(
              element.chainId,
              pair.sourceToken.address
            ),
            chainId: element.chainId as SupportedNetworkId,
          },
          destinationToken: {
            ...pair.destinationToken,
            decimals: Number.parseInt(pair.destinationToken.decimals),
            symbol: tokenAddressToSymbolsMapping?.[pair.destinationToken.address]?.[element.chainId] || pair.destinationToken.symbol,
            imageURL: getTokenIconURL(
parseInt(pair.destinationChainId) as SupportedNetworkId,
pair.destinationToken.address
            ),
            chainId: parseInt(pair.destinationChainId) as SupportedNetworkId,
          },
          minTransferAmount: parseFloat(pair.minTransferAmount),
          maxTransferAmount: parseFloat(pair.maxTransferAmount),
        })),
      }));

      state.supportedTokens = supportedTokens;

      state.networks = supportedTokens.map((value: ChainSupportedTokens) => value.chainId);

      const liquidityTokens = supportedTokens.reduce(
        (
          result: UniqueObjectSet<Token>, chainSupportedTokens: ChainSupportedTokens
        ) => chainSupportedTokens.liquidityTokens.reduce(
          (
            chainResult: UniqueObjectSet<Token>, liquidityToken: LiquidityToken
          ) => chainResult.addObject(
            chainSupportedTokens.chainId + '-' + liquidityToken.token.address,
            liquidityToken.token
          ),
          result
        ),
        new UniqueObjectSet<Token>()
      ).objects

      state.liquidityTokens = liquidityTokens;

      const tokens = supportedTokens.reduce(
        (
          result: UniqueObjectSet<Token>, chainSupportedTokens: ChainSupportedTokens
        ) => {
          result = chainSupportedTokens.liquidityTokens.reduce(
            (
              chainResult: UniqueObjectSet<Token>, liquidityToken: LiquidityToken
            ) => chainResult.addObject(
              chainSupportedTokens.chainId + '-' + liquidityToken.token.address,
              liquidityToken.token
            ),
            result
          )

          result = chainSupportedTokens.transferPairs.reduce(
            (
              chainResult: UniqueObjectSet<Token>, transferPairs: TransferPair
            ) => {
              chainResult.addObject(
                chainSupportedTokens.chainId + '-' + transferPairs.sourceToken.address,
                transferPairs.sourceToken
              );
              chainResult.addObject(
                chainSupportedTokens.chainId + '-' + transferPairs.destinationToken.address,
                transferPairs.destinationToken
              );
              return chainResult;
            },
            result
          )

          return result;
        },
        new UniqueObjectSet<Token>()
      ).objects

      state.tokens = tokens;

      state.receiptTokens = tokens.reduce(
        (
          result: ReceiptTokens, token: Token
        ) => {
          const receiptToken = supportedTokens
            .find((chainSupportedTokens: ChainSupportedTokens) => chainSupportedTokens.chainId === token.chainId)
            ?.liquidityTokens.find((liquidityToken: LiquidityToken) => liquidityToken.token.crossChainId === token.crossChainId)
            ?.receiptToken;

          if (receiptToken) {
            result[getTokenId(token)] = receiptToken;
          }

          return result;
        },
        {}
      );

      const distinctCrossChainTokens: DistinctCrossChainTokens = supportedTokens.reduce(
        (
          result: DistinctCrossChainTokens, chainSupportedTokens: ChainSupportedTokens
        ) => {
          const addCrossChainToken = (
            result: DistinctCrossChainTokens, chainId: SupportedNetworkId, token: Token
          ) => {
            if (!result.crossChainIds.has(token.crossChainId)) {
              result.crossChainIds.add(token.crossChainId)

              const crossChainToken: CrossChainToken = {
                ...token,
                addresses: { [chainId]: token.address },
              }

              result.tokens.push(crossChainToken);
            } else {
              const crossChainToken = result.tokens.find((presentToken: CrossChainToken) => presentToken.crossChainId === token.crossChainId);

              if (!crossChainToken) {
                throw Error("Supported Tokens - Logic error")
              }

              crossChainToken.addresses[chainId] = token.address;
            }

            return result;
          }

          result = chainSupportedTokens.liquidityTokens.reduce(
            (
              chainResult: DistinctCrossChainTokens, liquidityToken: LiquidityToken
            ) => {
              return addCrossChainToken(
                chainResult,
                chainSupportedTokens.chainId,
                liquidityToken.token
              );
            },
            result
          )

          result = chainSupportedTokens.transferPairs.reduce(
            (
              chainResult: DistinctCrossChainTokens, transferPairs: TransferPair
            ) => {
              addCrossChainToken(
                chainResult,
                chainSupportedTokens.chainId,
                transferPairs.sourceToken
              );

              addCrossChainToken(
                chainResult,
                transferPairs.destinationChainId,
                transferPairs.destinationToken
              );

              return chainResult;
            },
            result
          )

          return result;
        },
        {
          crossChainIds: new Set(),
          tokens: [],
        }
      );

      state.crossChainTokens = distinctCrossChainTokens.tokens;
    },
  },
})

export const { updateSupportedTokens } = supportedTokensSlice.actions

export const selectTokens = (state: any) => state.supportedTokens.tokens
export const selectSupportedTokens = (state: any) => state.supportedTokens.supportedTokens
export const selectReceiptTokens = (state: any) => state.supportedTokens.receiptTokens
export const selectNetworks = (state: any) => state.supportedTokens.networks
export const selectLiquidityTokens = (state: any) => state.supportedTokens.liquidityTokens
export const selectCrossChainTokens = (state: any) => state.supportedTokens.crossChainTokens

export default supportedTokensSlice.reducer
