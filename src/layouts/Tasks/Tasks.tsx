import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import TaskModel from "../../models/TaskModel";
import { Link, useHistory } from "react-router-dom";

export const Tasks = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [tasks, setTasks] = useState<TaskModel[]>();

  useEffect(() => {
    if (token) {
      const apiUrl = process.env.REACT_APP_API_URL;
      axios
        .get(`${apiUrl}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  const [isSortedByCompleted, setIsSortedByCompleted] = useState(false);

  const handleToggleComplete = (taskId: number) => {
    // Aquí es donde cambias el estado de la tarea
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === taskId
    //       ? { ...task, is_done: !task.is_done } // Cambia el estado de completada
    //       : task
    //   )
    // );
  };

  const handleAddTask = () => {
    history.push('/task');
  };

  const handleEdit = (taskId: string) => {
    history.push(`/task/${taskId}`);
  };

  return (
    <div className="container mt-4 d-flex flex-column flex-grow-1">
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          {/* Search */}
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex flex-row flex-grow-1">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar por título o descripción"
              />
              {/* Add task button */}
              <button
                className="btn btn-success col-lg-2 col-md-2 col-4"
                onClick={handleAddTask}
              >
                Agregar tarea
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="table-scroll">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsSortedByCompleted(!isSortedByCompleted)}
                  >
                    <span className="d-flex justify-content-between">
                      <span>Estado </span>
                      <i
                        className={`text-primary mx-2 fas ${
                          isSortedByCompleted
                            ? "fa-arrow-circle-up"
                            : "fa-arrow-circle-down"
                        }`}
                      ></i>
                    </span>
                  </th>
                  <th>Fecha Inicio</th>
                  <th>Fecha límite</th>
                  <th className="w-6">Cambiar estado </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>

                )}
                {tasks?.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td className="description-cell">{task.description}</td>
                    <td>
                      {task.isDone ? (
                        <span className="badge bg-success">Completada</span>
                      ) : (
                        <span className="badge bg-warning">Pendiente</span>
                      )}
                    </td>
                    <td>{task.startDate ? task.startDate.substring(0,10) : ''}</td>
                    <td>{task.endDate ? task.endDate.substring(0,10) : ''}</td>
                    <td>
                      {!task.isDone ? (
                        <button
                          className="btn btn-success badge p-2 mx-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Marcar Completa"
                        >
                          <i className="fas fa-check mx-1"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning text-dark badge p-2 mx-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Marcar Pendiente"
                        >
                          <i className="fas fa-undo mx-1"></i>
                        </button>
                      )}
                    </td>
                    <td className="d-flex flex-row">
                      <button onClick={() => task.id !== undefined && handleEdit(String(task.id))} className="btn btn-primary badge p-2 mx-1">
                        <i className="fas fa-pencil mx-1"></i>
                        <span>Ver/Editar</span>
                      </button>
                      <button className="btn btn-danger badge p-2 mx-1">
                        <i className="fas fa-ban mx-1"></i>
                        <span>Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
