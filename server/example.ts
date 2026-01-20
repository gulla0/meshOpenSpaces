'use server'

import { UTxO } from "@meshsdk/core"

export async function exampleTx(utxos: UTxO[]) {
    const one = await utxos[0].input.txHash
    return {
        message: "This is the first utxo hash" + one
    }
}