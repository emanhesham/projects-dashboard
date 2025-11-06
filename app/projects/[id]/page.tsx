export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>; // params is a Promise
}) {
  const { id } = await params; // ✅ unwrap the Promise
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
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="mb-4">{project.description}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Start Date</th>
              <th className="py-2 px-4 border-b text-left">End Date</th>
              <th className="py-2 px-4 border-b text-left">Progress</th>
              <th className="py-2 px-4 border-b text-left">Budget</th>
              <th className="py-2 px-4 border-b text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">{project.status || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {project.startDate || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{project.endDate || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {project.progress ? `${project.progress}%` : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                {project.budget ? `$${project.budget}` : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{project.owner}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
