import { useState } from 'react';
import TaskModel from '../../models/TaskModel';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

export const Task = () => {
  const { token } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const [task, setTask] = useState<TaskModel>({
    title: '',
    description: '',
    startDate: today,
    endDate: today,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (task.endDate < task.startDate) {
      setMessage('');
      setError('La fecha de límite no puede ser menor que la fecha de inicio.');
      return;
    }
    setError('');
    setMessage('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/api/tasks`, task, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

      if (response.status === 200) {
        setMessage('Se ha registrado con éxito!');
      } else {
        const errorText = response.data;
        setError(errorText);
      }
    } catch (err: any) {
      setMessage('');
      setError('Ha ocurrido un error durante el registro.');
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center flex-column flex-grow-1 bg-light'>
      <div
        className='card shadow p-4'
        style={{ width: '30rem', borderRadius: '1rem' }}
      >
        <h2 className='text-center mb-4'>Agregar tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor='title' className='form-label'>
              Titulo
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label htmlFor='description' className='form-label'>
              Descripción
            </label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              rows={4}
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label htmlFor='startDate' className='form-label'>
              Fecha de inicio
            </label>
            <input
              className='form-control'
              type='date'
              id='startDate'
              name='startDate'
              value={task.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group mb-3'>
            <label htmlFor='endDate' className='form-label'>
              Fecha límite
            </label>
            <input
              className='form-control'
              type='date'
              id='endDate'
              name='endDate'
              value={task.endDate}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          {message && (
            <div className='alert alert-success' role='alert'>
              {message}
            </div>
          )}

          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-primary'>
              Guardar tarea
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => history.push('/tasks')}
            >
              Regresar al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
