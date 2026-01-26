import PaoHeader from '../PaoHeader';

// Example 1: Basic usage with default navigation items
export function DefaultHeaderExample() {
  return (
    <PaoHeader title="Dashboard" />
  );
}

// Example 2: Custom navigation items
export function CustomNavigationExample() {
  const customNavItems = [
    {
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      label: 'Analytics',
      children: [
        { label: 'Overview', href: '/analytics/overview' },
        { label: 'Reports', href: '/analytics/reports' },
        { label: 'Real-time', href: '/analytics/realtime' }
      ]
    },
    {
      label: 'Settings',
      children: [
        { label: 'General', href: '/settings/general' },
        { label: 'Security', href: '/settings/security' },
        { label: 'Integrations', href: '/settings/integrations' },
        { label: 'Billing', href: '/settings/billing' }
      ]
    },
    {
      label: 'Help',
      href: '/help'
    }
  ];

  return (
    <PaoHeader
      title="My Application"
      sticky={true}
      navItems={customNavItems}
    />
  );
}

// Example 3: E-commerce navigation
export function EcommerceNavigationExample() {
  const ecommerceNavItems = [
    {
      label: 'Products',
      children: [
        { label: 'All Products', href: '/admin/products' },
        { label: 'Add Product', href: '/admin/products/add' },
        { label: 'Categories', href: '/admin/categories' },
        { label: 'Inventory', href: '/admin/inventory' }
      ]
    },
    {
      label: 'Orders',
      children: [
        { label: 'Pending Orders', href: '/admin/orders/pending' },
        { label: 'Shipped Orders', href: '/admin/orders/shipped' },
        { label: 'Returns', href: '/admin/orders/returns' }
      ]
    },
    {
      label: 'Customers',
      children: [
        { label: 'All Customers', href: '/admin/customers' },
        { label: 'VIP Customers', href: '/admin/customers/vip' },
        { label: 'Customer Support', href: '/admin/support' }
      ]
    },
    {
      label: 'Reports',
      href: '/admin/reports'
    }
  ];

  return (
    <PaoHeader
      title="E-commerce Admin"
      sticky={true}
      navItems={ecommerceNavItems}
    />
  );
}