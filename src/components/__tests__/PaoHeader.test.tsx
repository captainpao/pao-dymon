import { render, screen, fireEvent } from '@testing-library/react';
import PaoHeader from '../PaoHeader';

describe('PaoHeader', () => {
  const mockNavItems = [
    {
      label: 'Products',
      children: [
        { label: 'All Products', href: '/products' },
        { label: 'Categories', href: '/categories' }
      ]
    },
    {
      label: 'About',
      href: '/about'
    }
  ];

  it('renders with default props', () => {
    render(<PaoHeader />);
    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<PaoHeader title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders with custom nav items', () => {
    render(<PaoHeader navItems={mockNavItems} />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles submenu on click', () => {
    render(<PaoHeader navItems={mockNavItems} />);

    const productsItem = screen.getByText('Products');
    expect(screen.queryByText('All Products')).not.toBeInTheDocument();

    fireEvent.click(productsItem);
    expect(screen.getByText('All Products')).toBeInTheDocument();

    fireEvent.click(productsItem);
    expect(screen.queryByText('All Products')).not.toBeInTheDocument();
  });

  it('handles leaf item clicks', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<PaoHeader navItems={mockNavItems} />);

    fireEvent.click(screen.getByText('About'));
    expect(consoleSpy).toHaveBeenCalledWith('Navigating to: /about');

    consoleSpy.mockRestore();
  });

  it('applies active class to clicked items', () => {
    render(<PaoHeader navItems={mockNavItems} />);

    const aboutLink = screen.getByText('About').closest('.nav-link');
    fireEvent.click(screen.getByText('About'));

    expect(aboutLink).toHaveClass('active');
  });

  it('applies sticky class when sticky prop is true', () => {
    const { container } = render(<PaoHeader sticky={true} />);
    const header = container.querySelector('.pao-header');

    expect(header).toHaveClass('sticky-top');
  });
});