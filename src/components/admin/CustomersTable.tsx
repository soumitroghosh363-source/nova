import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { DerivedCustomer } from '../../lib/deriveCustomers'

interface CustomersTableProps {
  customers: DerivedCustomer[]
}

const initials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const CustomersTable = ({ customers }: CustomersTableProps) => {

    const [query, setQuery] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="relative w-72 mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers…"
          aria-label="Search customers"
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total Spent</th>
              <th className="px-4 py-3 font-medium">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer, index) => (
              <motion.tr
                key={customer.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="border-b border-border last:border-0 hover:bg-surface/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0">
                      {initials(customer.fullName)}
                    </div>
                    <div>
                      <p className="font-medium">{customer.fullName}</p>
                      <p className="text-xs text-muted">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{customer.orderCount}</td>
                <td className="px-4 py-3 font-medium">${customer.totalSpent.toFixed(0)}</td>
                <td className="px-4 py-3 text-muted">
                  {new Date(customer.lastOrderDate).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted text-sm">
            {customers.length === 0
              ? 'No customers yet — customers appear here after their first order.'
              : `No customers match "${query}".`}
          </div>
        )}
      </div>
    </div>
  )
}

export {CustomersTable}