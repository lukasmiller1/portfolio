"use client";

import { useEffect, useState } from "react";
import type { TeamMember } from "@/types/team";

const API_TEAM = "/api/team";

export function useTeamMembers(searchByName: string, refreshTrigger?: number) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchByName.trim()) {
          params.set("search", searchByName.trim());
        }
        const res = await fetch(`${API_TEAM}?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          if (!cancelled) {
            setError(body.error || "Failed to load team members");
            setMembers([]);
          }
          return;
        }
        const data = (await res.json()) as { members: TeamMember[] };
        if (!cancelled) {
          setMembers(data.members ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load team members");
          setMembers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMembers();
    return () => {
      cancelled = true;
    };
  }, [searchByName, refreshTrigger]);

  return { members, loading, error };
}
