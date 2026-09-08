import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorState({ 
  title = 'Something went wrong', 
  message = "We couldn't load the marketplace products. Please try again.", 
  onRetry 
}) {
  return (
    <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto text-center border border-rose-100 shadow-fi-card my-12">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="fi-button-primary inline-flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
