//بجيب كل المشااريع api
import { NextResponse } from 'next/server';
import { allProjects } from "@/app/api/_data/projects";

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
