'use client';

import React from "react";
import { Button } from "@/components/ui/button";

export default function ClaimButton({ onClick }) {
  return (
    <Button variant="secondary" onClick={onClick}>
      Claim Funds
    </Button>
  );
}
