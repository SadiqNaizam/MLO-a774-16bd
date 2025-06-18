import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CuisineCategoryChipProps {
  /**
   * The name of the category to display.
   */
  categoryName: string;
  /**
   * Whether the chip is currently selected.
   */
  isSelected: boolean;
  /**
   * Callback function when the chip is clicked.
   */
  onClick: () => void;
  /**
   * Optional additional class names for custom styling.
   */
  className?: string;
}

const CuisineCategoryChip: React.FC<CuisineCategoryChipProps> = ({
  categoryName,
  isSelected,
  onClick,
  className,
}) => {
  console.log(`CuisineCategoryChip loaded for: ${categoryName}, selected: ${isSelected}`);

  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      size="sm" // Using 'sm' size for a compact feel
      onClick={onClick}
      className={cn(
        'rounded-full', // Ensures pill shape
        'h-auto px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out', // Custom padding and text size for a chip-like appearance
        isSelected
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md' // Style for selected state
          : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border', // Style for unselected state
        className
      )}
      aria-pressed={isSelected}
      role="button" // Explicitly set role, though Button component usually handles this
    >
      {categoryName}
    </Button>
  );
};

export default CuisineCategoryChip;