// import {
//     MeshTxBuilder,
//     BlockfrostProvider,
//     deserializePoolId
//   } from "@meshsdk/core";
//   import { blockchain_provider } from "./provider/provider";
//   import { UTxO } from "@meshsdk/core";

//   export async function firstTimeDelegation(utxos: UTxO[], changeAddress: string, rewardAddress: string, poolId: string) {
//     const tx = new MeshTxBuilder({
//         verbose: true,
//         fetcher: blockchain_provider,
//     })

//     const poolIdHash = deserializePoolId(poolId);
//     try {
//         const unsignedTx = await tx
//         .delegateStakeCertificate(rewardAddress, poolIdHash)
//         .selectUtxosFrom(utxos)
//         .changeAddress(changeAddress)
//         .setNetwork("preprod")
//         .complete();
//         return {
//             unsignedTx: unsignedTx,
//             error: null
//         }
//     } catch (error) {
//         return {
//             unsignedTx: null,
//             error: error
//         }
//     }

// }

import {
    MeshTxBuilder,
    deserializePoolId
  } from "@meshsdk/core";
  import { blockchain_provider } from "@/server/provider/provider";
  import { UTxO } from "@meshsdk/core";


  export async function firstTimeDelegation(utxos: UTxO[], changeAddress: string, rewardAddress: string, poolID: string) {
    const tx = new MeshTxBuilder({
        verbose: true,
        fetcher: blockchain_provider,
    })

    const poolIdHash = deserializePoolId(poolID);
    try {
        const unsignedTx = await tx
        .registerStakeCertificate(rewardAddress)
        .delegateStakeCertificate(rewardAddress, poolIdHash)
        .selectUtxosFrom(utxos)
        .changeAddress(changeAddress)
        .setNetwork("preprod")
        .complete();
        return {
            unsignedTx: unsignedTx,
            error: null
        }
    } catch (error) {
        return {
            unsignedTx: null,
            error: error
        }
    }
  }

