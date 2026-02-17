// "use client";
// import { useWallet } from "@meshsdk/react";
// import {useState} from "react";

// export const FirstTimeDelegationButton = () => {
//     const { wallet, connected } = useWallet();
//     const [txHash, setTxHash] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [loading, setLoading] = useState<boolean>(false);

//     async function handleFirstTimeDelegation() {
//         if (!connected || !wallet) {
//             setError("Wallet not connected");
//             return;
//         }
//         setLoading(true);
//         setError("");
//         setTxHash("");

//         try {
//             const utxos = await wallet.getUtxos();
//             const changeAddress = await wallet.getChangeAddress();
//             const rewardAddresses = await wallet.getRewardAddresses();
//             const rewardAddress = rewardAddresses[0]!;
//             const poolId = "pool1wmluq6pjne9ndvgl26q52f4lntpjaqkwj6x8u2py9jqfuy5mv8k";

//             // Pass required info to the api and get response: START HERE

//             const response = await fetch("/api/first-time-delegation", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ utxos, changeAddress, rewardAddress, poolId }),
//             });

//             const data = await response.json();

//             if (data.error) {
//                 setError(data.error);
//                 return;
//             }
            
//             if (data.unsignedTx) {
//                 const signedTx = await wallet.signTx(data.unsignedTx);
//                 const hash = await wallet.submitTx(signedTx);
//                 setTxHash(hash);
//             }

//             // END HERE

//         } catch (err: any) {
//             setError(err.message || "Failed to first time delegation");
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <div>
//             <button onClick={handleFirstTimeDelegation}>First Time Delegation</button>
//             {txHash && <p>Transaction Hash: {txHash}</p>}
//             {error && <p>Error: {error}</p>}
//             {loading && <p>Loading...</p>}
//         </div>
//     )
// }


"use client";
import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export const FirstTimeDelegationButton = () => {
    const { wallet, connected } = useWallet();
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFirstTimeDelegation() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }
        setLoading(true);

        try {
            const utxos = await wallet.getUtxos();
            const changeAddress = await wallet.getChangeAddress();
            const rewardAddresses = await wallet.getRewardAddresses();
            const rewardAddress = rewardAddresses[0]!;
            const poolID = "pool1wmluq6pjne9ndvgl26q52f4lntpjaqkwj6x8u2py9jqfuy5mv8k";
            // Call first time-delegation API and provide required info
            const response = await fetch("/api/first-time-delegation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ utxos, changeAddress, rewardAddress, poolID }),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                return;
            }
            if (data.unsignedTx) {
                const signedTx = await wallet.signTx(data.unsignedTx);
                const hash = await wallet.submitTx(signedTx);
                setTxHash(hash);
            }
        }catch (error) {
            console.error("First-time delegation error:", error);
            setError("Unknown error while calling the first-time-delegation API");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <button onClick={handleFirstTimeDelegation}>First Time Delegation</button>
            {txHash && <p>Transaction Hash: {txHash}</p>}
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
        </div>
    )
}