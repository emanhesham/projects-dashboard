'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
      router.push('/login');
      return;
    }

    setRole(userRole || 'user');

    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/allprojects?role=${userRole || 'user'}`,
          { cache: 'no-store' }
        );

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project? ' + id)) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/project/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) throw new Error('Failed to delete');

      // امسحه من الواجهة بدون إعادة تحميل الصفحة
      setProjects((prev) => prev.filter((p: any) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mb-4">
        Welcome, <span className="font-semibold">{role}</span>
      </h2>

      <ul>
        {projects.map((project: any) => (
          <li
            key={project.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{project.name}</p>
              <p className="text-sm text-gray-600">Owner: {project.owner}</p>
            </div>
            <div className="flex gap-4 justify-end">
              <Link
                href={`/projects/${project.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                View Details
              </Link>

              {role.toLocaleLowerCase() === 'admin' && (
                <div className="flex gap-2">
                  <Link
                    href={`/editproject/${project.id}`}
                    className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* {role.toLocaleLowerCase() === 'admin' && (
        <div className='flex justify-end'>
          <button className="mt-6  bg-blue-600 text-white px-4 py-2 rounded">
            + Add Project
          </button>
        </div>
      )} */}
    </div>
  );
}
