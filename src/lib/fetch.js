export const fetchData = async () => {
  const fetched = await fetch('https://evening-inlet-69977.herokuapp.com/crud');
  return fetched.json();
};

export const fetchDataById = async (id) => {
  const fetchById = await fetch(
    `https://evening-inlet-69977.herokuapp.com/crud/${id}`,
  );
  return fetchById.json();
};

export const putData = async (id) => {
  const putAllData = await fetch(
    `https://evening-inlet-69977.herokuapp.com/crud/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return putAllData.json();
};

export const deleteById = async (id) => {
  const fetchById = await fetch(
    `https://evening-inlet-69977.herokuapp.com/crud/${id}`,
    {
      method: 'DELETE',
    },
  );
  return fetchById.json();
};

export const newData = async (data1, data2) => {
  const created = await fetch(
    'https://evening-inlet-69977.herokuapp.com/crud',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data1: data1,
        data2: data2,
      }),
    },
  );
  return created.json();
};
