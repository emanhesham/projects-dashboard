import { NextResponse } from "next/server";
import { allProjects } from "@/app/api/_data/projects";

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

  allProjects.filter((p) => p.id !== projectId);


  return NextResponse.json({ message: "Project deleted successfully" });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const projectId = Number(id);

  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const projectIndex = allProjects.findIndex((p) => p.id === projectId);

  if (projectIndex === -1) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const formData = await request.formData();

  // نحول كل القيم إلى string قبل حفظها
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const startDate = formData.get("startDate")?.toString() || "";
  const endDate = formData.get("endDate")?.toString() || "";
  const status = formData.get("status")?.toString() || "";
  const progress = Number(formData.get("progress")) || 0;
  const budget = Number(formData.get("budget")) || 0;

  allProjects[projectIndex] = {
    ...allProjects[projectIndex],
    name,
    description,
    startDate,
    endDate,
    status,
    progress,
    budget,
  };
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);

}
