import { useState } from 'react';
import iconsData from '../../data/fa-icons.json';
import * as FaIcons from "react-icons/fa";

type IconData = {
  icon: string;
  name: string;
};

export function IconsSearch() {
  const icons = iconsData as IconData[];

  const [searchedIcon, setSearchedIcon] = useState('');

  const filteredIcons = icons.filter((iconData) => {
    if (!searchedIcon.trim()) return true;
    const term = searchedIcon.toLowerCase();
    return (
      iconData.name.toLowerCase().includes(term) ||
      iconData.icon.toLowerCase().includes(term)
    );
  });
  
  return (
    <div>
      <div className='sticky-top bg-primary border-bottom'>
        <div className='container p-3'>
          <input
            type='search'
            className='form-control'
            placeholder='Search icons'
            value={searchedIcon}
            onChange={(e) => setSearchedIcon(e.target.value)}
          />
        </div>
      </div>
      <div className='container d-flex flex-wrap p-3'>
        {filteredIcons.map((iconData: IconData) => {
          const IconComponent = FaIcons[iconData.icon as keyof typeof FaIcons] as React.ComponentType<{ size?: number }>;
          return IconComponent ? (
            <div key={iconData.icon} className='p-2 text-center' style={{ width: '184px' }}>
              <IconComponent size={20} />
              <div className='small text-truncate '>{iconData.name}</div>  
          </div>
        ) : null;
        })}
      </div>
    </div>
  )
}
