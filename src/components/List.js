import { useState, useEffect } from 'react';
import { fetchData } from '../lib/fetch.js';
import { Link } from 'react-router-dom';
import '../style/List.css';

export const List = () => {
  const [item, setItem] = useState([]);
  const listItems = async () => {
    //realiza el fetch en la base de datos.
    const listed = await fetchData();
    setItem(listed);
    return listed;
  };

  useEffect(() => {
    listItems();
  }, []);
  return (
    <>
      <div className="listWrapper">
        <div className="volver">
          <Link to={'/'}>Volver</Link>
        </div>
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
      </div>
    </>
  );
};
