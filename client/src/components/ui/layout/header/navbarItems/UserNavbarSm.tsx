import { LogOutIcon, UserIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import { useAuth } from "@/contexts/AuthContext";

type UserNavbarSmProps = {
  itemClassName: string;
};

function UserNavbarSm({ itemClassName }: UserNavbarSmProps) {
  const { isLoggedIn, logout } = useAuth();

  if (isLoggedIn) {
    return (
      <Button
        className={twMerge(
          "btn-error mx-[2%] mt-3 mb-8 text-lg",
          itemClassName
        )}
        onClick={logout}
      >
        <LogOutIcon className="size-5" />
        <span>خروج</span>
      </Button>
    );
  }

  return (
    <Button
      to={PATH.auth.login}
      isLinkComponent
      className={twMerge("mx-[2%] mt-3 mb-8 text-lg", itemClassName)}
    >
      <UserIcon />
      <span>ورود / ثبت نام</span>
    </Button>
  );
}

export default UserNavbarSm;
