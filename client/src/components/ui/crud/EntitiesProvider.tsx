import { PropsWithChildren, useState } from "react";

import { EntitiesContext } from "@/contexts/EntitiesContext";

export function EntitiesProvider<TEntity>({ children }: PropsWithChildren) {
  const state = useState<TEntity[]>([]);

  return (
    <EntitiesContext.Provider value={state}>
      {children}
    </EntitiesContext.Provider>
  );
}
