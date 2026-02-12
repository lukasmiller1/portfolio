"use client";

import { useCallback, useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { Card } from "@/components/ui/Card";
import { ToastContainer, type ToastItem } from "@/components/admin/ToastContainer";
import { useProjects } from "@/hooks/useProjects";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { Project, ProjectType } from "@/types/project";
import type { TeamMember } from "@/types/team";

const PROJECT_TYPES: ProjectType[] = [
  "game",
  "script",
  "bot",
  "website",
  "other",
];

type AdminTab = "project" | "user" | "team" | "contact" | "about";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "project", label: "Project" },
  { id: "user", label: "User" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
  { id: "about", label: "About" },
];

const TOAST_DURATION_MS = 4000;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("project");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <PageContainer className="gap-8 pt-16">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <section className="space-y-3">
        <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Admin
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-200">
          Internal tools for managing projects, users, team information, contact
          details, and about content for this site.
        </p>
      </section>

      <nav
        aria-label="Admin sections"
        className="flex flex-wrap gap-2 text-xs font-medium text-zinc-300"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-3 py-1.5 transition ${
                isActive
                  ? "border-sky-400 bg-sky-500/20 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "border-white/10 bg-black/40 hover:border-sky-400/60 hover:text-sky-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "project" && <ProjectAdminSection addToast={addToast} />}
      {activeTab === "user" && <PlaceholderSection title="User" />}
      {activeTab === "team" && <TeamAdminSection addToast={addToast} />}
      {activeTab === "contact" && <PlaceholderSection title="Contact" />}
      {activeTab === "about" && <PlaceholderSection title="About" />}
    </PageContainer>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <Card className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-50">
        {title} management
      </h2>
      <p className="text-xs text-zinc-300">
        This tab is reserved for future {title.toLowerCase()} management tools.
        You can add forms and tables here when you are ready to manage this
        data from the admin panel.
      </p>
    </Card>
  );
}

const emptyTeamForm = {
  name: "",
  role: "",
  introduction: "",
  photo: "",
};

function teamMemberToForm(m: TeamMember) {
  return {
    name: m.name,
    role: m.role,
    introduction: m.introduction,
    photo: m.photo ?? "",
  };
}

