import { useState, useContext } from 'react';
import ReactStars from 'react-stars';
import { sendRatingToDatabase } from 'src/backend/backend';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

interface Published {
  sustainable: boolean;
  travel: boolean;
  burning: boolean;
}

export const StarReview = (props: { label: string }): JSX.Element => {
  const lng = useContext(LanguageContext);
  const [published, setPublished] = useState<Published>({
    sustainable: false,
    travel: false,
    burning: false,
  });

  return (
    <>
      {published[props.label as keyof Published] ? (
        <p>{translations[lng]['actions-thank-you-for-rating']}</p>
      ) : (
        <>
          <p>{translations[lng]['how-accurate-are-the-suggestions']}</p>
          <ReactStars
            count={5}
            onChange={async (rating) => {
              const newPublished = Object.assign({}, published);
              newPublished[props.label as keyof Published] = true;
              setPublished(newPublished);
              await sendRatingToDatabase(rating, props.label);
            }}
            size={48}
            color2={'#ffd700'}
            half={false}
          />
        </>
      )}
    </>
  );
};
