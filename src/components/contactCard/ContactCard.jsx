import {PortableText} from '@portabletext/react';
import './ContactCard.css';
import {useSanityData, queries} from '../../sanity';

function ContactCard() {
  const {data} = useSanityData(queries.contactQuery);

  // Fall back to displayed phone number for the tel: link if no explicit
  // dial-format is stored.
  const telHref = data?.phoneHref || data?.phone;

  return (
    <article className="text-container">
      <header>
        <h1>{data?.heading}</h1>
      </header>
      <section className="body-text">
        {data?.intro && <PortableText value={data.intro} />}
        <address>
          <ul className="contact-list">
            {data?.email && (
              <li>
                E-Mail:{' '}
                <a
                  href={`mailto:${data.email}`}
                  aria-label={`E-Mail an ${data.email} senden`}
                >
                  {data.email}
                </a>
              </li>
            )}
            {data?.whatsappNumber && (
              <li>
                WhatsApp:{' '}
                <a
                  href={`https://api.whatsapp.com/send?phone=${data.whatsappNumber}`}
                  aria-label="WhatsApp-Nachricht senden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nachricht senden
                </a>
              </li>
            )}
            {data?.phone && telHref && (
              <li>
                Telefon:{' '}
                <a href={`tel:${telHref}`} aria-label={`Anrufen unter ${data.phone}`}>
                  {data.phone}
                </a>
              </li>
            )}
          </ul>
        </address>
        {data?.outro && <PortableText value={data.outro} />}
      </section>
    </article>
  );
}

export default ContactCard;
