
import { useDashboard } from '@/contexts/DashboardContext';
import { FilterPanel } from './FilterPanel';
import { DataTable } from './DataTable';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export const Dashboard = () => {
  const { filteredData, clearAllFilters, loadCSVData, isLoading } = useDashboard();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">BI Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Interactive filtering with {filteredData.length.toLocaleString()} records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FileUpload onFileLoad={loadCSVData} isLoading={isLoading} />
            <Button 
              onClick={clearAllFilters} 
              variant="outline" 
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="mb-6">
          <FilterPanel />
        </div>

        {/* Data Table */}
        <div className="bg-card border rounded-lg">
          <DataTable />
        </div>
      </div>
    </div>
  );
};
