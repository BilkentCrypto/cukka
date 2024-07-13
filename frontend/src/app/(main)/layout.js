import NavigationBar from '@/components/layout/NavigationBar';
import ConnectButton from '@/components/ui/ConnectButton';
import Link from 'next/link'


export default async function Layout({ children }) {

  return (
    <div >
        <NavigationBar/>
        {children}
    </div>
  );
}
