import { User } from "@/types";
import { getAvatarChildren } from "@/utils";

import { Image } from "../utility";

type AvatarProps = {
  user: Pick<User, "avatarImage" | "fullName">;
};

function Avatar({ user }: AvatarProps) {
  const avatarChildren = getAvatarChildren(user.fullName);
  return (
    <>
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
    </>
  );
}

export default Avatar;
