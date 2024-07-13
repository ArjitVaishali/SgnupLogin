import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditUser.css'; // Import the CSS file for styling

function EditUser() {

  const [userDetails , setUserdetails] = useState({
    name : "",
    image: "",
    category:"featured",
    new_price: "",
    old_price: "",
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salutation, setSalutation] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [highestDegree, setHighestDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(false);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUser = async () => {
      try {
        const response = await axios.post('http://localhost:3001/login', { email, password });
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setSalutation(userData.salutation);
        setDob(userData.dob);
        setPhone(userData.phone);
        setHighestDegree(userData.highestDegree);
        setExperience(userData.experience);
        // Assuming userData.resume and userData.photo contain URLs or paths
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('salutation', salutation);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('highestDegree', highestDegree);
    formData.append('experience', experience);
    if (resume) {
      formData.append('resume', resume);
    }
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.put(`http://localhost:3001/updateUser/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User updated:', response.data);
      // Handle success, update UI or redirect as needed
      // history.push('/some-other-route');
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salutation">Salutation</label>
          <select
            name="salutation"
            className="form-control"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
          >
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Enter Phone"
            autoComplete="off"
            name="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="highestDegree">Highest Degree</label>
          <input
            type="text"
            placeholder="Enter Highest Degree"
            autoComplete="off"
            name="highestDegree"
            className="form-control"
            value={highestDegree}
            onChange={(e) => setHighestDegree(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience (years)</label>
          <input
            type="number"
            placeholder="Enter Experience"
            autoComplete="off"
            name="experience"
            className="form-control"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume (PDF)</label>
          <input
            type="file"
            name="resume"
            className="form-control-file"
            onChange={handleResumeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo (PNG/JPEG)</label>
          <input
            type="file"
            name="photo"
            className="form-control-file"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
