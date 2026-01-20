"use client";
import plutusScript from "../hello-mesh/plutus.json";
import cbor from "cbor";
import type { PlutusScript, Data } from "@meshsdk/core";
import { resolvePlutusScriptAddress } from "@meshsdk/core";
import { useState, useEffect } from "react";
import { useArtefact } from "../hooks/useArtefact";

export default function SpendArtefacts() {
    const [Cbor, setCbor] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const { utxos, collateral, getMessage, message } = useArtefact();

    function handleGetMessage() {
        getMessage();
    }

    useEffect(() => {
        const script: PlutusScript = {
            code: cbor
                .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
                .toString("hex"),
            version: "V3",
        };
        setCbor(script.code);

        const plutusScriptAddress = resolvePlutusScriptAddress(script, 0);
        setAddress(plutusScriptAddress);
    }, []);


    return (
        <div>
            <p>Plutus Script: {Cbor}</p>
            <p>Plutus Script Address: {address}</p>
            
            <h2>Let's get the message</h2>
            <button onClick={handleGetMessage}>Get Message</button>
            <p>{utxos && message }</p>
        </div>
    );
}

