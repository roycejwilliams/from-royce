import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllWork, createWork } from "@/lib/work";
import type { Project } from "@/lib/projects";

export type { Project };

export const useWorks = () =>
  useQuery({
    queryKey: ["work"],
    queryFn: getAllWork,
  });

export const useCreateWork = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createWork,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work"] }),
  });
};
