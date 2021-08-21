import { useState, useEffect } from 'react';
import { fetchData } from '../lib/fetch.js';
import { Link } from 'react-router-dom';

export const List = () => {
  const [item, setItem] = useState([]);
  const listItems = async () => {
    const listed = await fetchData();
    setItem(listed);
    return listed;
  };

  useEffect(() => {
    listItems();
  }, []);
  return (
    <>
      <Link to={'/'}>Volver</Link>
      <br></br>

      <ul>
        {item.map((e, i) => {
          return (
            <ul key={i}>
              <li>{JSON.stringify(e)}</li>
            </ul>
          );
        })}
      </ul>
    </>
  );
};
