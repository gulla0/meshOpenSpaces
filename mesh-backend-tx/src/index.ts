// import { conStr, conStr0, mConStr0, MeshTxBuilder, PlutusScript, resolvePlutusScriptAddress, script, stringToHex, toBytes } from "@meshsdk/core"
// import cbor from "cbor"
// import { blockchain_provider, wallet } from "./lib";

import { build_ticket_tx } from "./builder-fest";

// const scriptCbor = "58a001010029800aba2aba1aab9faab9eaab9dab9a48888896600264653001300700198039804000cc01c0092225980099b8748008c01cdd500144c8cc896600266e1d2000300a375400d1323259800980800144cdc79bae300f300d37540109110d48656c6c6f2c20576f726c6421008b201c375c601c00260166ea801a2c8048c02c004c02cc030004c020dd50014590060c01c004c00cdd5003c52689b2b20021"
// //const encoded_script = cbor.encode(Buffer.from(scriptCbor, "hex")).toString("hex")

// const spend = async() => {
//     const utxo = await wallet.getUtxos();
//     const collateral = (await wallet.getCollateral())[0];
//     const changeAddress = await wallet.getChangeAddress();


// const hello_mesh_plutusScript: PlutusScript = {
//     code: scriptCbor,
//     version: "V3",
// };
// const script_address = resolvePlutusScriptAddress(hello_mesh_plutusScript, 0);
// console.log(script_address)

// const redeemer_msg = stringToHex("Hello,World!");
// const redeemer_value = conStr0([redeemer_msg])

// const txbuilder = new MeshTxBuilder({
//     fetcher: blockchain_provider,
//     submitter: blockchain_provider,
//     verbose: true
// })
// const spending_utxo = await blockchain_provider.fetchUTxOs("d755922b247d266e911ca40afb051a46d983c32d13d27d416d8316d3a6700e6a",0)
// const utxo_to_tx = spending_utxo[0]


// const unsignedTx = await txbuilder
// .spendingPlutusScriptV3()
// .txIn(utxo_to_tx.input.txHash,utxo_to_tx.input.outputIndex, utxo_to_tx.output.amount,utxo_to_tx.output.address)
// .txInScript(scriptCbor)
// .txInRedeemerValue(redeemer_value, "JSON")
// .txInInlineDatumPresent()

// .txOut(changeAddress, [{
//     quantity: "10000000",
//     unit: "lovelace"
// }])

// .changeAddress(changeAddress)
// .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
// .selectUtxosFrom(utxo)
// .complete()

// const signedTx = await wallet.signTx(unsignedTx)
// const txHash = await wallet.submitTx(signedTx);
// console.log('txHash' , txHash)
// return txHash;
// }

// await spend()

await build_ticket_tx();