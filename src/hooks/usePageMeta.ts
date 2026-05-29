import { useSeo } from "./useSeo";

/** @deprecated Use useSeo instead */
export function usePageMeta(title: string, description: string) {
  useSeo({ title, description });
}
