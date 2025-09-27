
import React from 'react';
import PortfolioItem from './PortfolioItem';
import { PortfolioItemType } from './types';

type PortfolioListProps = {
  items: PortfolioItemType[];
  onItemSelect: (item: PortfolioItemType) => void;
};

const PortfolioList: React.FC<PortfolioListProps> = ({ items, onItemSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <PortfolioItem
          key={item.id}
          {...item}
          onClick={() => onItemSelect(item)}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
