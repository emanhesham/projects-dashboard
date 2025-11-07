import Link from 'next/link';
// import { useRouter } from 'next/router';
// const router = useRouter();
export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/project/${projectId}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return (
      <h1 className="p-6 text-red-600 text-xl font-bold">Project not found</h1>
    );
  }

  const project = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit {project.name}</h1>

      <form
        action={`/api/project/${projectId}`}
        // action={`/dashboard`}
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
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
            type="text"
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

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            <link rel="stylesheet" href="/dashboard" />
            Save
          </button>

          <Link
            href="/dashboard"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
