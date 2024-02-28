<script>
  let liveDescription = $state("");

  /** @type {import('./lib/Item.svelte').Item[]} */
  let todoList = $state([]);
  let todoDesc = $state("");

  let valid = $derived(todoDesc.length > 0);
  let invalid = $derived(!valid);

  /** @param {SubmitEvent} event*/
  function addTodo(event) {
    event.preventDefault();
    /** @type {import('./lib/Item.svelte').Item} */
    let newTodo = {
      id: crypto.randomUUID(),
      description: todoDesc,
      completed: false,
    };
    todoList.push(newTodo);
    liveDescription = `"${todoDesc}" added.`;
    todoDesc = "";
  }
</script>

<section aria-labelledby="todos-label">
  <h1 id="todos-label">stuff to do</h1>
  <ul>
    {#each todoList as todo (todo.id)}
      <li>
        <label class="todo-item">
          <input type="checkbox" bind:checked={todo.completed} />
          <span>{todo.description}</span>
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
  <form onsubmit={addTodo}>
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
  ul:empty + .empty-state {
    display: block;
  }
  #add-todo::placeholder {
    /** TODO: set color of placeholder text */
    font-style: italic;
  }
  .todo-item :checked + span {
    text-decoration: line-through;
  }
</style>
