import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {

	const [task, SetTask] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/task/fetch');
				SetTask(response.data);
			} catch (error) {
				setError(error.message);
			}
		};
		// fetchData();
	}, []);
	// if (setError)
	//     return <div>error.message</div>

	return (
		<>
			<div className='text-center mt-1'><h5>show all project list</h5></div>
			<table className="table border-2">
				<thead>
					<tr>
						<th>S.no</th>
						<th>Title</th>
						<th>Description</th>
						<th>due Date</th>
						<th>Status</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{task.map((result, index) => {
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{result.title}</td>
							<td>{result.description}</td>
							<td>{result.dueDate}</td>
							<td>{result.status}</td>
							<td>
								<button className="btn btn-danger" >DELETE</button>
							</td>
						</tr>
					})}
				</tbody>
			</table>
		</>
	);
}

export default TaskList;
