import {useState} from 'react';
import {PortableText} from '@portabletext/react';
import {useSanityData, queries} from '../../sanity';

const accordionStyles = `
  .accordion {
    border-top: 1px solid #c9bfb5;
    margin-top: 1.5rem;
  }

  .accordion-item {
    border-bottom: 1px solid #c9bfb5;
    overflow: hidden;
  }

  .accordion-header {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 1.1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    text-align: left;
    color: #f08c00;
    font-family: inherit;
    font-size: inherit;
    transition: opacity 0.2s ease;
  }

  .accordion-header:hover {
    opacity: 0.7;
  }

  .accordion-header-text {
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .accordion-icon {
    flex-shrink: 0;
    color: #331c0c;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    opacity: 0.6;
  }

  .accordion-item.open .accordion-icon {
    transform: rotate(180deg);
  }

  .accordion-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .accordion-item.open .accordion-body {
    grid-template-rows: 1fr;
  }

  .accordion-body-inner {
    overflow: hidden;
  }

  .accordion-content {
    padding-bottom: 0;
    transition: padding-bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .accordion-item.open .accordion-content {
    padding-bottom: 1.25rem;
  }

  .accordion-content p {
    margin-bottom: 0.75rem;
  }

  .accordion-content p:last-child {
    margin-bottom: 0;
  }

  .accordion-content ul {
    margin-top: 0.5rem;
  }

  .accordion-content li {
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    .accordion-header-text {
      font-size: 0.95rem;
    }
  }
`;

function AccordionItem({item, isOpen, onToggle}) {
  return (
    <div className={`accordion-item${isOpen ? ' open' : ''}`}>
      <button className="accordion-header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="accordion-header-text">{item.heading}</span>
        <span className="accordion-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="accordion-body" aria-hidden={!isOpen}>
        <div className="accordion-body-inner">
          <div className="accordion-content body-text">
            {item.content && <PortableText value={item.content} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodologyCard() {
  const [openKey, setOpenKey] = useState(null);
  const {data} = useSanityData(queries.methodologyQuery);
  const items = data?.items ?? [];

  const handleToggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <style>{accordionStyles}</style>
      <article className="text-container">
        <header>
          <h1>{data?.heading}</h1>
        </header>
        <div className="accordion">
          {items.map((item) => (
            <AccordionItem
              key={item._key}
              item={item}
              isOpen={openKey === item._key}
              onToggle={() => handleToggle(item._key)}
            />
          ))}
        </div>
      </article>
    </>
  );
}

export default MethodologyCard;
