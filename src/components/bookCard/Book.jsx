import {PortableText} from '@portabletext/react';
import {useSanityData, queries} from '../../sanity';

function BookCard() {
  const {data} = useSanityData(queries.bookQuery);

  return (
    <article className="text-container">
      <header>
        <h1>{data?.heading}</h1>
      </header>
      <section className="body-text">
        {data?.body && <PortableText value={data.body} />}
      </section>
    </article>
  );
}

export default BookCard;
