import React from "react";

type RenderItemsProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

function RenderItems<T>({ items, renderItem }: RenderItemsProps<T>) {
  return <>{React.Children.toArray(items.map(renderItem))}</>;
}

export default RenderItems;
