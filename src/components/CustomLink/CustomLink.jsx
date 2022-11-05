import { Link, NavLink } from 'react-router-dom';

import './CustomLink.scss';

function CustomLink({ path, children, className, activeClassName, target }) {
  let finalClassName = 'link';
  if (className) {
    finalClassName += ` ${className}`;
  }

  if (path.startsWith('http')) {
    return (
      <a
        href={path}
        className={finalClassName}
        target={target}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  if (path.startsWith('#')) {
    return (
      <a className={finalClassName} href={path}>
        {children}
      </a>
    );
  }

  if (activeClassName) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${finalClassName} ${isActive ? activeClassName : ''}`
        }
      >
        {children}
      </NavLink>
    );
  }
  return (
    <Link to={path} className={finalClassName}>
      {children}
    </Link>
  );
}

export default CustomLink;
