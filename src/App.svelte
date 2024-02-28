<script>
  let valid = $state(true);
  let invalid = $derived(!valid);
</script>

<section aria-labelledby="todos-label">
  <h1 id="todos-label">stuff to do</h1>
  <ul>
    <li>Do laundry</li>
    <li>Cook dinner</li>
    <li>Find a bird</li>
  </ul>
  <div class="empty-state">
    <p>
      Either you've done everything on the list or there are still things to add
      to your list.
    </p>
    <p>Add your first todo!</p>
  </div>
  <form>
    <label for="add-todo" class="visually-hidden">Add a todo item</label>
    <input
      id="add-todo"
      type="text"
      placeholder="E.g. adopt an owl"
      aria-invalid={invalid}
    />
    <button type="submit" disabled={invalid}>Add</button>
  </form>
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
</style>
