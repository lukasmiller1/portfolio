"use client";

import { useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { Badge } from "@/components/ui/Badge";
import type { TeamMember } from "@/types/team";
import { DEMO_TEAM_MEMBERS } from "@/constants/team";

function parseHighlightedIntro(text: string) {
  const parts: { text: string; highlight: boolean }[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const open = remaining.indexOf("**");
    if (open === -1) {
      parts.push({ text: remaining, highlight: false });
      break;
    }
    const close = remaining.indexOf("**", open + 2);
    if (close === -1) {
      parts.push({ text: remaining, highlight: false });
      break;
    }
    if (open > 0) {
      parts.push({ text: remaining.slice(0, open), highlight: false });
    }
    parts.push({
      text: remaining.slice(open + 2, close),
      highlight: true,
    });
    remaining = remaining.slice(close + 2);
  }
  return parts;
}

export default function TeamPage() {
  const [members] = useState<TeamMember[]>(DEMO_TEAM_MEMBERS);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <PageContainer className="gap-10 pt-16">
      <section className="space-y-4">
        <Badge>Meet the team behind these projects.</Badge>
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Get to know the experts driving this
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          Introduce the people working on these games, scripts, bots, and
          websites. Share what each person brings to the projects.
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article
              key={member._id}
              className="flex flex-col items-center"
            >
              <div className="relative aspect-square w-2/3 max-w-[16rem] overflow-hidden rounded-lg border border-white/10">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt=""
                    className="h-full w-full object-cover object-top grayscale"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/5 text-zinc-500">
                    <span className="text-3xl">?</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex w-2/3 max-w-[16rem] flex-col items-center gap-1 text-center">
                <h2 className="text-lg font-semibold text-amber-400">
                  {member.name}
                </h2>
                <p className="text-sm text-zinc-400">
                  {member.role}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(member)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-amber-400 transition hover:text-amber-300"
                >
                  More Info
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
          {members.length === 0 && (
            <p className="col-span-full text-center text-sm text-zinc-500">
              No team members yet.
            </p>
          )}
        </section>

      {selected && (
        <TeamMemberDetailModal
          member={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </PageContainer>
  );
}

function TeamMemberDetailModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const paragraphs = member.introduction
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col overflow-y-auto rounded-l-2xl border-l border-white/10 bg-zinc-900/95 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-detail-name"
      >
        <div className="sticky top-0 z-10 flex justify-end border-b border-white/10 bg-zinc-900/95 p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/40 text-amber-400 transition hover:bg-amber-500/10"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-zinc-800 ring-2 ring-amber-500/30">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt=""
                  className="h-full w-full object-cover object-top grayscale"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-500">
                  ?
                </div>
              )}
            </div>
            <h2
              id="team-detail-name"
              className="text-2xl font-bold text-amber-400"
            >
              {member.name}
            </h2>
            <p className="text-sm font-medium text-zinc-200">{member.role}</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-zinc-200">
            {paragraphs.map((para, i) => (
              <p key={i} className="flex flex-wrap gap-x-1">
                {parseHighlightedIntro(para).map((p, j) =>
                  p.highlight ? (
                    <span key={j} className="font-semibold text-amber-400">
                      {p.text}
                    </span>
                  ) : (
                    <span key={j}>{p.text}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
