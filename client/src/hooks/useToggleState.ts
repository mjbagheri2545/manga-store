import { useState } from "react";

export function useToggleState(initialState: boolean = false) {
  const [state, setState] = useState(initialState);

  function toggleState() {
    setState((current) => !current);
  }

  return [state, toggleState, setState] as const;
}
