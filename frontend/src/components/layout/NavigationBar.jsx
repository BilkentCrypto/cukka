import ConnectButton from '@/components/ui/ConnectButton';
import Link from 'next/link'


export default async function NavigationBar() {

  return (
    <div className="flex flex-row h-full justify-between">
        <div className="flex flex-row gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/my-accounts">My Accounts</Link>
        <Link href="/test">Test</Link>
        </div>
        <ConnectButton/>

    </div>
  );
}
