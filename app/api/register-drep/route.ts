

import { drepTypes } from "@/server/registerDrep";
import { NextResponse } from "next/server";
import { registerDrep } from "@/server/registerDrep";
import { UTxO } from "@meshsdk/core";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utxos, changeAddress, drepId, anchorName, anchorUrl } = body;
        const result = await registerDrep({utxos, changeAddress, drepId, anchorName, anchorUrl} as drepTypes);
        if (!!result.error && result.error) {
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

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}