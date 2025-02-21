import { LucideIcon } from "lucide-react";

import { List, ListItem } from "@/components/utility/list";
import { StrictOmit, WithId } from "@/types";

type KeyInfo = {
  keyName: string;
  Icon: LucideIcon;
};

type EntityInfoListProps<TEntity extends WithId> = {
  entity: TEntity;
  info: {
    [Key in keyof StrictOmit<TEntity, "id">]: KeyInfo;
  };
};

export function EntityInfoList<TEntity extends WithId>({
  entity,
  info,
}: EntityInfoListProps<TEntity>) {
  return (
    <>
      <List isWrap isDirectionRow>
        {Object.entries<KeyInfo>(info).map(([key, keyInfo]) => (
          <ListItem Icon={keyInfo.Icon} key={key}>
            {keyInfo.keyName}: {String(entity[key as keyof TEntity])}
          </ListItem>
        ))}
      </List>
    </>
  );
}
