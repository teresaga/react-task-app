import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../auth/AuthContext';
import TaskModel from '../../models/TaskModel';
import { useHistory } from 'react-router-dom';

export const Tasks = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [tasks, setTasks] = useState<TaskModel[]>();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter tasks
  const filteredTasks = tasks?.filter((task) => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
  });

  // Pagination 
  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // GET filtered tasks
  const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil((filteredTasks?.length || 0) / tasksPerPage);

  const fetchTasks = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(
        response.data.map((task: any) => ({
          ...task,
          isDone: task.done, // normalizas el campo
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleAddTask = () => {
    history.push('/task');
  };

  const handleEdit = (taskId: string) => {
    history.push(`/task/${taskId}`);
  };

  const handleChangeStatus = async (id: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const respone = await axios.put(
        `${apiUrl}/api/tasks/change-status/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      Swal.fire(
        'Error',
        'Hubo un problema al cambiar estado de la tarea.',
        'error'
      );
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        await axios.delete(`${apiUrl}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Eliminado', 'La tarea fue eliminada.', 'success');
        fetchTasks();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar la tarea.', 'error');
      }
    }
  };

  return (
    <div className='container mt-4 d-flex flex-column flex-grow-1'>
      <div className='card shadow-sm mb-3'>
        <div className='card-body'>
          {/* Search */}
          <div className='d-flex justify-content-between mb-3'>
            <div className='d-flex flex-row flex-grow-1'>
              <input
                type='text'
                className='form-control me-2'
                placeholder='Buscar por título o descripción'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {/* Add task button */}
              <button
                className='btn btn-success col-lg-2 col-md-2 col-4'
                onClick={handleAddTask}
              >
                Agregar tarea
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className='table-scroll'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha límite</th>
                  <th className='w-6'>Cambiar estado </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: 'center', padding: '20px' }}
                    >
                      <div
                        className='spinner-border text-primary'
                        role='status'
                      >
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {currentTasks?.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td className='description-cell'>{task.description}</td>
                    <td>
                      {task.isDone ? (
                        <span className='badge bg-success'>Completada</span>
                      ) : (
                        <span className='badge bg-warning'>Pendiente</span>
                      )}
                    </td>
                    <td>
                      {task.startDate ? task.startDate.substring(0, 10) : ''}
                    </td>
                    <td>{task.endDate ? task.endDate.substring(0, 10) : ''}</td>
                    <td>
                      {!task.isDone ? (
                        <button
                          className='btn btn-success badge p-2 mx-1'
                          data-toggle='tooltip'
                          data-placement='top'
                          title='Marcar Completa'
                          onClick={() =>
                            task.id !== undefined &&
                            handleChangeStatus(String(task.id))
                          }
                        >
                          <i className='fas fa-check mx-1'></i>
                        </button>
                      ) : (
                        <button
                          className='btn btn-warning badge p-2 mx-1'
                          data-toggle='tooltip'
                          data-placement='top'
                          title='Marcar Pendiente'
                          onClick={() =>
                            task.id !== undefined &&
                            handleChangeStatus(String(task.id))
                          }
                        >
                          <i className='fas fa-undo mx-1'></i>
                        </button>
                      )}
                    </td>
                    <td className='d-flex flex-row'>
                      <button
                        onClick={() =>
                          task.id !== undefined && handleEdit(String(task.id))
                        }
                        className='btn btn-info badge p-2 mx-1'
                      >
                        <i className='fas fa-pencil mx-1'></i>
                        <span>Ver/Editar</span>
                      </button>
                      <button
                        onClick={() =>
                          task.id !== undefined && handleDelete(String(task.id))
                        }
                        className='btn btn-danger badge p-2 mx-1'
                      >
                        <i className='fas fa-ban mx-1'></i>
                        <span>Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination buttons */}
          <div className='d-flex justify-content-center mt-3'>
              <nav>
                <ul className='pagination'>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
        </div>
      </div>
    </div>
  );
};
