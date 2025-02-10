import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/thinking-person.svg"
            alt="Croatian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Logica
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/light-bulb.svg"
            alt="Flexibilidad Cognitiva"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Flexibilidad Cognitiva
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/team-meeting.svg"
            alt="Atentcion"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Atencion
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/glowing-star.svg"
            alt="Memoria"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Memoria
        </Button>
        {/* <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button> */}
      </div>
    </footer>
  );
};
