import { blockchain_provider } from "./provider/provider";
import { MeshTxBuilder, hashDrepAnchor } from "@meshsdk/core";
import { UTxO } from "@meshsdk/core";


export interface drepTypes {
    utxos:UTxO[],
    changeAddress:string,
    drepId: string,
    anchorName: string,
    anchorUrl: string
}


export async function registerDrep({utxos, changeAddress, drepId, anchorName, anchorUrl}:drepTypes) {


    const tx = new MeshTxBuilder({
        verbose: true,
        fetcher: blockchain_provider,
    })

    const metadata = {
    "@context": { /* CIP-119 context */ },
    "body": { "givenName": anchorName }
  };

    const anchorHash = await hashDrepAnchor(metadata);

    const anchorObject = {
        anchorUrl: anchorUrl,
        anchorDataHash: anchorHash
    }

    try {
       const unsignedTx = await tx
            .drepRegistrationCertificate(drepId, anchorObject)
            .changeAddress(changeAddress)
            .selectUtxosFrom(utxos)
            .setNetwork("preprod")
            .complete()

            console.log("Built Transaction", unsignedTx)

            return{
                unsignedTx: unsignedTx,
                error: null
            }

    } catch(error) {
        console.log(error)
        return {
            unsignedTx: null,
            error
        }
    }

  
  
    };