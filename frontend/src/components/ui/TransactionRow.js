'use client';

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { FiGithub } from "react-icons/fi";


const iconMap = {
  twitter: <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />,
  github: <FiGithub className="w-5 h-5 text-[#333]" />,
};

export default function TransactionRow({ transaction }) {
  return (
    <TableRow>
      <TableCell className="px-4 py-2">
        <div className="font-medium">{transaction.user}</div>
        <div className="text-muted-foreground text-sm">{transaction.username}</div>
      </TableCell>
      <TableCell className="px-4 py-2">
        <div className="flex items-center justify-center gap-2">
          {iconMap[transaction.platform]}
          <span>{transaction.platform.charAt(0).toUpperCase() + transaction.platform.slice(1)}</span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-2 text-right">${transaction.amount}</TableCell>
    </TableRow>
  );
}
