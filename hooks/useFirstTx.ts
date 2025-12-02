import { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";
import { UTxO } from "@meshsdk/core";
import { connect } from "http2";
import { buildFirstTx } from "../server/buildFirstTx";


export const useFirstTx = () => {
    const {connected, wallet} = useWallet();
    const [utxos, setUtxos] = useState<UTxO[]>([]);
    const [address, setAddress] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>();

    useEffect( () => {
     

        const fetchUtxos = async () => {
            if (connected && wallet) {
                const utxos = await wallet.getUtxos();
                setUtxos(utxos);
                const address = await wallet.getChangeAddress();
                setAddress(address);
        
            }
        };
        
        fetchUtxos();

        
    }, [connected, wallet]);

     async function fireTxBuilder(){

            const response = await buildFirstTx(utxos, address);
            if (response && response.unsignedCbor){
                 const signTx = await wallet.signTx(response.unsignedCbor);
                const txHash = await wallet.submitTx(signTx);
                setTxHash(txHash);
            }
            

        }

    return { utxos, connected, txHash, fireTxBuilder, error };

}


