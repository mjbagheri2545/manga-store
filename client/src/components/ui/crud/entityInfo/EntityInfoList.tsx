import { LucideIcon } from "lucide-react";

import RenderItems from "@/components/utility/RenderItems";
import { Entity, StrictOmit } from "@/types";

export type KeyInfo<TEntity> =
  | {
      keyName: string;
      Icon: LucideIcon;
    }
  | { renderItem: (value: TEntity[keyof TEntity]) => React.ReactNode };

export type TEntityInfo<TEntity extends Entity> = {
  [Key in keyof StrictOmit<TEntity, "id">]: KeyInfo<TEntity>;
};

type EntityInfoListProps<TEntity extends Entity> = {
  entity: TEntity;
  info: TEntityInfo<TEntity>;
};

export function EntityInfoList<TEntity extends Entity>({
  entity,
  info,
}: EntityInfoListProps<TEntity>) {
  return (
    <>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        <RenderItems
          items={Object.entries<KeyInfo<TEntity>>(info)}
          renderItem={([key, keyInfo]) => {
            const entityInfo = entity[key as keyof TEntity];
            if (entityInfo == null) return;

            if ("renderItem" in keyInfo) {
              return keyInfo.renderItem(entityInfo);
            }

            return (
              <div className="flex items-center gap-2">
                <keyInfo.Icon className="size-5" />
                <span>
                  {keyInfo.keyName}: {String(entityInfo)}
                </span>
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
