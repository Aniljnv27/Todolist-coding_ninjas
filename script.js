    
        var todos = [];
        var filter = 'all';

        function addTodo() {
            var todoInput = document.getElementById('todoInput');
            var todoText = todoInput.value.trim();

            if (todoText !== '') {
                var todo = {
                    id: Date.now(),
                    text: todoText,
                    completed: false
                };

                todos.push(todo);
                renderTodos();
                todoInput.value = '';
            }
        }

        function toggleTodoCompleted(todoId) {
            todos = todos.map(function(todo) {
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

            renderTodos();
        }

        function deleteTodo(todoId) {
            todos = todos.filter(function(todo) {
                return todo.id !== todoId;
            });

            renderTodos();
        }

        function filterTodos(selectedFilter) {
            filter = selectedFilter;
            renderTodos();
        }

        function renderTodos() {
            var todoList = document.getElementById('todoList');
            todoList.innerHTML = '';

            var filteredTodos = todos;

            if (filter === 'active') {
                filteredTodos = todos.filter(function(todo) {
                    return !todo.completed;
                });
            } else if (filter === 'completed') {
                filteredTodos = todos.filter(function(todo) {
                    return todo.completed;
                });
            }

            filteredTodos.forEach(function(todo) {
                var todoItem = document.createElement('li');
                todoItem.classList.add('todo-item');
                if (todo.completed) {
                    todoItem.classList.add('completed');
                }

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.addEventListener('change', function() {
                    toggleTodoCompleted(todo.id);
                });

                var todoText = document.createElement('span');
                todoText.classList.add('todo-text');
                todoText.innerText = todo.text;

                var deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', function() {
                    deleteTodo(todo.id);
                });

                todoItem.appendChild(checkbox);
                todoItem.appendChild(todoText);
                todoItem.appendChild(deleteButton);

                todoList.appendChild(todoItem);
            });
        }
