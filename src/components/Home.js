import { useEffect, useState } from 'react';
import { deleteById, newData, putData } from '../lib/fetch.js';
import { Link } from 'react-router-dom';
import '../style/home.css';
import { fetchData } from '../lib/fetch.js';

export const Home = () => {
  const [item, setItem] = useState([]);
  const [loading, setloading] = useState(true);

  // Se hace el fetch de los datos.
  const listItems = async () => {
    const listed = await fetchData();
    setItem(listed);
    setloading(false);
    return listed;
  };
  useEffect(() => {
    listItems();
  }, []);

  // Se inicializan los valores.
  const [data, setData] = useState({
    data1: '',
    data2: 0,
  });
  // Crea los datos en la base de datos.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data1, data2 } = data;
    if (data1 !== '') {
      const dataCreated = await newData(data1, data2);

      window.location.reload();
      return dataCreated;
    }
  };
  // Toma los datos de los inputs.
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const allData = { ...data, [name]: value };
    setData(allData);
  };

  // Actualiza datos existentes
  const handleEdit = async (event) => {
    const { id } = event.currentTarget;
    const putTheData = await putData(item[id]._id);
    console.log(putTheData);
    deleteById(item[id]._id);
  };

  // Borra los datos
  const handleDelete = async (event) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    const deleteItem = await deleteById(item[id]._id);
    window.location.reload();
    return deleteItem;
  };

  return (
    <div className="wrapper">
      <div className="main">
        <Link to={'/list'}>Ver contenido de la base de datos</Link>;<br></br>
        {loading && <h3>Cargando base de datos</h3>}
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>Nombre</p>
          <input
            placeholder="nombre"
            type="text"
            name="data1"
            value={data.data1}
            onChange={handleChange}
          />
          <br></br>
          <p>Edad</p>
          <input
            type="text"
            name="data2"
            value={data.data2}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Crear</button>

          <br></br>
          <ul>
            {item.map((e, i) => {
              return (
                <>
                  <ul key={i}>
                    <li>{e.data1}</li>
                    <li>{e.data2} años</li>
                    <button onClick={handleEdit} id={i}>
                      editar
                    </button>
                    <button onClick={handleDelete} id={i}>
                      Borrar
                    </button>
                  </ul>
                </>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
};
