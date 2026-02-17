import { FirstTx } from "@/components/FirstTx";
import SpendArtefacts from "../components/Spend-artefacts";
import { BuilderFestTicketButton } from "@/components/BuilderFestTicketButton";
// import { UnlockNoRefScript } from "@/components/unlockNoRefScriptButton";
import {DeployRefScriptButton} from "@/components/DeployRefScriptButton";
import { RegisterDrepButton } from "@/components/RegisterDrep";
import { FirstTimeDelegationButton } from "@/components/FirstTimeDelegationButton";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* <BuilderFestTicketButton /> */}
        {/*<SpendArtefacts />*/}
        {/* <FirstTx /> */}
        {/* <UnlockNoRefScript /> */}
      {/* <DeployRefScriptButton /> */}
        {/* <RegisterDrepButton /> */}
        <FirstTimeDelegationButton />
      </main>
    </div>
  );
}
