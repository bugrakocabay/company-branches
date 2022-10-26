import { FaTimes } from 'react-icons/fa';

const UserTable = ({ data, onDelete }) => {
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Full address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((branch, key) => (
            <tr key={key}>
              <td>{branch.name}</td>
              <td>{branch.latitude}</td>
              <td>{branch.longitude}</td>
              <td>{branch.full_address}</td>
              <td>{branch.phone}</td>
              <td>
                <FaTimes
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => onDelete(branch.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
