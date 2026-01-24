
import React from 'react';
import { Product } from '../types';

interface ComparisonModalProps {
  items: Product[];
  onClose: () => void;
  onRemove: (product: Product) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ items, onClose, onRemove }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Side-by-Side Comparison</h2>
            <p className="text-sm text-slate-500 font-medium">Analyzing {items.length} top-rated tools</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-grow overflow-auto p-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-6 px-4 w-1/5 text-slate-400 text-xs font-bold uppercase tracking-widest">Feature</th>
                {items.map(item => (
                  <th key={item.id} className="py-6 px-4 w-1/5">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-4 bg-white">
                        <img src={item.logoUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item)}
                        className="mt-2 text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-6 px-4 font-bold text-slate-500 text-sm">Category</td>
                {items.map(item => (
                  <td key={item.id} className="py-6 px-4 text-center">
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider border border-slate-100">
                      {item.category}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-6 px-4 font-bold text-slate-500 text-sm">Rating</td>
                {items.map(item => (
                  <td key={item.id} className="py-6 px-4 text-center">
                    <div className="flex items-center justify-center text-amber-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="ml-1 text-base font-bold text-slate-900">{item.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-6 px-4 font-bold text-slate-500 text-sm">Starting Price</td>
                {items.map(item => (
                  <td key={item.id} className="py-6 px-4 text-center">
                    <span className="text-base font-bold text-slate-900">{item.price}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-6 px-4 font-bold text-slate-500 text-sm align-top">Key Features</td>
                {items.map(item => (
                  <td key={item.id} className="py-6 px-4">
                    <ul className="space-y-3">
                      {item.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-6 px-4"></td>
                {items.map(item => (
                  <td key={item.id} className="py-6 px-4 text-center">
                    <a 
                      href={item.affiliateUrl} 
                      className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                    >
                      Visit {item.name.split(' ')[0]}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
