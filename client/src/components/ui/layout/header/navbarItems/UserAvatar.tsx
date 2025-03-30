import { useRef } from "react";

import { BadgeCheckIcon, LogOutIcon, UserIcon } from "lucide-react";

import { Button, Image } from "@/components/utility";
import { List, ListItem } from "@/components/utility/list";
import PATH from "@/constants/path";
import { useAuth } from "@/contexts/AuthContext";
import { useClickOutside, useToggleState } from "@/hooks";
import { User } from "@/types";
import { getAvatarChildren } from "@/utils";

function UserAvatar() {
  const state = useAuth();

  if (state.isLoggedIn) {
    return <LoggedInUserAvatar user={state.user} />;
  }

  return (
    <Button
      to={PATH.auth.login}
      variant="icon"
      className="mr-2"
      isLinkComponent
    >
      <UserIcon />
    </Button>
  );
}

export default UserAvatar;

function LoggedInUserAvatar({ user }: { user: User }) {
  const [isOpened, toggleIsOpened, setIsOpened] = useToggleState();
  const avatarChildren = getAvatarChildren(user);
  const { logout } = useAuth();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setIsOpened(false));

  return (
    <div
      ref={menuRef}
      className="flex items-center justify-center size-12 bg-info hover:bg-info relative rounded-full mr-2"
    >
      <Button
        variant="icon"
        onClick={toggleIsOpened}
        className="hover:bg-transparent z-10 absolute inset-0"
      ></Button>
      {user.avatarImage != null ? (
        <Image
          src={user.avatarImage}
          alt={avatarChildren}
          className="rounded-full"
        />
      ) : (
        <span className="flex items-center justify-center size-full">
          {avatarChildren}
        </span>
      )}
      {isOpened && (
        <List className="absolute top-full gap-2 left-0 bg-base-300 shadow-lg shadow-slate-950 rounded min-w-48">
          <ListItem containerProps={{ className: "flex flex-col" }}>
            <span>{user.email}</span>
            <div className="flex gap-2 items-center -mt-1">
              {user.isVerified && (
                <BadgeCheckIcon className="size-5 text-info stroke-info" />
              )}
              <span className="text-nowrap">{user.fullName}</span>
            </div>
          </ListItem>
          <ListItem>
            <Button
              className="btn-error w-full flex gap-2 items-center"
              onClick={logout}
            >
              <LogOutIcon className="size-5" />
              <span>خروج</span>
            </Button>
          </ListItem>
        </List>
      )}
    </div>
  );
}
