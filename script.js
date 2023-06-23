// Declare an empty array to store todos
var todos = [];

// Declare a variable to store the selected filter
var filter = 'all';

// Function to add a new todo item
function addTodo() {
    // Get the input element and its value
    var todoInput = document.getElementById('todoInput');
    var todoText = todoInput.value.trim();

    // Check if the input value is not empty
    if (todoText !== '') {
        // Create a new todo object with an ID, text, and completed status
        var todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        // Add the new todo to the todos array
        todos.push(todo);

        // Render the updated list of todos
        renderTodos();

        // Clear the input value
        todoInput.value = '';
    }
}

// Function to toggle the completed status of a todo item
function toggleTodoCompleted(todoId) {
    // Update the todos array by modifying the completed status of the matching todo
    todos = todos.map(function (todo) {
        if (todo.id === todoId) {
            return {
                id: todo.id,
                text: todo.text,
                completed: !todo.completed
            };
        } else {
            return todo;
        }
    });

    // Render the updated list of todos
    renderTodos();
}

// Function to delete a todo item
function deleteTodo(todoId) {
    // Remove the todo with the matching ID from the todos array
    todos = todos.filter(function (todo) {
        return todo.id !== todoId;
    });

    // Render the updated list of todos
    renderTodos();
}

// Function to filter the todos based on the selected filter
function filterTodos(selectedFilter) {
    // Update the filter value based on the selected filter option
    filter = selectedFilter;

    // Render the updated list of todos
    renderTodos();
}

// Function to render the list of todos
function renderTodos() {
    // Get the todoList element
    var todoList = document.getElementById('todoList');

    // Clear the todoList
    todoList.innerHTML = '';

    // Apply the selected filter to the todos
    var filteredTodos = todos;

    if (filter === 'active') {
        filteredTodos = todos.filter(function (todo) {
            return !todo.completed;
        });
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(function (todo) {
            return todo.completed;
        });
    }

    // Iterate over the filtered todos and create the corresponding HTML elements
    filteredTodos.forEach(function (todo) {
        var todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function () {
            toggleTodoCompleted(todo.id);
        });

        var todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.innerText = todo.text;

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteTodo(todo.id);
        });

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });
}
