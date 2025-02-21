import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/utility";
import IconWrapper from "@/components/utility/IconWrapper";
import { useAuth } from "@/contexts/AuthContext";

import MenuButton from "../MenuButton";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav
      className="flex justify-between py-2 px-3 h-fit items-center w-full bg-dark"
      dir="rtl"
    >
      <MenuButton />
      <h2 className="text-xl font-bold">پیشخوان ادمین</h2>
      <Button variant="icon" onClick={logout}>
        <IconWrapper Icon={LogOutIcon} />
      </Button>
    </nav>
  );
}

export default Navbar;
