// "use server"

// import { UTxO } from "@meshsdk/core";
// import { MeshTxBuilder } from "@meshsdk/core";
// import { conStr0 } from "@meshsdk/core";
// import { BlockfrostProvider } from "@meshsdk/core";




// export async function unlockNoRefScript(walletUtxos: UTxO[], address: string, collateral: UTxO[]) {
//     const redeemerValue = conStr0(["Hello, World!"]);
//     console.log(redeemerValue);

//     let scriptAddress = "addr_test1wz26h2k0ga9q2tuk84jdjm69tjyyfndfqzh8upxp8dhgmtqhh6atz"
//     let scriptCbor = "58a258a001010029800aba2aba1aab9faab9eaab9dab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c01cdd500144c8cc896600266e1d2000300a375400d1323259800980800144cdc79bae300f300d37540109110d48656c6c6f2c20576f726c6421008b201c375c601c00260166ea801a2c8048c02c004c02cc030004c020dd50014590060c01c004c00cdd5003c52689b2b20021"
//     // 
//     const blockfrostKey = process.env.BLOCKFROST;
//     if (!blockfrostKey) {
//         throw new Error("BLOCKFROST environment variable is not set");
//     }
    
//     const provider = new BlockfrostProvider(blockfrostKey);

//     const scriptUTXOs = await provider.fetchAddressUTxOs(scriptAddress);
//     console.log(scriptUTXOs);

//     const scriptUTXOsLength = scriptUTXOs.length;
//     console.log(scriptUTXOsLength);

//     const tx = new MeshTxBuilder({
//         verbose: true,
//         fetcher: provider,
//         evaluator: provider
//     })

//     let unsignedTx: string;
//     let txBuilder: any;
//     try {
//         txBuilder = await tx
//         .setNetwork("preprod")
//         .spendingPlutusScriptV3()
//         // .txOut(address, [{unit: "lovelace", quantity: "10000000"}])

//         // for (let i = 0; i < scriptUTXOsLength - 1; i++) {
//         //     txBuilder
//         //     .txIn(scriptUTXOs[i].input.txHash, scriptUTXOs[i].input.outputIndex)
//         //     .txInInlineDatumPresent()
//         // }
//         .txIn(scriptUTXOs[0].input.txHash, scriptUTXOs[0].input.outputIndex, scriptUTXOs[0].output.amount, scriptUTXOs[0].output.address)
//         .txInInlineDatumPresent()
//         .txInCollateral(collateral[0].input.txHash, collateral[0].input.outputIndex, collateral[0].output.amount, collateral[0].output.address)
//         .txInScript(scriptCbor)
//         .txInRedeemerValue(redeemerValue)
//         .changeAddress(address)
//         .selectUtxosFrom(walletUtxos)
//         unsignedTx = await txBuilder.complete();
//     } catch (e: any) {
//         return {
//             error: e.message
//         }   
//     }

//     return {
//         unsignedTx
//     }
// }

"use server"

import { UTxO } from "@meshsdk/core";
import plutusScript from "../hello-mesh/plutus.json";
import cbor from "cbor";
import { PlutusScript } from "@meshsdk/core";
import { resolvePlutusScriptAddress } from "@meshsdk/core";
import { conStr0 } from "@meshsdk/core";
import { BlockfrostProvider } from "@meshsdk/core";
import { MeshTxBuilder } from "@meshsdk/core";
import { stringToHex } from "@meshsdk/core";


export async function unlockNoRefScript(walletUtxos: UTxO[], address: string, collateral: UTxO[]) {
    const script: PlutusScript = {
        code: cbor
            .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
            .toString("hex"),
        version: "V3",
    };

    const plutusScriptAddress = resolvePlutusScriptAddress(script, 0);

    const redeemerValue = conStr0([stringToHex("Hello, World!")]);
    console.log(redeemerValue);

    const blockfrostKey = process.env.BLOCKFROST;
    if (!blockfrostKey) {
        throw new Error("BLOCKFROST environment variable is not set");
    }
    
    const provider = new BlockfrostProvider(blockfrostKey);

    const scriptUTXOs = await provider.fetchAddressUTxOs(plutusScriptAddress);
    console.log(scriptUTXOs);

    if (scriptUTXOs.length === 0) {
        throw new Error("No script UTXOs found");
    }

    const tx = new MeshTxBuilder({
        verbose: true,
        fetcher: provider,
        // evaluator: provider
    });
    const unsignedTx = await tx
    .setNetwork("preprod")
    .spendingPlutusScriptV3()
    .txIn(scriptUTXOs[0].input.txHash, scriptUTXOs[0].input.outputIndex)
    .txInInlineDatumPresent()
    .txInScript(script.code)
    .txInRedeemerValue(redeemerValue)
    .changeAddress(address)
    .selectUtxosFrom(walletUtxos)
    .txInCollateral(collateral[0].input.txHash, collateral[0].input.outputIndex, collateral[0].output.amount, collateral[0].output.address)
    .complete();

    return {
        unsignedTx,
        Error
    }
}