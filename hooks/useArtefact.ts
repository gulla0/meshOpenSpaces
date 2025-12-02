"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";
import { UTxO } from "@meshsdk/core";
import { exampleTx } from "../server/example";
import { get } from "http";


export const useArtefact = () => {
    const { wallet, connected } = useWallet();
    const [utxos, setUtxos] = useState<UTxO[]>([]);
    const [collateral, setCollateral] = useState<UTxO[]>([]);
    const [message, setMessage] = useState<string>("");
   
    useEffect(() => {
        const fetchUtxos = async () => {
            if (connected && wallet) {
                const Utxos = await wallet.getUtxos();
                setUtxos(Utxos);
                const collateral = await wallet.getCollateral();
                setCollateral(collateral);
            }
        };
        fetchUtxos();
    }, [connected, wallet]);

    async function getMessage(){
        if(utxos.length > 0){
        const {message} = await exampleTx(utxos); 
        setMessage(message);
        }
    }
    

    return { utxos, collateral, getMessage, message };




}
