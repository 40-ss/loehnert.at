import { useState } from "react";

const accordionData = [
  {
    id: 1,
    heading: "Was ist Psychosozialer Berater?",
    content: (
      <p>
        Manchmal gerät das Leben aus dem Takt: Ob berufliche Krisen, familiäre
        Konflikte oder das Gefühl, festzustecken – oft reichen die gewohnten
        Lösungswege nicht mehr aus. Psychosozialer Berater ist eine
        professionelle Wegbegleitung. Sie ist lösungsorientiert und darauf
        ausgerichtet, Ihre Lebensqualität und Handlungsfähigkeit wieder zu
        verbessern.
      </p>
    ),
  },
  {
    id: 2,
    heading: 'Und was bedeutet „Systemische Beratung"?',
    content: (
      <>
        <p>
          Ich lege Wert darauf, eine sichere, einfühlsame und kooperative
          Umgebung zu schaffen, in der sich die Klienten gehört und unterstützt
          fühlen, wenn sie ihre Gedanken, Emotionen und Verhaltensweisen
          erforschen.
        </p>
        <p>
          Ich arbeite nach dem systemischen Ansatz. Das bedeutet: Ich betrachte
          Sie nicht isoliert, sondern als Teil Ihrer sozialen Systeme (Familie,
          Partnerschaft, Arbeitsumfeld, Freunde …).
        </p>
        <p>Es geht um den Blick auf das Ganze, wenn man ein Problem verstehen möchte:</p>
        <ul>
          <li>
            <strong>Alles hängt zusammen:</strong> Stellen Sie sich ein Mobile
            vor. Bewegt sich ein Teil, geraten auch alle anderen in Bewegung.
            Oft liegt die Lösung für ein Problem nicht nur in uns selbst,
            sondern in der Art und Weise, wie wir mit anderen interagieren.
          </li>
          <li>
            <strong>Experte für Ihr Leben:</strong> In der systemischen Beratung
            sehe ich mich als Experte für den Prozess – Sie hingegen bleiben der
            Experte für Ihr Leben. Gemeinsam finden wir heraus, welche
            Ressourcen in Ihnen schlummern.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    heading: 'Was kann ich von Beratung erwarten?',
    content: (
      <>
        <p>
          In unseren Gesprächen nutzen wir verschiedene Methoden, um neue Perspektiven einzunehmen, neue Sichten auf Ihre Situation zu erhalten und mögliche neue Handlungsräume zu finden. 
        </p>
        <p>
          Ich verstehe meine Beratungsarbeit als Begleitung auf Augenhöhe. Sie bringen ihr Wissen über ihr Leben mit, ich bringe Werkzeuge, Struktur und einen offenen Blick für neue Perspektiven ein. 
          Im Mittelpunkt stehen Sie selbst – mit ihren Stärken, Erfahrungen und ihrem ganz individuellen Weg.
        </p>
      </>
    ),
  },
  {
    id: 4,
    heading: 'Was kann ich von Beratung nicht erwarten?',
    content: (
      <>
        <p>
          Psychosozialer Berater liefert (genau wie Psychotherapie) kein „Rezept“ für eine Lösung Ihres Problems 
          –sie hilft mit, gemeinsam neue Perspektiven und neue Lösungsmöglichkeiten zu finden, im Gespräch und mithilfe verschiedener Methoden.

        </p>
        <p>
          Lösungs-Garantie gibt es keine! Aber Sie können sicher sein, dass ich mich Ihnen und Ihrem Anliegen ernsthaft und professionell widme!
        </p>
      </>
    ),
  },
  {
    id: 5,
    heading: 'Was ist der Unterschied zwischen Psychosozialer Beratung und Therapie?',
    content: (
      <>
        <p>
          Die Psychosozialer Berater richtet sich an psychisch gesunde Menschen in schwierigen Lebenslagen oder Veränderungsprozessen. 
          Sie ist keine Psychotherapie und ersetzt keine medizinische Behandlung. Mein Fokus liegt auf dem "Hier und Jetzt" sowie der Gestaltung Ihrer Zukunft.
        </p>
      
      </>
    ),
  },
];

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

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`accordion-item${isOpen ? " open" : ""}`}>
      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
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
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodologyCard() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <style>{accordionStyles}</style>
      <article className="text-container">
        <header>
          <h1>Methodik</h1>
        </header>
        <div className="accordion">
          {accordionData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </article>
    </>
  );
}

export default MethodologyCard;