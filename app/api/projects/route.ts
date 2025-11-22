import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath = path.join(process.cwd(), "data", "projects.json");

export async function GET() {
  // اقرأ الملف الحقيقي كل مرة
  const fileContent = fs.readFileSync(filePath, "utf8");
  const projects = JSON.parse(fileContent);

  return NextResponse.json(projects);
}

// export async function PUT(req: Request) {
//   const { id, name } = await req.json()


//   const index = projects.findIndex((p: any) => p.id === id);
//   if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

//   projects[index].name = name; // عدلي الحقول اللي تحبي

//   // أكتب التغييرات على الملف
//   fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf8');

//   return NextResponse.json(projects[index]);
// }
