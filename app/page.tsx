"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { PageContainer } from "@/components/ui/PageContainer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectSearch } from "@/components/home/ProjectSearch";
import { CategoryCards } from "@/components/home/CategoryCards";
import { ProjectSnapshotCard } from "@/components/home/ProjectSnapshotCard";
import { ProjectsByCategory } from "@/components/home/ProjectsByCategory";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { projects, loading, error, groupedByType } = useProjects(search);

  return (
    <PageContainer className="gap-16">
      <section
        id="home"
        className="mt-8 grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      >
        <div className="space-y-6">
          <HeroSection />
          <ProjectSearch value={search} onChange={setSearch} />
          <CategoryCards />
        </div>
        <ProjectSnapshotCard />
      </section>

      <ProjectsByCategory
        groupedByType={groupedByType}
        loading={loading}
        error={error}
        totalCount={projects.length}
      />
    </PageContainer>
  );
}
