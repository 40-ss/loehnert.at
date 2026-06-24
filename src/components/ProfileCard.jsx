import {useState, useEffect} from 'react';
import '../App.css';
import Button from './button/Button';
import {useSanityData, urlFor, queries} from '../sanity';

export default function ProfileCard() {
  const [pageUrl, setPageUrl] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const {data: profile} = useSanityData(queries.profileQuery);

  // When pageUrl changes (e.g. Impressum, Datenschutz), fetch the raw HTML.
  // Independent from the Sanity-driven profile content.
  useEffect(() => {
    if (!pageUrl) {
      setHtmlContent(null);
      return;
    }
    fetch(pageUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load page');
        return res.text();
      })
      .then((html) => setHtmlContent(html))
      .catch((err) => setHtmlContent(`<p>Error loading page: ${err.message}</p>`));
  }, [pageUrl]);

  return (
    <main className="card">
      <Button onLoadHtml={setPageUrl} />

      <section className="card-content">
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{__html: htmlContent}} />
        ) : (
          <>
            <header className="info">
              <h1>{profile?.name}</h1>
              <div className="medium-text">
                <p>{profile?.title}</p>
              </div>
            </header>
            <aside className="headshot">
              {profile?.headshot && (
                <img
                  src={urlFor(profile.headshot).width(800).url()}
                  alt={profile.headshot.alt ?? ''}
                />
              )}
            </aside>
          </>
        )}
      </section>
    </main>
  );
}
