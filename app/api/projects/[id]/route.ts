import { NextResponse } from 'next/server';
import projects from '../../../../data/projects.json';
import fs from "fs";
import path from "path";

// المسار الحقيقي للملف
const filePath = path.join(process.cwd(), "data", "projects.json");

 export async function PUT(req: Request, { params }: { params: any }) {
  const { id } = await params;
  const body = await req.json(); // البيانات الجديدة من الـ client

  // اقرأ الملف
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(fileContent);

  // ابحث عن المشروع
  const index = projects.findIndex((p: any) => String(p.id) === String(id));
  if (index === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  // حدث المشروع
  projects[index] = { ...projects[index], ...body };

  // احفظ التغييرات
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf8');

  return NextResponse.json(projects[index]);
}

// دالة بتجيب كل الداتا من JSON
function getProjects() {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}
// دالة بترجع تكتب الداتا للملف
function saveProjects(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}
export async function GET(req: Request, { params }: { params: any }) {
  const resolvedParams = await params; // 🌟 فك الـ Promise
  const { id } = resolvedParams;

  console.log('Project ID:', id);

  const project = projects.find(p => String(p.id) === id);

  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}
// // PUT handler لتحديث المشروع
// export async function PUT(req: Request, { params }: { params: any }) {
//   const resolvedParams = await params;
//   const { id } = resolvedParams;

//   const body = await req.json(); // البيانات الجديدة اللي هتبعتها من الـ client
//   const projectIndex = projects.findIndex(p => String(p.id) === id);

//   if (projectIndex === -1) {
//     return NextResponse.json({ message: 'Project not found' }, { status: 404 });
//   }

//   // تحديث المشروع
//   projects[projectIndex] = { ...projects[projectIndex], ...body };

//   return NextResponse.json(projects[projectIndex]);
// }

// DELETE لحذف مشروع
export async function DELETE(req: Request, { params }: { params: any }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const index = projects.findIndex(p => String(p.id) === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  projects.splice(index, 1); // حذف المشروع من المصفوفة
  return NextResponse.json({ message: 'Project deleted' });
}
