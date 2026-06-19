import { ReactNode } from 'react';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/sidebar';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      {session && <AdminSidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
