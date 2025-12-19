export default function AuthLayout({ 
    children }: { 
        readonly children: React.ReactNode }) {
  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {children}
        </div>
  );    
}
