// import { unlockNoRefScript } from "@/server/unlockNoRefScript";
// import { NextResponse } from "next/server";
// import { UTxO } from "@meshsdk/core";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { utxos, address, collateral } = body;

//         if (!utxos || !address) {
//             return NextResponse.json(
//                 { error: "UTXOs and address are required" },
//                 { status: 400 }
//             );
//         }

//         const result = await unlockNoRefScript(utxos as UTxO[], address as string, collateral as UTxO[]);
        
//         if ('error' in result && result.error) {
//             return NextResponse.json(
//                 { error: result.error },
//                 { status: 500 }
//             );
//         }
        
//         if ('unsignedTx' in result && result.unsignedTx) {
//             return NextResponse.json({ unsignedTx: result.unsignedTx });
//         }

//         return NextResponse.json(
//             { error: "Unexpected response from unlockNoRefScript" },
//             { status: 500 }
//         );

//     } catch (error: any) {
//         return NextResponse.json(
//             { error: error.message || "Internal server error" },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import { unlockNoRefScript } from "@/server/unlockNoRefScript";
import { UTxO } from "@meshsdk/core";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utxos, address, collateral } = body;
        const result = await unlockNoRefScript(utxos as UTxO[], address as string, collateral as UTxO[]);
        if (!!result.Error && result.Error instanceof Error) {
            return NextResponse.json(
                { error: result.Error.message },
                { status: 500 }
            );
        }
        if (result.unsignedTx) {
            return NextResponse.json(
                { unsignedTx: result.unsignedTx },
                { status: 200 }
            );
        }

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}