<script module>
  /**
   * @typedef {{
   *    id: `${string}-${string}-${string}-${string}-${string}`;
   *    description: string;
   *    completed: boolean;
   * }} Item
   */
</script>

<script>
  let liveDescription = $state("");

  /** @type {Item[]} */
  let todoList = $state([]);
  let todoDesc = $state("");

  let valid = $derived(todoDesc.length > 0);
  let invalid = $derived(!valid);

  /** @param {string} description*/
  function addTodo(description) {
    /** @type {Item} */
    let newTodo = {
      id: crypto.randomUUID(),
      description,
      completed: false,
    };
    todoList.push(newTodo);
    liveDescription = `"${todoDesc}" added.`;
    todoDesc = "";
  }

  /** @param {Item} item */
  function removeTodo(item) {
    const itemIndex = todoList.indexOf(item);
    todoList.splice(itemIndex, 1);
    liveDescription = `"${item.description}" removed.`;
  }
</script>

<section aria-labelledby="todos-label">
  <h1 id="todos-label" tabindex="-1">stuff to do</h1>
  <ul>
    {#each todoList as todo (todo.id)}
      <li>
        <label class="todo-item">
          <input type="checkbox" bind:checked={todo.completed} />
          <span>{todo.description}</span>
          <button onclick={() => removeTodo(todo)}>
            &cross;
            <span class="visually-hidden">delete {todo.description}</span>
          </button>
        </label>
      </li>
    {/each}
  </ul>
  <div class="empty-state">
    <p>
      Either you've done everything on the list or there are still things to add
      to your list.
    </p>
    <p>Add your first todo!</p>
  </div>
  <form
    onsubmit={(e) => {
      e.preventDefault();
      addTodo(todoDesc);
    }}
  >
    <label for="add-todo" class="visually-hidden">Add a todo item</label>
    <input
      id="add-todo"
      type="text"
      placeholder="E.g. adopt an owl"
      aria-invalid={invalid}
      bind:value={todoDesc}
    />
    <button type="submit" disabled={invalid}>Add</button>
  </form>
  <div role="status" aria-live="polite" class="visually-hidden">
    {liveDescription}
  </div>
</section>

<style>
  [tabindex="-1"] {
    outline: none;
  }

  section {
    border: 4px solid black;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 40ch;
  }

  h1 {
    margin: 0;
  }

  .visually-hidden {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden !important;
  }
  .empty-state {
    display: none;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  ul:empty + .empty-state {
    display: block;
  }
  li [type="checkbox"] {
    border: 2px solid black;
  }
  #add-todo::placeholder {
    /** TODO: set color of placeholder text */
    font-style: italic;
  }
  .todo-item :checked + span {
    text-decoration: line-through;
  }
</style>
