import ConnectButton from '@/components/ui/ConnectButton';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import Image from 'next/image'


export default async function NavigationBar() {

  return (
    <header className="bg-background border-b shadow-sm sticky top-0 z-10">
    <div className="container flex items-center justify-between h-16 px-4 md:px-6">
      <Link href="/" className="flex items-center gap-1" >
        <Image src="/logo.png" width={500} height={500} alt="Cukka" className="w-10 h-10" />
        <span className="text-lg font-semibold">Cukka</span>
      </Link>
      <nav className="hidden md:flex items-center gap-4">
        <Link href="/transfer" className="text-sm font-medium hover:text-primary transition-colors">
          Transfer
        </Link>
        <Link href="/my-accounts" className="text-sm font-medium hover:text-primary transition-colors" >
          My Accounts
        </Link>
<ConnectButton/>
      </nav>
      <Button variant="ghost" size="icon" className="md:hidden">
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </div>
  </header>
  );
}



function CurrencyIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8" />
        <line x1="3" x2="6" y1="3" y2="6" />
        <line x1="21" x2="18" y1="3" y2="6" />
        <line x1="3" x2="6" y1="21" y2="18" />
        <line x1="21" x2="18" y1="21" y2="18" />
      </svg>
    )
  }
  
  
  function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }