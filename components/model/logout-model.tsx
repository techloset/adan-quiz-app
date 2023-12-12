"use client";

import { useEffect, useState } from "react";
import { Model } from "./model";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

interface LogoutModelProps {
  isOpen: boolean;
  onClose: () => void;
}
export const LogoutModel: React.FC<LogoutModelProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoding] = useState(false);
  const [auth,setAuth] = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const Logout = async () => {
    try {
      setLoding(true);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      onClose();
    } catch (error) {
      console.log("error", error);
    } finally {
      router.refresh();
    }
  };
  return (
    <Model
      title="Are you sure you want to Logout"
      description="Please come agian anytime. 😢👋"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={Logout}>
          Logout
        </Button>
      </div>
    </Model>
  );
};
