import { useState } from 'react';
import { FaCaretUp } from "react-icons/fa";
import './PaoHeader.css';

interface NavItem {
  label: string;
  children?: NavItem[];
  href?: string;
}

interface PaoHeaderProps {
  title?: string;
  sticky?: boolean;
  navItems?: NavItem[];
}

export function PaoHeader({
  title = 'Page Title',
  sticky = false,
  navItems = [
    {
      label: 'Link 1',
      children: [
        { label: 'Sub-link 1', href: '/' },
        { label: 'Sub-link 2', href: '/' },
        { label: 'Sub-link 3', href: '/' }
      ]
    },
    {
      label: 'Link 2',
      children: [
        { label: 'Sub-link 1', href: '/' },
        { label: 'Sub-link 2', href: '/' },
        { label: 'Sub-link 3', href: '/' }
      ]
    },
    {
      label: 'Link 3',
      href: '/'
    },
    {
      label: 'Link 4',
      href: '/'
    }
  ]
}: PaoHeaderProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string>('');

  const toggleItem = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleItem(item.label);
    } else if (item.href) {
      setActiveItem(item.label);
      // Handle navigation here
      console.log(`Navigating to: ${item.href}`);
    }
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);
    const isActive = activeItem === item.label;

    return (
      <li key={item.label} className={`nav-item level-${level}`}>
        <div
          className={`nav-link ${hasChildren ? 'has-children' : ''} ${isActive ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <span>{item.label}</span>
          {hasChildren && (
            <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
              <FaCaretUp size={16} />
            </span>
          )}
        </div>
        {hasChildren && (
          <ul className={`sub-nav ${isExpanded ? 'expanded' : ''}`}>
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={`pao-header border-bottom bg-white shadow-sm ${sticky ? 'sticky-top' : ''}`}>
      <div className="header-content">
        <h5 className="header-title">{title}</h5>
        <nav className="header-nav">
          <ul className='pao-header-nav'>
            {navItems.map(item => renderNavItem(item))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PaoHeader;