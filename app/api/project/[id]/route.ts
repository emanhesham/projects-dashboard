import { NextResponse } from "next/server";

let allProjects = [
  {
    id: 1,
    name: "Portfolio Website",
    owner: "Eman",
    role: "user",
    description: "My personal portfolio",
    status: "In Progress",
    startDate: "2025-10-01",
    endDate: "2025-11-30",
    progress: 60,
    budget: 1000,
  },
  {
    id: 2,
    name: "React Dashboard",
    owner: "Admin",
    role: "admin",
    description: "Dashboard for managing users",
    status: "Completed",
    startDate: "2025-08-15",
    endDate: "2025-09-30",
    progress: 100,
    budget: 2000,
  },
  {
    id: 3,
    name: "E-commerce App",
    owner: "Admin",
    role: "admin",
    description: "Online store app",
    status: "Not Started",
    startDate: "2025-11-05",
    endDate: "2026-01-15",
    progress: 0,
    budget: 5000,
  },
];


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
)
 {

  const { id } = await context.params; 
 const projectId = Number(id);

  if (isNaN(projectId)) {

    return  NextResponse.json({ error: "Invalid project ID"  }, { status: 400 } ) ;
  }

  const project = allProjects.find((p) => p.id === projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

    return NextResponse.json(project);

}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ← هنا نعمل await

  const projectId = Number(id);
  console.log("eman", projectId);

  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  allProjects = allProjects.filter((p) => p.id !== projectId);

  return NextResponse.json({ message: "Project deleted successfully" });
}

export async function POST
(  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params; // ← هنا نعمل await
  const projectId = Number(id);


  if (isNaN(projectId)) {

    return  NextResponse.json({ error: "Invalid project ID"  }, { status: 400 } ) ;
  }

  

  const projectIndex = allProjects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }


  
  // هنا بدل request.json() نستخدم request.formData()
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());

  allProjects[projectIndex] = {
    ...allProjects[projectIndex],
    // name: body.name ?? '',
    // description: body.description ?? '',
    // startDate: body.startDate ?? '',
    // endDate: body.endDate ?? '',
    // status: body.status ?? '',
    progress: Number(body.progress) ?? 0,
    budget: Number(body.budget) ?? 0,
  };

  return NextResponse.json(allProjects[projectIndex]);

}