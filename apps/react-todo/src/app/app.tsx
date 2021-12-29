import { useEffect, useState } from 'react';
import { Todo } from './models/Todo';
const api_base = 'http://localhost:3333';

function App() {
  const initialVal: Todo[] = [];
	const [todos, setTodos] = useState(initialVal);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then((data: any) => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

	const completeTodo = async (id: string | undefined) => {
		const data = await fetch(api_base + '/todo/complete/' + id, {
      method: 'PUT'
    }).then(res => res.json());

		setTodos((todos: any) => todos.map((todo: Todo) => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));

	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async (id: string | undefined) => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
    console.log(data, 'delete!');
		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	return (
		<div className="App">
			<h1>Welcome, Damasy</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;
