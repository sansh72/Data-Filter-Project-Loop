
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileLoad: (data: string) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const csvText = reader.result as string;
      onFileLoad(csvText);
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button 
        onClick={handleButtonClick} 
        variant="outline" 
        className="gap-2"
        disabled={isLoading}
      >
        <Upload className="w-4 h-4" />
        {isLoading ? 'Loading...' : 'Upload CSV'}
      </Button>
    </div>
  );
};
