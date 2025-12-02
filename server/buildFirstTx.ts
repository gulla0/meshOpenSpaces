'use server'

import { UTxO } from "@meshsdk/core";
import { MeshTxBuilder } from "@meshsdk/core";
import { error } from "console";


export async function buildFirstTx(utxos: UTxO[], address: string) {
    
    const firstTx = new MeshTxBuilder({
        verbose: true,
    })

    try {

         const unsignedTx: string = await firstTx
        .txOut("addr_test1wz26h2k0ga9q2tuk84jdjm69tjyyfndfqzh8upxp8dhgmtqhh6atz", [{unit: "lovelace", quantity: "10000000"}])
     
        .selectUtxosFrom(utxos)
        .complete()
        
        return {
            unsignedCbor: unsignedTx
        }
        
    } catch (e: any) {
        console.log(e)
    
    }
   


}