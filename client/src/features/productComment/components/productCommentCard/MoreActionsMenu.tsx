import { useRef } from "react";

import { EllipsisIcon, PencilIcon, ReplyIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/utility";
import { List, ListItem } from "@/components/utility/list";
import { useProduct } from "@/contexts/ProductContext";
import { useClickOutside, useToggleState } from "@/hooks";
import { useMutation } from "@/lib/api";

import productCommentApi from "../../api";

type MoreActionsMenuProps = {
  onEdit: () => void;
  onSuccessfulDelete: (id: string) => void;
  toggleIsReplying: () => void;
  productCommentId: string;
};

function MoreActionsMenu({
  onEdit,
  onSuccessfulDelete,
  toggleIsReplying,
  productCommentId,
}: MoreActionsMenuProps) {
  const [isOpened, toggleIsOpened, setIsOpened] = useToggleState();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const product = useProduct();

  useClickOutside(menuRef, () => setIsOpened(false));

  const { mutate, status } = useMutation(
    () =>
      productCommentApi.delete({ id: productCommentId, productId: product.id }),
    { onSuccess: () => onSuccessfulDelete(productCommentId) }
  );

  return (
    <div
      ref={menuRef}
      className="flex items-center justify-center size-12 relative rounded-full z-10"
    >
      <Button
        variant="icon"
        onClick={toggleIsOpened}
        className="z-10 absolute inset-0"
      />
      <EllipsisIcon />
      {isOpened && (
        <List className="absolute top-full gap-2 left-0 bg-base-300 shadow-lg shadow-slate-950 min-w-36 p-3 rounded">
          <ListItem
            Icon={ReplyIcon}
            iconProps={{ className: "size-5" }}
            containerProps={{
              className:
                "cursor-pointer transition hover:bg-slate-50/10 rounded hidden max-sm:flex",
              onClick: toggleIsReplying,
            }}
          >
            پاسخ
          </ListItem>
          <ListItem
            Icon={PencilIcon}
            iconProps={{ className: "size-5" }}
            containerProps={{
              className:
                "cursor-pointer items-center gap-3 transition hover:bg-slate-50/10 rounded",
              onClick: onEdit,
            }}
          >
            <span>ویرایش</span>
          </ListItem>
          <ListItem
            containerProps={{
              className:
                "text-error transition cursor-pointer hover:bg-red-600/15 rounded",
            }}
          >
            <button
              className="bg-transparent size-full hover:bg-transparent flex items-center gap-2"
              onClick={() => mutate()}
              disabled={status === "pending"}
            >
              <TrashIcon className="size-5" />
              <span>حذف</span>
            </button>
          </ListItem>
        </List>
      )}
    </div>
  );
}

export default MoreActionsMenu;
