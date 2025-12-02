'use client'

import { useFirstTx } from "@/hooks/useFirstTx";
import { error } from "console";
import { connect } from "http2";



export const FirstTx = () => {
    const { utxos, txHash, connected, fireTxBuilder, error} = useFirstTx();


    return (
        <div>
            <h1>Here we will create and submit a basic tx, The button should only appear if the wallet is connected and utxos are available</h1>
            {utxos && connected && <button onClick={fireTxBuilder}>Submit Tx</button>}
            {txHash && <p>Transaction Hash: {txHash}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    )

}