function TeamAdminSection({
  addToast,
}: {
  addToast: (message: string, type: "success" | "error") => void;
}) {
  const [search, setSearch] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTeamForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { members, loading, error } = useTeamMembers(search, refreshTrigger);
  const { members: allMembers } = useTeamMembers("", refreshTrigger);

  function openCreate() {
    setForm(emptyTeamForm);
    setFormError(null);
    setModalMode("create");
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(member: TeamMember) {
    setForm(teamMemberToForm(member));
    setFormError(null);
    setModalMode("edit");
    setEditingId(member._id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      if (modalMode === "create") {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            role: form.role.trim(),
            introduction: form.introduction.trim(),
            photo: form.photo.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || "Failed to create team member");
        }
        addToast("Team member added.", "success");
      } else if (editingId) {
        const res = await fetch(`/api/team/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            role: form.role.trim(),
            introduction: form.introduction.trim(),
            photo: form.photo.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || "Failed to update team member");
        }
        addToast("Team member updated.", "success");
      }
      setRefreshTrigger((t) => t + 1);
      closeModal();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setFormError(msg);
      addToast(msg, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(member: TeamMember) {
    if (!confirm(`Delete "${member.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/team/${member._id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to delete team member");
      }
      addToast("Team member deleted.", "success");
      setRefreshTrigger((t) => t + 1);
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "Failed to delete team member",
        "error"
      );
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav className="text-xs text-zinc-400" aria-label="Breadcrumb">
          <span>Admin</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-200">Team</span>
        </nav>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
        >
          Add team member
        </button>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-50">Team members</h2>
              <p className="text-xs text-zinc-400">
                Search or filter by name.
              </p>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 md:w-64"
              aria-label="Search team members by name"
            />
          </div>
          {allMembers.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                Navigate by name:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allMembers.map((member) => (
                  <button
                    key={member._id}
                    type="button"
                    onClick={() => setSearch(member.name)}
                    className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] text-zinc-200 transition hover:border-sky-400/60 hover:bg-sky-500/20 hover:text-sky-100"
                  >
                    {member.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading && (
          <p className="text-xs text-zinc-400">Loading team members…</p>
        )}
        {error && (
          <p className="text-xs text-red-300">{error}</p>
        )}

        <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-black/40 text-xs">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-black/80 text-[11px] uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Photo</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Introduction</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member._id}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-3 py-2 align-top">
                    {member.photo ? (
                      <span className="max-w-[120px] truncate block text-zinc-300" title={member.photo}>
                        {member.photo}
                      </span>
                    ) : (
                      <span className="text-zinc-500">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 align-top font-semibold text-zinc-50">
                    {member.name}
                  </td>
                  <td className="px-3 py-2 align-top text-zinc-300">
                    {member.role}
                  </td>
                  <td className="max-w-xs truncate px-3 py-2 align-top text-zinc-300" title={member.introduction}>
                    {member.introduction}
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(member)}
                        className="rounded border border-white/20 px-2 py-1 text-[11px] font-medium text-zinc-200 transition hover:bg-white/10"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(member)}
                        className="rounded border border-red-500/40 px-2 py-1 text-[11px] font-medium text-red-200 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !members.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-xs text-zinc-500"
                  >
                    No team members found. Click “Add team member” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <TeamModal
          mode={modalMode}
          form={form}
          setForm={setForm}
          formError={formError}
          saving={saving}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

function TeamModal({
  mode,
  form,
  setForm,
  formError,
  saving,
  onSubmit,
  onClose,
}: {
  mode: "create" | "edit";
  form: typeof emptyTeamForm;
  setForm: React.Dispatch<React.SetStateAction<typeof emptyTeamForm>>;
  formError: string | null;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-900 px-4 py-3">
          <h2 id="team-modal-title" className="text-sm font-semibold text-zinc-50">
            {mode === "create" ? "Add team member" : "Edit team member"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-zinc-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form className="space-y-3 p-4 text-xs" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="Full name"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Role
              </span>
              <input
                required
                value={form.role}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="e.g. Developer"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
              Introduction
            </span>
            <textarea
              required
              rows={3}
              value={form.introduction}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, introduction: e.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="Short bio or description"
            />
          </label>

          <label className="block space-y-1">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
              Photo (image path or URL)
            </span>
            <input
              value={form.photo}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, photo: e.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="Optional"
            />
          </label>

          {formError && (
            <p className="text-[11px] text-red-300">{formError}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400 disabled:opacity-60"
            >
              {saving ? "Saving…" : mode === "create" ? "Add member" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const emptyForm = {
  name: "",
  description: "",
  source: "",
  price: "",
  image: "",
  video: "",
  type: "game" as ProjectType,
};

function projectToForm(p: Project) {
  return {
    name: p.name,
    description: p.description,
    source: p.source,
    price: String(p.price),
    image: p.image ?? "",
    video: p.video ?? "",
    type: p.type,
  };
}

function ProjectAdminSection({
  addToast,
}: {
  addToast: (message: string, type: "success" | "error") => void;
}) {
  const [search, setSearch] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { projects, loading, error } = useProjects(search, refreshTrigger);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function getMediaSummary(project: Project): string {
    if (project.image && project.video) return "Image + Video";
    if (project.video) return "Video";
    if (project.image) return "Image";
    return "None";
  }

  function openCreate() {
    setFormError(null);
    setForm(emptyForm);
    setModalMode("create");
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setFormError(null);
    setForm(projectToForm(project));
    setModalMode("edit");
    setEditingId(project._id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    // Frontend validation of required fields
    if (!form.name.trim()) {
      const msg = "Name is required.";
      setFormError(msg);
      addToast(msg, "error");
      return;
    }
    if (!form.description.trim()) {
      const msg = "Description is required.";
      setFormError(msg);
      addToast(msg, "error");
      return;
    }
    if (!form.source.trim()) {
      const msg = "Source / repo is required.";
      setFormError(msg);
      addToast(msg, "error");
      return;
    }
    if (!PROJECT_TYPES.includes(form.type)) {
      const msg = "Type is invalid.";
      setFormError(msg);
      addToast(msg, "error");
      return;
    }
    if (!form.image.trim() && !form.video.trim()) {
      setFormError("At least one of image or video is required.");
      addToast("At least one of image or video is required.", "error");
      return;
    }
    const priceNumber = Number(form.price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setFormError("Price must be a non-negative number.");
      addToast("Price must be a non-negative number.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        source: form.source.trim(),
        price: priceNumber,
        image: form.image.trim() || null,
        video: form.video.trim() || null,
        type: form.type,
      };

      if (modalMode === "create") {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) throw new Error(data.error || "Failed to create project");
        addToast("Project created successfully.", "success");
      } else {
        if (!editingId) return;
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) throw new Error(data.error || "Failed to update project");
        addToast("Project updated successfully.", "success");
      }

      closeModal();
      setForm(emptyForm);
      setRefreshTrigger((t) => t + 1);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      const rawMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      const friendlyMessage =
        rawMessage === "Failed to create project"
          ? "Server error while creating project. Make sure your MongoDB database (MONGODB_URI) is running and reachable."
          : rawMessage;
      setFormError(friendlyMessage);
      addToast(friendlyMessage, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to delete project");
      }
      addToast("Project deleted.", "success");
      setRefreshTrigger((t) => t + 1);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      addToast(
        err instanceof Error ? err.message : "Failed to delete project",
        "error"
      );
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav className="text-xs text-zinc-400" aria-label="Breadcrumb">
          <span>Admin</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-200">Project</span>
        </nav>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
        >
          Add project
        </button>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-50">Projects</h2>
            <p className="text-xs text-zinc-400">
              Filter by name or description.
            </p>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 md:w-64"
          />
        </div>

        {loading && (
          <p className="text-xs text-zinc-400">Loading projects…</p>
        )}
        {error && (
          <p className="text-xs text-red-300">
            {error} (showing demo data if available)
          </p>
        )}

        <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-black/40 text-xs">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-black/80 text-[11px] uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-left">Media</th>
                <th className="px-3 py-2 text-left">Source</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-3 py-2 align-top font-semibold text-zinc-50">
                    {project.name}
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] uppercase tracking-wide text-zinc-500">
                    {project.type}
                  </td>
                  <td className="px-3 py-2 align-top whitespace-nowrap font-semibold text-sky-200">
                    ${project.price}
                  </td>
                  <td className="px-3 py-2 align-top text-zinc-300">
                    {getMediaSummary(project)}
                  </td>
                  <td className="max-w-xs truncate px-3 py-2 align-top text-zinc-300">
                    {project.source}
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(project)}
                        className="rounded border border-white/20 px-2 py-1 text-[11px] font-medium text-zinc-200 transition hover:bg-white/10"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="rounded border border-red-500/40 px-2 py-1 text-[11px] font-medium text-red-200 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !projects.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-6 text-center text-xs text-zinc-500"
                  >
                    No projects found. Click “Add project” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <ProjectModal
          mode={modalMode}
          form={form}
          setForm={setForm}
          formError={formError}
          saving={saving}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

function ProjectModal({
  mode,
  form,
  setForm,
  formError,
  saving,
  onSubmit,
  onClose,
}: {
  mode: "create" | "edit";
  form: typeof emptyForm;
  setForm: React.Dispatch<React.SetStateAction<typeof emptyForm>>;
  formError: string | null;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-900 px-4 py-3">
          <h2 id="project-modal-title" className="text-sm font-semibold text-zinc-50">
            {mode === "create" ? "Create new project" : "Edit project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-zinc-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form className="space-y-3 p-4 text-xs" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="Project name"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Type
              </span>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value as ProjectType,
                  }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none"
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
              Description
            </span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="Short description of what this project does"
            />
          </label>

          <label className="block space-y-1">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
              Source / repo
            </span>
            <input
              required
              value={form.source}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, source: e.target.value }))
              }
              className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="e.g. private Git repo URL or note"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-3">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Price (USD)
              </span>
              <input
                required
                type="number"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="19"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Image URL
              </span>
              <input
                value={form.image}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="Optional"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Video URL
              </span>
              <input
                value={form.video}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, video: e.target.value }))
                }
                className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-1.5 text-zinc-100 outline-none placeholder:text-zinc-500"
                placeholder="Optional"
              />
            </label>
          </div>

          <p className="text-[11px] text-zinc-400">
            At least one of <span className="font-semibold">image</span> or{" "}
            <span className="font-semibold">video</span> is required.
          </p>

          {formError && (
            <p className="text-[11px] text-red-300">{formError}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-md shadow-sky-500/40 transition hover:bg-sky-400 disabled:opacity-60"
            >
              {saving ? "Saving…" : mode === "create" ? "Create project" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
