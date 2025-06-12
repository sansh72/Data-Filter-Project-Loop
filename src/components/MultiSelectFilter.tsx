
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, X, Search } from 'lucide-react';

interface MultiSelectFilterProps {
  label: string;
  options: number[];
  selectedValues: number[];
  onChange: (values: number[]) => void;
}

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((option) =>
    option.toString().includes(searchTerm)
  );

  const handleToggleOption = (option: number) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  const handleSelectAll = () => {
    onChange(filteredOptions);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const removeValue = (value: number) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {/* Selected values as badges */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedValues.slice(0, 3).map((value) => (
            <Badge key={value} variant="secondary" className="text-xs">
              {value}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => removeValue(value)}
              />
            </Badge>
          ))}
          {selectedValues.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{selectedValues.length - 3} more
            </Badge>
          )}
        </div>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm">
              {selectedValues.length === 0 
                ? 'Select values...' 
                : `${selectedValues.length} selected`
              }
            </span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-64 p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search values..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="p-2 border-b flex gap-2">
            <Button size="sm" variant="outline" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              Clear
            </Button>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground text-center">
                No options available
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                  onClick={() => handleToggleOption(option)}
                >
                  <Checkbox
                    checked={selectedValues.includes(option)}
                    onChange={() => handleToggleOption(option)}
                  />
                  <span className="text-sm">{option}</span>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
