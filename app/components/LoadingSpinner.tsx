export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-600)]"></div>
      <span className="ml-2 text-[var(--primary-600)]">Loading...</span>
    </div>
  );
} 