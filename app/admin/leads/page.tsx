import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LeadsPage() {
  const session = await auth();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Leads</h1>
      <div className="border rounded-lg p-6 bg-card">
        <p className="text-muted-foreground">Leads table coming soon</p>
      </div>
    </div>
  );
}
