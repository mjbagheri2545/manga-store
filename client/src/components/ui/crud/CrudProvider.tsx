import { Context, PropsWithChildren, useState } from "react";

import { State } from "@/types";

type CrudContext<TEntity> = {
  entities: TEntity[];
  setEntities: State<TEntity[]>[1];
};

type CrudProviderProps<TEntity> = PropsWithChildren & {
  Context: Context<CrudContext<TEntity> | null>;
};

function CrudProvider<TEntity>({
  Context,
  children,
}: CrudProviderProps<TEntity>) {
  const [entities, setEntities] = useState<TEntity[]>([]);

  return (
    <Context.Provider value={{ entities, setEntities }}>
      {children}
    </Context.Provider>
  );
}

export default CrudProvider;
