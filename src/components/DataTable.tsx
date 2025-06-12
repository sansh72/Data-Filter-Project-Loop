import React, { useState, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROWS_PER_PAGE = 100;
const VISIBLE_ROWS = 20;

export const DataTable = () => {
  const { filteredData } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredData, currentPage]);

  const visibleData = useMemo(() => {
    const startIndex = Math.floor(scrollTop / 40); // Assuming 40px row height
    return paginatedData.slice(startIndex, startIndex + VISIBLE_ROWS);
  }, [paginatedData, scrollTop]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setScrollTop(0);
  };

  const columns = [
    { key: 'number' as const, label: 'Number' },
    { key: 'mod3' as const, label: 'Mod 3' },
    { key: 'mod4' as const, label: 'Mod 4' },
    { key: 'mod5' as const, label: 'Mod 5' },
    { key: 'mod6' as const, label: 'Mod 6' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Data ({filteredData.length.toLocaleString()} records)
        </h3>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-muted">
          <div className="grid gap-4 p-4 font-medium text-sm" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((column) => (
              <div key={column.key} className="text-left">
                {column.label}
              </div>
            ))}
          </div>
        </div>

        {/* Table Body with Virtual Scrolling */}
        <div 
          className="h-96 overflow-y-auto"
          onScroll={handleScroll}
        >
          {/* Spacer for virtual scrolling */}
          <div style={{ height: Math.floor(scrollTop / 40) * 40 }} />
          
          {visibleData.map((row, index) => (
            <div
              key={row.id}
              className="grid gap-4 p-4 border-b hover:bg-accent/50 transition-colors text-sm"
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
            >
              {columns.map((column) => (
                <div key={column.key}>
                  {row[column.key]}
                </div>
              ))}
            </div>
          ))}
          
          {/* Bottom spacer for virtual scrolling */}
          <div style={{ 
            height: Math.max(0, (paginatedData.length - Math.floor(scrollTop / 40) - VISIBLE_ROWS) * 40)
          }} />
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>
    </div>
  );
};