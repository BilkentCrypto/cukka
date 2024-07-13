'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { TransferComponent } from "@/components/transfer-component";

export default function Transfer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = {
    platform: searchParams.get('platform') || '',
    username: searchParams.get('username') || '',
    amount: searchParams.get('amount') || '',
    assetType: searchParams.get('assetType') || '',
  };

  const handleTransferSubmit = ({ platform, username, amount, assetType }) => {
    const query = new URLSearchParams({ platform, username, amount, assetType }).toString();
    router.push(`/transfer?${query}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-4xl">
          Send & Receive Money with Cukka
        </h1>
        <p className="text-muted-foreground md:text-xl mt-4">
          Easily send and receive money through your favorite social media platforms.
        </p>
      </div>
      <TransferComponent initialValues={initialValues} onSubmit={handleTransferSubmit} />
    </main>
  );
}
