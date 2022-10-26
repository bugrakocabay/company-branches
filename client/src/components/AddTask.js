import { useState } from 'react';

export const AddBranch = ({ onAdd }) => {
  const [name, setText] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [full_address, setFullAddress] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !latitude || !longitude || !full_address || !phone) {
      alert('please fill all the fields');
      return;
    }

    onAdd({ name, longitude, latitude, full_address, phone });
    setText('');
    setLongitude('');
    setLatitude('');
    setFullAddress('');
    setPhone('');
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Branch Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Longitude</label>
        <input
          type="text"
          placeholder="Add Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Latitude</label>
        <input
          type="text"
          placeholder="Add Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Full Address</label>
        <input
          type="text"
          placeholder="Add Full Address"
          value={full_address}
          onChange={(e) => setFullAddress(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Phone</label>
        <input
          type="text"
          placeholder="Add Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <input className="btn btn-block" type="submit" value="Save Branch" />
    </form>
  );
};
