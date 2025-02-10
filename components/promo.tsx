import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />
          <h3 className="font-bold text-lg">Adquiere el Plan Pro</h3>
        </div>
        <p className="text-muted-foreground">¡Obten vidas ilimitadas y más!</p>
      </div>
      <Button asChild variant="super" className="w-full" size="lg">
        <Link href="/shop">Quiero ser pro</Link>
      </Button>
    </div>
  );
};
