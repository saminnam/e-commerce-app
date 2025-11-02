import { Link, useLocation } from "react-router-dom";

const GlobalHero = ({ title }) => {
  const location = useLocation();

  // Get URL path segments
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Decode and format each breadcrumb segment
  const formatBreadcrumb = (segment) => {
    const decoded = decodeURIComponent(segment); // Decode %20 etc.
    return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, " ");
  };

  return (
    <section className="relative py-16 w-full h-auto">
      <div className="flex flex-col items-start text-gray-700 justify-center text-center px-4">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h1>

        {/* Breadcrumbs */}
        <ul className="flex flex-wrap text-base md:text-lg font-medium gap-2 justify-center">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                <span>/</span>
                {isLast ? (
                  <span className="text-yellow-400">
                    {formatBreadcrumb(segment)}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    {formatBreadcrumb(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default GlobalHero;
