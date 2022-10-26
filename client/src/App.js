import { useEffect, useState } from 'react';
import { AddBranch } from './components/AddTask';
import UserTable from './components/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginUser } from './components/Auth';
import Cookies from 'js-cookie';
import { Register } from './components/Register';

function App() {
  const [data, setTasks] = useState([]);
  const [auth, setAuth] = useState(false);

  const readCookie = () => {
    const user = Cookies.get();
    console.log(user);
    if (user) {
      setAuth(true);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);

  // FETCH DATA
  const fetchBranch = () => {
    fetch('http://localhost:3000/api/branches').then((response) =>
      response.json().then((actualData) => {
        setTasks(actualData);
      }),
    );
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  // ADD
  const addBranch = async (branch) => {
    const res = await fetch('http://localhost:3000/api/branches/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(branch),
    });

    const newBranch = await res.json();
    setTasks([...data, newBranch]);
  };

  // DELETE
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/branches/${id}`, {
      method: 'DELETE',
    });

    setTasks(data.filter((task) => task.id !== id));
  };

  const loginSend = async (form) => {
    console.log(form);
    await fetch(`http://localhost:3000/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include',
    });
  };

  const registerSend = async (form) => {
    console.log(form);
    await fetch(`http://localhost:3000/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include',
    });
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginUser onAdd={loginSend} />} />
          <Route path="/register" element={<Register onAdd={registerSend} />} />
          <Route
            path="/"
            element={<UserTable data={data} onDelete={deleteTask} />}
          />
          <Route path="/create" element={<AddBranch onAdd={addBranch} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
