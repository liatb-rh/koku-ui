import { useCallback, useEffect, useRef, useState } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useStateCallback<T>(initialState: T): [T, (state: T, cb?: (_state: T) => void) => void] {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<((_state: T) => void) | undefined>(undefined);

  const setStateCallback = useCallback((_state: T, cb?: (_state: T) => void) => {
    cbRef.current = cb;
    setState(_state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, setStateCallback];
}


