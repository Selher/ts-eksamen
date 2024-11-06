  
  import './style.css'

  // create a Todo interface
  interface Todo{
    id: number;
    title: string;
    completed: boolean; // 1.1 Add completed property
    dayOfWeek: string; // Add day of week e.2
  }


  // initialize the todos array
  let todos: Todo[] = []

  //get reference to the html elements

  const todoInput = document.getElementById('todo-input') as HTMLInputElement
  const todoList = document.getElementById('todo-list') as HTMLUListElement
  const todoForm = document.querySelector('.todo-form') as HTMLFormElement
  const clearCompletedBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement; // 2.1
  const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement; //2.4


  // create a function to add a new todo e.3
  const addTodo = (text: string, dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'): void => {
    const newTodo: Todo = {
      id: Date.now(),
      title: text,
      completed: false,
      dayOfWeek // Add day of week property
    }
    todos.push(newTodo)
    renderTodos() // renders todos when the new todo is added
    
  }

  // create a function to render todos
  const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
    // Clear the current list
    todoList.innerHTML = '';

    // Iterate over the todos array and create list items for each todo
    todos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
      const li = document.createElement('li');
      li.className = 'todo-item'; 
    


        // If todo is completed, apply strikethrough style - option 1.5
      const completedClass = todo.completed ? 'completed' : '';
          
      const removeButton = document.createElement('button');
      removeButton.className = 'remove-btn';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeTodo(todo.id));
      li.appendChild(removeButton);

      // 1.2 add a button to the todo e.5
      li.innerHTML = `
      <span class="${completedClass}">${todo.title}</span>
      <span>(Day: ${todo.dayOfWeek})</span> <!-- Show the day of the week -->
      <button class="toggle-completed">${todo.completed ? 'Undo' : 'Complete'}</button>
      <button class="remove-btn">Remove</button>
      <button id="editBtn">Edit</button>
    `;
  
      addToggleButtonListener(li, todo.id); // Toggle complete status
      addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
      addEditButtonListener(li, todo.id)
      todoList.appendChild(li); // Append the list item to the ul element
    });
  };

  // Initial render
  renderTodos(); 

  const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

  // e.4
  todoForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent the default form submission
    const text = todoInput.value.trim(); 
    const dayOfWeekSelect = document.getElementById('todo-day') as HTMLSelectElement;
    const dayOfWeek = dayOfWeekSelect.value as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    
    if (text !== '') { // Check if the input field is empty
      todoInput.classList.remove('input-error'); // Remove the error highlight if present
      errorMessage.style.display = 'none'; // Hide the error message
      addTodo(text, dayOfWeek); // Add the todo item
      todoInput.value = ''; // Clear the input field
    }  else {
    console.log("Please enter a todo item"); // Provide feedback to the user
    todoInput.classList.add('input-error'); // Add a class to highlight the error 
      errorMessage.style.display = 'block'; // Show the error message
    } 
  });



  const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
    const removeButton = li.querySelector('.remove-btn'); // Now selecting the remove button correctly
    removeButton?.addEventListener('click', () => removeTodo(id));
  };

  // Function to remove a todo by ID: This function removes a todo from the array based on its ID.
  const removeTodo = (id: number): void => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos(); // Re-render the updated list of todos
  }; 

  // option 1.3
  const addToggleButtonListener = (li: HTMLLIElement, id: number): void => {
    const toggleButton = li.querySelector('.toggle-completed');
    toggleButton?.addEventListener('click', () => toggleTodoCompleted(id));
  };

  // option 1.4
  export const toggleTodoCompleted = (id: number): void => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed; // Toggle the completed status
      renderTodos(); // Re-render the updated list of todos
    }
  };


  const addEditButtonListener = (li: HTMLElement, id:number)=> {
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id))
}


  const editTodo = (id:number) => {
  const todo = todos.find (todo => todo.id === id)
  if(todo){
    const text = prompt("edit todo text", todo.title)
    if(text){
      todo.title = text
      renderTodos()
    }
  }
  }


  // Function to clear all completed todos 2.2
  const clearCompletedTodos = (): void => {
    todos = todos.filter(todo => !todo.completed); // Keep only uncompleted todos
    renderTodos(); // Re-render the updated list of todos
  };

  // Add event listener to the "Clear Completed" button 2.3
  clearCompletedBtn.addEventListener('click', clearCompletedTodos);



  // Function to clear all todos 2.5
  const clearAllTodos = (): void => {
    todos = []; // Remove all todos
    renderTodos(); // Re-render the updated list of todos
  };

  // Add event listener to the "Toggle All" button 2.6
  toggleAllBtn.addEventListener('click', clearAllTodos);



  // Function to toggle the theme 11.2
  const toggleTheme = (): void => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to local storage
  };

  // Add event listener to the theme toggle button 11.1
  const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
  // Add event listener to the theme toggle button 11.3
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Apply saved theme on page load 11.4
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  });