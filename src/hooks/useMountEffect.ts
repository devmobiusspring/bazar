import { useEffect, useRef, DependencyList } from "react";

/**
 * Run callback once when the component is mounted
 * @param {Object} params - The parameters object.
 * @param {() => void | Promise<void>} params.effect - The callback to run on mount.
 * @param {DependencyList} [params.deps=[]] - The array of dependencies.
 * @param {() => void} [params.unMount] - The callback to run on unmount.
 */
export const useMountEffect = ({
  effect,
  deps = [],
  unMount,
}: {
  effect: () => void | Promise<void>;
  deps?: DependencyList;
  unMount?: () => void;
}) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      (async () => await effect())();

      return () => {
        unMount && unMount();
      };
    }
  }, deps);
};

export default useMountEffect;
