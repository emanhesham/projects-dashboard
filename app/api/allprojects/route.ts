
import { NextResponse } from 'next/server';
import allProjects from '../../../data/projects.json'; // مهم جدًا .json

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner') || 'eman'; // مثال فلترة حسب owner

  const projects =
    owner.toLowerCase() === 'admin'
      ? allProjects
      : allProjects.filter((p) => p.owner.toLowerCase() === owner.toLowerCase());

  return NextResponse.json(projects);
}
