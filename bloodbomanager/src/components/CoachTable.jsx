import { BiSearch } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function CoachTable({ coaches, onViewDetails, onDelete }) {
  if (!coaches || coaches.length === 0) {
    return (
      <div className="bg-blue-100 text-blue-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
        <p>No hay entrenadores registrados todavía.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-md table-fixed">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left w-[50px]">ID</th>
            <th className="py-3 px-4 text-left w-[200px]">Nombre</th>
            <th className="py-3 px-4 text-left w-[300px]">Email</th>
            <th className="py-3 px-4 text-left w-[150px]">Creado</th>
            <th className="py-3 px-4 w-[180px]">
              <div className="flex items-center justify-center h-full">
                Acciones
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach, i) => {
            const createdDate = new Date(coach.created_at).toLocaleDateString();
            return (
              <tr
                key={coach.id}
                className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}
              >
                <td className="py-2 px-4 truncate max-w-[50px]">{coach.id}</td>
                <td className="py-2 px-4 truncate max-w-[200px]">{coach.name}</td>
                <td className="py-2 px-4 truncate max-w-[300px]">{coach.email}</td>
                <td className="py-2 px-4 truncate max-w-[150px]">{createdDate}</td>
                <td className="py-2 px-4 flex space-x-2 justify-center">
                  <button
                    onClick={() => onViewDetails(coach)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                  >
                    <BiSearch size={18} />
                    Detalles
                  </button>
                  <button
                    onClick={() => onDelete(coach)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                  >
                    <RiDeleteBin6Line size={18} />
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
