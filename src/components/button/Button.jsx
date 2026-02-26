import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'

// Icon images
import EyeClosed from '../../assets/icons/eye-closed.svg?react';
import EyeOpen from '../../assets/icons/eye-open.svg?react';

import BookClosed from '../../assets/icons/book-closed.svg?react';
import BookOpen from '../../assets/icons/book-open.svg?react';

import LetterClosed from '../../assets/icons/letter-closed.svg?react';
import LetterOpen from '../../assets/icons/letter-open.svg?react';

import ShapeClosed from '../../assets/shapes/shape.svg?react';
import ShapeOpen from '../../assets/shapes/shape-open.svg?react';

function Button({ onLoadHtml }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const buttonIcon = [
    { 
      href: '/gebhard', 
      title: 'About', 
      className: 'eye',
      IconClosed: EyeClosed,
      IconOpen: EyeOpen,
    },
  
    { 
      href: '/methodik', 
      title: 'Methodology', 
      className: 'book',
      IconClosed: BookClosed,
      IconOpen: BookOpen,
    },
    
    { 
      href: '/', 
      title: 'Home', 
      className: 'shape',
      IconClosed: ShapeClosed,
      IconOpen: ShapeOpen,
    },
    

    { 
      href: '/kontakt', 
      title: 'Contact', 
      className: 'letter',
      IconClosed: LetterClosed,
      IconOpen: LetterOpen,
    },
    
  ];

  const handleClick = (href, e) => {
    e.preventDefault();
    if (onLoadHtml) onLoadHtml(href);
  };

  const handleKeyDown = (href, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onLoadHtml) onLoadHtml(href);
    }
  };

  return (
    <nav aria-label="Main navigation">
   {buttonIcon.map(({ href, title, className, IconClosed, IconOpen }) => {
     const isActive = location.pathname === href;
     const CurrentIcon = isActive ? IconOpen : IconClosed;
     
     return href.startsWith('/')
       ? (
         <Link
           key={href}
           to={href}
           title={title}
           aria-label={`Navigate to ${title} page`}
           className={`${styles['menu-icon']} ${styles[className]} ${isActive ? styles.active : ''}`}
           onClick={(e) => {
             if (isActive && href !== '/') {
               e.preventDefault();
               navigate('/');
             }
           }}
         >
           <CurrentIcon className={styles['icon-image']} aria-hidden="true" />
         </Link>
       ) : (
         <a
           key={href}
           href={href}
           title={title}
           aria-label={`Navigate to ${title} page`}
           className={`${styles['menu-icon']} ${styles[className]} ${isActive ? styles.active : ''}`}
           onClick={(e) => handleClick(href, e)}
           onKeyDown={(e) => handleKeyDown(href, e)}
           tabIndex="0"
         >
           <CurrentIcon className={styles['icon-image']} aria-hidden="true" />
         </a>
       );
   })}
    </nav>
  );
}

Button.propTypes = {
  onLoadHtml: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.string,
  alt: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string, 
};

export default Button;
