'use client';
import { TransferComponent } from "@/components/transfer-component";

export default function Transfer() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-4xl">
          Send & Receive Money with Cukka
        </h1>
        <p className="text-muted-foreground md:text-xl mt-4">
          Easily send and receive money through your favorite social media platforms.
        </p>
      </div>
      <TransferComponent />
    </main>
  );
}
