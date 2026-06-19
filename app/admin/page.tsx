import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Total Leads</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">New This Week</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Contacted</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm text-muted-foreground mb-2">Converted</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
        <p className="text-muted-foreground">No leads yet</p>
      </div>
    </div>
  );
}
