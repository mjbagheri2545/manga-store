import { LucideIcon } from "lucide-react";

import RenderItems from "@/components/ui/RenderItems";
import { Entity } from "@/types";

import TextWithIcon from "../../TextWithIcon";

type KeyInfo<TEntity> =
  | {
      keyName: string;
      Icon: LucideIcon;
    }
  | { renderItem: (value?: TEntity[keyof TEntity]) => React.ReactNode };

export type TEntityInfo<TEntity extends Entity> = Record<
  string,
  KeyInfo<TEntity>
>;

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
      <div className="grid gap-5 grid-cols-1]">
        <RenderItems
          items={Object.entries<KeyInfo<TEntity>>(info)}
          renderItem={([key, keyInfo]) => {
            const entityInfo = entity[key as keyof TEntity];

            if (entityInfo == null) return;

            if ("renderItem" in keyInfo) {
              return keyInfo.renderItem(entityInfo);
            }

            // i use ` ` because i want to pass string
            // then automatically it wrapped by span with flex-1
            return (
              <TextWithIcon Icon={keyInfo.Icon}>
                {`${keyInfo.keyName}: ${String(entityInfo)}`}
              </TextWithIcon>
            );
          }}
        />
      </div>
    </>
  );
}
