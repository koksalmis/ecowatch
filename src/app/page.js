import Image from "next/image";
import SSEListener  from "./component/SSEListener";
export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <SSEListener /> 
    </main>
  );
}
