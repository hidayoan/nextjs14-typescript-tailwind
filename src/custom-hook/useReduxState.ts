
'use client'

import { store } from "@/app/store";
import { useEffect, useState } from "react";

export function useReduxState() {
  const [state, setState] = useState(store.getState().darkmode.value);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState().darkmode.value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}