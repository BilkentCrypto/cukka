import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@/components/ui/table";
  import TwitterIcon from "@/components/icons/TwitterIcon";
  import GithubIcon from "@/components/icons/GithubIcon";
  import InstagramIcon from "@/components/icons/InstagramIcon";
  import LinkedinIcon from "@/components/icons/LinkedinIcon";
  
  const iconMap = {
    twitter: <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />,
    github: <GithubIcon className="w-5 h-5 text-[#333]" />,
  };
  
  export default function TransactionTable({ transactions }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Social Media</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{transaction.user}</div>
                <div className="text-muted-foreground text-sm">{transaction.username}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {iconMap[transaction.platform]}
                  <span>{transaction.platform.charAt(0).toUpperCase() + transaction.platform.slice(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">${transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  