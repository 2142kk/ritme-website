import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export default async function ProductsPage() {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  const result = await db.query(
    `SELECT id, name, tagline, status, link, display_order, is_published
     FROM products
     ORDER BY display_order ASC`
  )
  const products = result.rows

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Tagline</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Order</th>
                <th className="text-center py-3 px-4 font-semibold">Published</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-secondary/30">
                  <td className="py-3 px-4 font-semibold">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {product.tagline}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'available'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                    >
                      {product.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{product.display_order}</td>
                  <td className="py-3 px-4 text-center">
                    {product.is_published ? (
                      <span className="text-green-600 font-semibold">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4">
        Note: Products are managed via database. No add/delete operations in admin panel.
      </p>
    </div>
  )
}
