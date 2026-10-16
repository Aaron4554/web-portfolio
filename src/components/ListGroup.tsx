function ListGroup() {
  let items = ['Detroit', 'Chicago', 'Saint Joseph', 'LA'];

  return (
    <>
      <h1>List</h1> {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group"
            key={item}
            onClick={() => console.log('CLicked ' + item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
