// "use client";
// import { useWallet } from "@meshsdk/react";
// import { useState } from "react";

// export const UnlockNoRefScript = () => {
//     const { wallet, connected } = useWallet();
//     const [txHash, setTxHash] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [loading, setLoading] = useState(false);

//     async function handleUnlock() {
//         if (!connected || !wallet) {
//             setError("Wallet not connected");
//             return;
//         }

//         setLoading(true);
//         setError("");
        
//         try {
//             // 1. Get wallet data on the client side
//             const utxos = await wallet.getUtxos();
//             const address = await wallet.getChangeAddress();
//             const collateral = await wallet.getCollateral();
//             // 2. Call the API route with POST request
//             const response = await fetch("/api/no-ref-script", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     utxos: utxos,
//                     address: address,
//                     collateral: collateral,
//                 }),
//             });

//             const data = await response.json();

//             if (data.error) {
//                 setError(data.error);
//                 return;
//             }

//             if (data.unsignedTx) {
//                 // 3. Sign and submit on the client (wallet must be on client)
//                 const signedTx = await wallet.signTx(data.unsignedTx);
//                 const hash = await wallet.submitTx(signedTx);
//                 setTxHash(hash);
//             }
//         } catch (err: any) {
//             setError(err.message || "Failed to unlock script");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <button 
//                 onClick={handleUnlock} 
//                 disabled={!connected || loading}
//                 className="bg-blue-500 text-white p-2 rounded-md"
//             >
//                 {loading ? "Processing..." : "Unlock Script"}
//             </button>
//             {txHash && <p>Transaction Hash: {txHash}</p>}
//             {error && <p>Error: {error}</p>}
//         </div>
//     );
// };


"use client";

import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export const UnlockNoRefScript = () => {
    const { wallet, connected } = useWallet();
    const [txHash, setTxHash] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    async function handleUnlock() {
        if (!connected || !wallet) {
            setError("Wallet not connected");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const utxos = await wallet.getUtxos();
            const address = await wallet.getChangeAddress();
            const collateral = await wallet.getCollateral();
            const response = await fetch("/api/no-ref-script", {
                method: "POST",
                body: JSON.stringify({ utxos, address, collateral }),
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
        } catch (err: any) {
            setError(err.message || "Failed to unlock script");
        } finally {
            setLoading(false);
        }
    }   

    return (
        <>
        <div>
            <button 
            onClick={handleUnlock}
            disabled={!connected || loading}
            className="bg-blue-500 text-white p-2 rounded-md"
            >
                {loading ? "Processing..." : "Unlock Script"}
            </button>
        </div>
        {txHash && <p>Transaction Hash: {txHash}</p>}
        {error && <p>Error: {error}</p>}
        </>
    );
}