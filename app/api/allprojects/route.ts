// import { NextResponse } from 'next/server';
// //  let allProjects = [
// //   {
// //     id: 1,
// //     name: "Portfolio Website",
// //     owner: "Eman",
// //     role: "user",
// //     description: "My personal portfolio",
// //     status: "In Progress",
// //     startDate: "2025-10-01",
// //     endDate: "2025-11-30",
// //     progress: 60,
// //     budget: 1000,
// //   },
// //   {
// //     id: 2,
// //     name: "React Dashboard",
// //     owner: "Admin",
// //     role: "admin",
// //     description: "Dashboard for managing users",
// //     status: "Completed",
// //     startDate: "2025-08-15",
// //     endDate: "2025-09-30",
// //     progress: 100,
// //     budget: 2000,
// //   },
// //   {
// //     id: 3,
// //     name: "E-commerce App",
// //     owner: "Admin",
// //     role: "admin",
// //     description: "Online store app",
// //     status: "Not Started",
// //     startDate: "2025-11-05",
// //     endDate: "2026-01-15",
// //     progress: 0,
// //     budget: 5000,
// //   },
// // ];
// import allProjects from './data/projects'; // لاحظي الـ "s" آخر الاسم
// export async function 
// GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const role = searchParams.get('role') || 'user';

//   const projects =
//     role.toLowerCase() === 'admin'
//       ? allProjects
//       : allProjects.filter((p) => p.role === 'user');

//   return NextResponse.json(projects);
// }


import { NextResponse } from 'next/server';
import allProjects from './data/projects.json'; // مهم جدًا .json

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner') || 'eman'; // مثال فلترة حسب owner

  const projects =
    owner.toLowerCase() === 'admin'
      ? allProjects
      : allProjects.filter((p) => p.owner.toLowerCase() === owner.toLowerCase());

  return NextResponse.json(projects);
}
