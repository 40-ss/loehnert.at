import React, { useState, useEffect } from 'react';
// import './ProfileCard.css';
import '../App.css';
import Headshot from '/src/assets/images/gebhard.png';
import Button from './button/Button';

export default function ProfileCard() {
  const [pageUrl, setPageUrl] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  // When pageUrl changes, fetch the content
  useEffect(() => {
    if (!pageUrl) {
      setHtmlContent(null);
      return;
    }
    fetch(pageUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load page');
        return res.text();
      })
      .then(html => {
        setHtmlContent(html);
      })
      .catch(err => {
        setHtmlContent(`<p>Error loading page: ${err.message}</p>`);
      });
  }, [pageUrl]);

  return (
    <main className="card">
      <Button onLoadHtml={setPageUrl} />

      <section className="card-content">
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <>
            <header className="info">
              <h1>DI Gebhard Löhnert</h1>
              <div className="medium-text">
                <p>Psychosozialer Berater</p>
              </div>
            </header>
            <aside className="headshot">
              <img src={Headshot} alt="Portrait of Gebhard Löhnert, professional counselor and coach" />
            </aside>
          </>
        )}
      </section>
    </main>
  );
}
