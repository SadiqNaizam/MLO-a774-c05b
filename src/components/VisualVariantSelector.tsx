import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional class names
import { Check } from 'lucide-react';

// Define types for variants
export interface ColorVariant {
  type: 'color';
  name: string; // e.g., "Red", "Blue"
  value: string; // e.g., CSS color "#FF0000" or Tailwind class "bg-red-500"
  image?: string; // Optional image URL to show when this color is selected
  disabled?: boolean;
}

export interface SizeVariant {
  type: 'size';
  name: string; // e.g., "S", "M", "L"
  disabled?: boolean;
  stockInfo?: string; // e.g. "Low stock", "Out of stock"
}

export type ProductVariant = ColorVariant | SizeVariant;

interface VisualVariantSelectorProps<T extends ProductVariant> {
  label: string; // e.g., "Color", "Size"
  variants: T[];
  selectedVariantName?: string;
  onVariantSelect: (variant: T) => void;
  className?: string;
}

const VisualVariantSelector = <T extends ProductVariant>({
  label,
  variants,
  selectedVariantName,
  onVariantSelect,
  className,
}: VisualVariantSelectorProps<T>) => {
  console.log(`Rendering VisualVariantSelector for ${label} with ${variants.length} variants.`);

  if (!variants || variants.length === 0) {
    return null;
  }

  const isColorSelector = variants[0]?.type === 'color';

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-foreground">{label}: <span className="text-muted-foreground">{selectedVariantName || 'Select an option'}</span></p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.name === selectedVariantName;
          const isDisabled = variant.disabled || false;

          if (isColorSelector && variant.type === 'color') {
            const colorVariant = variant as ColorVariant;
            return (
              <button
                key={colorVariant.name}
                type="button"
                onClick={() => !isDisabled && onVariantSelect(variant)}
                disabled={isDisabled}
                className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  isSelected ? "border-primary ring-2 ring-primary ring-offset-1" : "border-muted hover:border-foreground/50",
                  isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                )}
                style={{ backgroundColor: colorVariant.value.startsWith('#') || colorVariant.value.startsWith('rgb') ? colorVariant.value : undefined }}
                title={colorVariant.name}
                aria-label={`Select ${label} ${colorVariant.name}`}
              >
                {/* For non-standard colors, use style. For Tailwind, apply class directly */}
                <span
                  className={cn(
                    "h-full w-full rounded-full",
                    !colorVariant.value.startsWith('#') && !colorVariant.value.startsWith('rgb') ? colorVariant.value : "",
                    isSelected ? "ring-1 ring-inset ring-background" : "" // Inner ring for better contrast on selected
                  )}
                />
                {isSelected && <Check className="h-4 w-4 absolute text-white mix-blend-difference" />}
              </button>
            );
          } else if (!isColorSelector && variant.type === 'size') {
            const sizeVariant = variant as SizeVariant;
            return (
              <Button
                key={sizeVariant.name}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => !isDisabled && onVariantSelect(variant)}
                disabled={isDisabled}
                className={cn(
                  isDisabled && "line-through text-muted-foreground",
                )}
                title={sizeVariant.name + (sizeVariant.stockInfo ? ` (${sizeVariant.stockInfo})` : '')}
                aria-label={`Select ${label} ${sizeVariant.name}`}
              >
                {sizeVariant.name}
              </Button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default VisualVariantSelector;