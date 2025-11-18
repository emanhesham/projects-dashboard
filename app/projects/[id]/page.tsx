'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('Page ID:', id);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:4000/projects/${id}`);
        if (!res.ok) throw new Error('Project not found');

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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!project) return <p className="p-6 text-red-500">Project not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="mb-4">{project.description}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
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
            <tr>
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">{project.status || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {project.startDate || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{project.endDate || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {project.progress !== undefined
                  ? `${project.progress}%`
                  : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                {project.budget !== undefined ? `$${project.budget}` : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{project.owner}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
