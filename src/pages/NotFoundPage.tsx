import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Legacy</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-6xl font-extrabold text-[#0F766E]">404</h2>
            <h3 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h3>
            <p className="mt-2 text-sm text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0F766E] hover:bg-[#0F766E]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
