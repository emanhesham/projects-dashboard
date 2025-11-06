//بجيب كل المشااريع api
import { NextResponse } from 'next/server';

const allProjects = [
  { id: 1, name: 'Portfolio Website', owner: ' user Eman', role: 'user' },
  { id: 2, name: 'ecommerce Website', owner: ' user Eman', role: 'user' },
  { id: 3, name: 'React Dashboard', owner: 'Admin', role: 'admin' },
  { id: 4, name: 'E-commerce App', owner: 'Admin', role: 'admin' },
];

export async function 
GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') || 'user';

  const projects =
    role.toLowerCase() === 'admin'
      ? allProjects
      : allProjects.filter((p) => p.role === 'user');

  return NextResponse.json(projects);
}
