import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'super_secret_key'; 
export async function POST(req: Request) {
  const { email, password } = await req.json();

  // بيانات تجريبية (بدون DB حالياً)
  const users = [
    { email: 'admin@test.com', password: '1234567', role: 'Admin' },
    { email: 'manager@test.com', password: '1234567', role: 'ProjectManager' },
    { email: 'dev@test.com', password: '1234567', role: 'Developer' },
  ];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // إنشاء الـ JWT token
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token, role: user.role });
}
