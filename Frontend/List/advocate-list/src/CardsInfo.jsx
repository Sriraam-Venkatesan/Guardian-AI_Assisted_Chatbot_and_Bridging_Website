import { useState, useEffect } from 'react';
import Cards from './cards.jsx';

function CardsInfo() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:10401/userdata')
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => console.error(err));
  }, []);

  if (details.length === 0) {
    return <p>Loading cards...</p>;
  }

  return (
    <>
      {details.map(card => (
        <Cards
          key={card.id}
          image={card.image}
          name={card.name}
          desc={card.desc}
        />
      ))}
    </>
  );
}

export default CardsInfo;
