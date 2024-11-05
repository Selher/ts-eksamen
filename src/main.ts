// step 1 import the css file
import './style.css'

// step 2 create a Todo interface
interface Todo{
  id: number;
  title: string;
  completed: boolean;
  dayOfWeek: string; // Add day of week
}


// step 3 initialize the todos array
let todos: Todo[] = []

// step 4 get reference to the html elements

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const clearCompletedBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement;
const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement;


// step 5 create a function to add a new todo
const addTodo = (text: string, dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,
    dayOfWeek // Set the selected day of the week
  }
  todos.push(newTodo)
  renderTodos() // renders todos when the new todo is added
  
}

// step 6 create a function to render todos
const renderTodos = (): void => { // void because no return - what we are doing is updating the DOM
  // Clear the current list
  todoList.innerHTML = '';

 

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => { // In this specific case, .forEach is more suitable because we are directly modifying the DOM for each todo item.
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item
   

    // Use template literals to create the HTML content for each list item

      // If todo is completed, apply strikethrough style - option 1
    const completedClass = todo.completed ? 'completed' : '';

    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeTodo(todo.id));
    li.appendChild(removeButton);
    
    li.innerHTML = `
    <span class="${completedClass}">${todo.title}</span>
    <span>(Day: ${todo.dayOfWeek})</span> <!-- Show the day of the week -->
    <button class="toggle-completed">${todo.completed ? 'Undo' : 'Complete'}</button>
     <button class="remove-btn">Remove</button>
    <button id="editBtn">Edit</button>
  `;

 
    // addRemoveButtonListener is further down in the code. We have onclick in the function instead of template literals. More safe to use addEventListener.
    addToggleButtonListener(li, todo.id); // Toggle complete status
    addRemoveButtonListener(li, todo.id); // Add event listener to the remove button. li is the parent element, and todo.id is the ID of the todo. 
    addEditButtonListener(li, todo.id)
    todoList.appendChild(li); // Append the list item to the ul element
  });
};
// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); 




  




//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace
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
// Step 8.1: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 

// option 1
const addToggleButtonListener = (li: HTMLLIElement, id: number): void => {
  const toggleButton = li.querySelector('.toggle-completed');
  toggleButton?.addEventListener('click', () => toggleTodoCompleted(id));
};

export const toggleTodoCompleted = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle the completed status
    renderTodos(); // Re-render the updated list of todos
  }
};



// step 9 add a button
// access to the ID
// event listener to save the changes
// function 
// input field
// render the todos

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


// Function to clear all completed todos
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed); // Keep only uncompleted todos
  renderTodos(); // Re-render the updated list of todos
};

// Add event listener to the "Clear Completed" button
clearCompletedBtn.addEventListener('click', clearCompletedTodos);



// Function to clear all todos
const clearAllTodos = (): void => {
  todos = []; // Remove all todos
  renderTodos(); // Re-render the updated list of todos
};

// Add event listener to the "Toggle All" button
toggleAllBtn.addEventListener('click', clearAllTodos);









// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});

// Function to toggle the theme
const toggleTheme = (): void => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save theme to local storage
};

// Add event listener to the theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
themeToggleBtn.addEventListener('click', toggleTheme);

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
});