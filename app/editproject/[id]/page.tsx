'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams(); // ← أهم حاجة هنا
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('Page ID:', id);

  // 🟦 Fetch project
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Not found');

        const data = await res.json();
        setProject(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // 🟩 Update project
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updated = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error('Update failed');

      alert('Project updated successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6 text-red-500">Project not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit {project.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            defaultValue={project.name}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={project.description}
            className="border px-3 py-2 rounded w-full"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={project.startDate}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={project.endDate}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <input
            name="status"
            defaultValue={project.status}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Progress (%)</label>
          <input
            type="number"
            name="progress"
            defaultValue={project.progress}
            min={0}
            max={100}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Budget ($)</label>
          <input
            type="number"
            name="budget"
            defaultValue={project.budget}
            min={0}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Owner</label>
          <input
            type="text"
            name="Owner"
            defaultValue={project.owner}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
