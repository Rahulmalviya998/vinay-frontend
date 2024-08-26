import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { UserProvider } from "./UserContext";


function AddProject() {

    const { user } = useContext(UserContext);
    const [project, SetProject] = useState([]);
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState("");

    let titleRef = useRef();
    let descriptionRef = useRef();
    let startDateRef = useRef();
    let endDateRef = useRef();
    let statusRef = useRef();

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

    const addProject = async () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const startDate = startDateRef.current.value;
        const endDate = endDateRef.current.value;
        const status = statusRef.current.value;

        // Validation: Check if all fields are filled
        if (!title || !description || !startDate || !endDate || !status) {
            // setFormError("All fields are required.");
            return alert("all field require");
        }
        const email = user.email;
        const data = { title, description, startDate, endDate, status, email };

        try {
            await axios.post('http://localhost:3000/project/save', data);
            // Refresh the project list after adding a new project
            const response = await axios.post('http://localhost:8080/project/fetchall', { email: user.email });
            SetProject(response.data);
            // Clear form and any error messages after successful submission
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            startDateRef.current.value = "";
            endDateRef.current.value = "";
            statusRef.current.value = "Pending";
            alert('project added successuly')
            setFormError("");  // Clear any previous form error messages
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>

            <div className="container mt-1 mb-1 bg-secondary">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card p-4 shadow-sm maindiv ">
                            <h2 className="text-center mb-4">Add Project</h2>
                            {formError && (
                                <div className="alert alert-danger" role="alert">
                                    {formError}
                                </div>
                            )}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Project Title</label>
                                    <input
                                        ref={titleRef}
                                        id="title"
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        ref={descriptionRef}
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="startDate" className="form-label">Start Date</label>
                                        <input
                                            ref={startDateRef}
                                            id="startDate"
                                            type="date"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="endDate" className="form-label">End Date</label>
                                        <input
                                            ref={endDateRef}
                                            id="endDate"
                                            type="date"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        ref={statusRef}
                                        id="status"
                                        className="form-select"
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-success center"
                                    onClick={addProject}
                                >
                                    Add Project
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProject;
