import { useState } from "react";

function ListGroup() {
  let items = [
    'You can click on me',
    'I do stuff now',
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>Hi Guys!</h1> {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              console.log('It also logs which button you clicked, you clicked: ' + item);
            }}
          >
            {item}
          </li>
        ))}
      </ul >
    </>
  );
}

export default ListGroup;
