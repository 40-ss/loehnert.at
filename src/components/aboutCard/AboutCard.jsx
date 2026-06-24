import {PortableText} from '@portabletext/react';
import '../../App.css';
import {useSanityData, queries} from '../../sanity';

function AboutCard() {
  const {data} = useSanityData(queries.aboutQuery);

  return (
    <article className="text-container body-text">
      <header>
        <h1>{data?.heading}</h1>
      </header>
      {data?.body && <PortableText value={data.body} />}
    </article>
  );
}

export default AboutCard;
