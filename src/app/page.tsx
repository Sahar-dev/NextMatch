import { auth, signOut } from "@/auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";
// the pages that are in the server side can be asynchron
export default async function Home() {
  const session = await auth();
  return (
    <div>
     <h1 className="text-3xl"> hello app!</h1>
     <h3 className="text-2xl font-semibold"> User session data</h3>
     {session ? (
      <div> 
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <form action={async()=>{
          "use server";
          await signOut();
        }}>
          <Button type="submit"  color="primary" variant="bordered" startContent={<FaRegSmile size={20} />}>
      Sign out
     </Button>
        </form>
      </div>
     ) :(
      <div>Not signed in</div>
     )}
     <Button  as={Link} href="/members" color="primary" variant="bordered" startContent={<FaRegSmile size={20} />}>
      Click me!
     </Button>
    </div>
  );
}
