import { CircleXIcon } from "lucide-react";

import RenderItems from "@/components/utility/RenderItems";
import { IApiError } from "@/types";

import { Alert, AlertProps } from "../utility/Alert";
import { List, ListProps } from "../utility/list";

export type ApiErrorMessageListProps = {
  error: IApiError;
  containerProps?: ListProps;
  messageListItemProps?: AlertProps | ((index: number) => AlertProps);
};

function ApiErrorMessageList({
  error,
  containerProps,
  messageListItemProps,
}: ApiErrorMessageListProps) {
  return (
    <List {...containerProps}>
      <RenderItems
        items={error.messages}
        renderItem={(message, index) => {
          const finalMessageListItemProps =
            typeof messageListItemProps === "function"
              ? messageListItemProps(index)
              : messageListItemProps;

          return (
            <Alert
              {...finalMessageListItemProps}
              type="error"
              Icon={CircleXIcon}
            >
              {message}
            </Alert>
          );
        }}
      />
    </List>
  );
}

export default ApiErrorMessageList;
