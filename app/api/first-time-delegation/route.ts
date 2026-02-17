// import { NextResponse } from "next/server";
// import { firstTimeDelegation } from "@/server/firstTimeDelegation";
// import { UTxO } from "@meshsdk/core";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { utxos, changeAddress, rewardAddress, poolId } = body;
//         const result = await firstTimeDelegation(utxos, changeAddress, rewardAddress, poolId);
//         if (result.error != null) {
//             return NextResponse.json(
//                 { error: result.error },
//                 { status: 500 }
//             );
//         }
//         if (result.unsignedTx) {
//             return NextResponse.json(
//                 { unsignedTx: result.unsignedTx },
//                 { status: 200 }
//             );
//         }
//     }catch (error: any) {
//         return NextResponse.json(
//             { error: error.message || "Internal server error" },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import { firstTimeDelegation } from "@/server/firstTimeDelegation";
import { UTxO } from "@meshsdk/core";


export async function POST(request: Request) {
    try {
        const body : { utxos: UTxO[], changeAddress: string, rewardAddress: string, poolID: string } = await request.json();
        const { utxos, changeAddress, rewardAddress, poolID } = body;
        const result = await firstTimeDelegation(utxos, changeAddress, rewardAddress, poolID);
        if (result.error != null) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }
        if (result.unsignedTx) {
            return NextResponse.json(
                { unsignedTx: result.unsignedTx },
                { status: 200 }
            );
        }
    }catch (error) {
        console.error("First-time delegation error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

