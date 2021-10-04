import { useEffect, useState } from 'react';
import { deleteById, newData, putData } from '../lib/fetch.js';
import { Link } from 'react-router-dom';
import '../style/Home.css';
import { fetchData } from '../lib/fetch.js';
import { v4 as uuid } from 'uuid';

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
    setData(item[id]);
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
  const años = (edad) => {
    if (edad === 1) {
      return ' año';
    } else {
      return ' años';
    }
  };

  return (
    <div className="wrapper">
      <a href="http://josemanuelcastellano.com">
        <h3>Inicio</h3>
      </a>
      <form onSubmit={handleSubmit} className="form">
        <Link to={'/list'}>Ver contenido de la base de datos</Link>
        <br></br>
        {loading && <h3>Cargando base de datos</h3>}

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
        <br></br>
        <br></br>
        <button onClick={handleSubmit}>Crear</button>
        <p>
          <u>Respuesta de la base de datos: </u>
        </p>

        <div key={uuid()} className="res">
          {item.map((e, i) => {
            return (
              <ul key={uuid()}>
                <li key={uuid()}>Nombre: {e.data1}</li>
                <li key={uuid()}>
                  Edad: {e.data2}
                  {años(e.data2)}
                </li>

                <button key={uuid()} onClick={handleEdit} id={i}>
                  editar
                </button>
                <button key={uuid()} onClick={handleDelete} id={i}>
                  Borrar
                </button>
              </ul>
            );
          })}
        </div>
      </form>
    </div>
  );
};
