import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext, UserProvider } from './UserContext';

function ShowProject() {
    const { user } = useContext(UserContext);
    const [project, SetProject] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/project/fetchall', { email: user.email });
                SetProject(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = (id) => {
        // Handle the update logic here
        alert(`Update project with ID: ${id}`);
        // You can navigate to an update form or open a modal for editing here
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/project/delete`, { email: user.email });
                alert("Project deleted successfully!");
                // Refresh the project list after deletion
                const response = await axios.get('http://localhost:3000/project/fetchall', { email: user.email });
                SetProject(response.data);
            } catch (error) {
                setError(error.message);
                alert("Failed to delete the project.");
            }
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className='text-center mt-1' ><h5>Show All Project List</h5></div>
            <table className="table border-2 ">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {project.map((result, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{result.title}</td>
                            <td>{result.description}</td>
                            <td>{result.startDate}</td>
                            <td>{result.endDate}</td>
                            <td>{result.status}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUpdate(result.id)}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(result.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ShowProject;
