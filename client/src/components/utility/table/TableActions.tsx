import { useState } from "react";

import { ClipboardListIcon, PencilIcon, Trash2Icon } from "lucide-react";

import ErrorModal from "@/components/ui/ErrorModal";
import PATH from "@/constants/path";
import { useExecuteApi } from "@/lib/api";
import { EntityKey, ICrudApi, State } from "@/types";
import { getEntityName, parseApiResponse } from "@/utils";

import { Button } from "../Button";
import { IconWrapper } from "../IconWrapper";
import { Tooltip } from "../Tooltip";

export type TableActionsProps = {
  id: string;
  deleteMethod: ICrudApi["delete"];
  onSuccessfulDelete: (id: string) => void;
  entityKey: EntityKey;
  entityPath?: string;
  isEditPageNeed?: boolean;
};

export function TableActions({
  id,
  entityKey,
  entityPath,
  isEditPageNeed = true,
  ...restProps
}: TableActionsProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Tooltip title="مشاهده">
        <Button
          variant="icon"
          isLinkComponent
          to={
            entityPath != null
              ? `${entityPath}/${id}`
              : PATH.admin.info(entityKey, id)
          }
        >
          <IconWrapper Icon={ClipboardListIcon} />
        </Button>
      </Tooltip>
      {isEditPageNeed && (
        <Tooltip title="به‌روزرسانی">
          <Button
            variant="icon"
            isLinkComponent
            to={
              entityPath != null
                ? `${entityPath}/edit/${id}`
                : PATH.admin.update(entityKey, id)
            }
          >
            <IconWrapper Icon={PencilIcon} />
          </Button>
        </Tooltip>
      )}
      <Tooltip title="حذف">
        <Button
          variant="icon"
          iconType="error"
          onClick={() => setIsOpened(true)}
        >
          <IconWrapper Icon={Trash2Icon} />
        </Button>
      </Tooltip>
      {isOpened && (
        <TableActionsModal
          {...restProps}
          entityKey={entityKey}
          id={id}
          setIsOpened={setIsOpened}
        />
      )}
    </>
  );
}

type TableActionsModalProps = TableActionsProps & {
  setIsOpened: State<boolean>[1];
};

function TableActionsModal({
  id,
  deleteMethod,
  onSuccessfulDelete,
  setIsOpened,
  entityKey,
}: TableActionsModalProps) {
  const { execute, status } = useExecuteApi(deleteMethod);

  async function handleOnDelete() {
    const response = await execute({ params: { id } });

    parseApiResponse(response, () => onSuccessfulDelete(id));
    setIsOpened(false);
  }

  const entityName = getEntityName(entityKey);

  return (
    <ErrorModal
      text={`آیا مطمئن هستید که می خواهید این ${entityName} را حذف کنید؟`}
    >
      <Button onClick={() => setIsOpened(false)} className="flex-1">
        لغو
      </Button>
      <Button
        isLoading={status === "pending"}
        onClick={handleOnDelete}
        className="btn-error flex-1"
      >
        حذف
      </Button>
    </ErrorModal>
  );
}
