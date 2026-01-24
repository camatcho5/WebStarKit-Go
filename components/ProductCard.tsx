
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  highlighted?: boolean;
  onCompareToggle?: () => void;
  isCompared?: boolean;
  onViewDetails?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  highlighted, 
  onCompareToggle, 
  isCompared,
  onViewDetails 
}) => {
  const [imageError, setImageError] = useState(false);

  // Get initials for fallback (e.g., "Jasper AI" -> "JA")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div 
      onClick={onViewDetails}
      className={`group relative bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] flex flex-col h-full cursor-pointer hover:-translate-y-2 ${highlighted ? 'ring-2 ring-blue-500/30 border-blue-200' : ''}`}
    >
      {/* 1. Header Section with Logo and Prominent Badges */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="w-16 h-16 rounded-2xl flex-shrink-0 overflow-hidden shadow-sm border border-slate-100 bg-white p-2 transition-transform group-hover:scale-110 duration-500 flex items-center justify-center">
          {!imageError ? (
            <img 
              src={product.logoUrl} 
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-xl border border-slate-100">
              <span className="text-xl font-black text-slate-300 tracking-tighter">
                {getInitials(product.name)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          {/* Prominent Rating Badge */}
          <div className="flex items-center bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full shadow-sm">
            <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="ml-1.5 text-xs font-black text-amber-800">{product.rating}</span>
          </div>

          {/* Editor's Pick Badge */}
          {product.isEditorPick && (
            <span className="text-[9px] font-black text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md shadow-blue-100">
              Editor's Pick
            </span>
          )}

          {/* Free Plan Badge */}
          {product.isFree && (
            <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
              Free Plan
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-500 text-[13px] font-medium leading-relaxed line-clamp-2">
          {product.tagline}
        </p>
      </div>

      {/* 3. Compare Utility */}
      {onCompareToggle && (
        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            onCompareToggle(); 
          }}
          className={`mb-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${
            isCompared 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-300 hover:text-slate-600'
          }`}
        >
          {isCompared ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
              Selected
            </>
          ) : 'Compare Tool'}
        </button>
      )}

      {/* 4. Footer Section */}
      <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Starts at</span>
          <span className="text-sm font-black text-slate-900">{product.price}</span>
        </div>
        <button 
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          View Guide
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
