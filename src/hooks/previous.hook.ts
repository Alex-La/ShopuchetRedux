import {useEffect, useRef} from 'react';

const usePrevious = <T>(value?: T) => {
  const ref = useRef<typeof value>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
