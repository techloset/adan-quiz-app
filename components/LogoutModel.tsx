"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoutModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModel() {
  return (
    <div>LogoutModel</div>
  )
}

