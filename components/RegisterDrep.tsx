"use client";

import { useWallet } from "@meshsdk/react";
import {useState} from "react";

export const RegisterDrepButton = () => {
    const { wallet, connected } = useWallet();
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [anchorName, setAnchorName] = useState<string>("");
    const [anchorUrl, setAnchorUrl] = useState<string>("");


    async function handleRegisterDrep() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }

        setLoading(true);
        setError("");
        setTxHash("");

        try {
            const utxos = await wallet.getUtxos();
            const changeAddress = await wallet.getChangeAddress();
            const getDrepId = await wallet.getDRep();
            const drepId = getDrepId?.dRepIDCip105

            const response = await fetch("/api/register-drep", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ utxos, changeAddress, drepId, anchorName, anchorUrl }),
            });

            const data = await response.json();

            if (data.error) {
                console.log(data.error)
                setError(typeof data.error === "string" ? data.error : data.error.message || "Transaction build failed");
                return;
            }

            if (data.unsignedTx) {
                const signedTx = await wallet.signTx(data.unsignedTx);
                const hash = await wallet.submitTx(signedTx);
                setTxHash(hash);
            }
        } catch (err: any) {
            setError(err.message || "Failed to deploy reference script");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form>
                <label>
                    Drep Name:
                    <input type="text" value={anchorName} onChange={(e) => setAnchorName(e.target.value)} />
                </label>
                <label>
                    Drep URL:
                    <input type="text" value={anchorUrl} onChange={(e) => setAnchorUrl(e.target.value)} />
                </label>
            </form>


            {anchorName && anchorUrl && <button onClick={handleRegisterDrep}>Register as Drep</button>}
            {txHash && <p>Transaction Hash: {txHash}</p>}
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
        </div>)
    }