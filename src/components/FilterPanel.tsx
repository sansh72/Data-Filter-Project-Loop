
import { useDashboard } from '@/contexts/DashboardContext';
import { MultiSelectFilter } from './MultiSelectFilter';

export const FilterPanel = () => {
  const { filterState, availableOptions, updateFilter } = useDashboard();

  const filterConfigs = [
    { key: 'mod3' as const, label: 'Modulo 3' },
    { key: 'mod4' as const, label: 'Modulo 4' },
    { key: 'mod5' as const, label: 'Modulo 5' },
    { key: 'mod6' as const, label: 'Modulo 6' },
    
  ];

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-card-foreground">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {filterConfigs.map(({ key, label }) => (
          <MultiSelectFilter
            key={key}
            label={label}
            options={availableOptions[key]}
            selectedValues={filterState[key]}
            onChange={(values) => updateFilter(key, values)}
          />
        ))}
      </div>
    </div>
  );
};
