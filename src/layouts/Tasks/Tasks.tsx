import { useState } from 'react';
import TaskModel from '../../models/TaskModel';

export const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([
    { id: 1, title: 'Limpiar habitación', description: 'Barrer y trapear', is_done: true, start_date: new Date('2025-04-26'), end_date: new Date('2025-04-26') },
    { id: 2, title: 'Hacer comida', description: 'Hacer pollo a la parrilla', is_done: true, start_date: new Date('2025-04-26'), end_date: new Date('2025-04-26') },
    { id: 3, title: 'Terminar proyecto', description: 'Realizar app web', is_done: false, start_date: new Date('2025-04-26'), end_date: new Date('2025-05-20') },
    { id: 4, title: 'Dar de comer a mascota', description: 'Dar de comer a Max', is_done: false, start_date: new Date('2025-04-29'), end_date: new Date('2025-04-29') },
    { id: 5, title: 'Sacar a pasear a mascota', description: 'Ir al parque', is_done: false, start_date: new Date('2025-04-26'), end_date: new Date('2025-04-26') },
    { id: 6, title: 'Lavar carro', description: 'Ir a carwash', is_done: false, start_date: new Date('2025-04-30'), end_date: new Date('2025-04-30') },
    { id: 7, title: 'Ir a despensa', description: 'Comprar verduras y papel higiénico', is_done: false, start_date: new Date('2025-05-05'), end_date: new Date('2025-05-05') },
    { id: 8, title: 'Ir con doctor', description: 'No olvidar receta anterior', is_done: false, start_date: new Date('2025-05-05'), end_date: new Date('2025-05-05') },
  ]);  
  const [isSortedByCompleted, setIsSortedByCompleted] = useState(false); 

  const handleToggleComplete = (taskId: number) => {
    // Aquí es donde cambias el estado de la tarea
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, is_done: !task.is_done } // Cambia el estado de completada
          : task
      )
    );
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
                        />
                        {/* Botón para agregar tarea */}
                        <button className='btn btn-success col-lg-2 col-md-2 col-4' onClick={() => alert('Agregar nueva tarea')}>
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
                            <th
                                style={{ cursor: 'pointer' }}
                                onClick={() => setIsSortedByCompleted(!isSortedByCompleted)}
                            >
                                <span className='d-flex justify-content-between'>
                                    <span>Estado </span> 
                                    <i className={`text-primary mx-2 fas ${isSortedByCompleted ? 'fa-arrow-circle-up' : 'fa-arrow-circle-down'}`}></i>
                                </span>
                            </th>
                            <th>Fecha Inicio</th>
                            <th>Fecha límite</th>
                            <th className='w-6'>Cambiar estado </th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td className='description-cell'>
                                    {task.description}
                                </td>
                                <td>
                                    {task.is_done ? ( <span className='badge bg-success'>Completada</span>) : (
                                        <span className='badge bg-warning'>Pendiente</span>
                                        )
                                    }
                                </td>
                                <td>{task.start_date.toLocaleDateString()}</td>
                                <td>{task.end_date.toLocaleDateString()}</td>
                                <td>
                                    {!task.is_done ? (
                                        <button className='btn btn-success badge p-2 mx-1' data-toggle='tooltip' data-placement='top' title='Marcar Completa'>
                                            <i className='fas fa-check mx-1'></i>
                                        </button>
                                    ): (
                                        <button className='btn btn-outline-warning text-dark badge p-2 mx-1' data-toggle='tooltip' data-placement='top' title='Marcar Pendiente'>
                                            <i className='fas fa-undo mx-1'></i>
                                        </button> 
                                    )}
                                </td>
                                <td className='d-flex flex-row'>
                                    <button className='btn btn-info badge p-2 mx-1' data-toggle='tooltip' data-placement='top' title='Más Información'>
                                        <i className='fas fa-eye mx-1'></i>
                                    </button>
                                    <button className='btn btn-primary badge p-2 mx-1' data-toggle='tooltip' data-placement='top' title='Editar Tarea'>
                                        <i className='fas fa-pencil mx-1'></i>
                                        <span>Editar</span>
                                    </button>
                                    <button className='btn btn-danger badge p-2 mx-1' data-toggle='tooltip' data-placement='top' title='Eliminar Tarea'>
                                        <i className='fas fa-ban mx-1'></i>
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
