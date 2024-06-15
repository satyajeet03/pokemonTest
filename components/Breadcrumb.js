// components/Breadcrumb.js
import Link from 'next/link';

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      <ul className="flex space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb-item">
            <Link href={index === 0 ? '/' : `/${path.toLowerCase()}`}>
              <span className={`breadcrumb-link ${index === 0 ? 'home-link' : ''}`}>{path}</span>
            </Link>
            {index < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
