function highlight(table) {
  let rows = table.rows;
  let rowGender  = null;
  let rowAge = null;
  let rowStatus = null;
    for(let row = 0; row < rows.length; row++) {
      for(let cell=0; cell< rows[row].cells.length;cell++) {
        if(rows[0].cells[cell].textContent === 'Gender') rowGender = cell;
        if(rows[0].cells[cell].textContent === 'Age') rowAge = cell;
        if(rows[0].cells[cell].textContent === 'Status') rowStatus = cell;
        if(rowGender && row > 0 && rows[row].cells[rowGender].textContent === 'm') rows[row].classList.add('male');
        if(rowGender && row > 0 && rows[row].cells[rowGender].textContent === 'f') rows[row].classList.add('female');
        if(rowStatus && row > 0 && rows[row].cells[rowStatus].dataset.available === 'true') rows[row].classList.add('available');
        if(rowStatus && row > 0 && rows[row].cells[rowStatus].dataset.available === 'false') rows[row].classList.add('unavailable');
        if(rowStatus && row > 0 && !rows[row].cells[rowStatus].dataset.available) rows[row].hidden = true;
        if(rowAge && row > 0 && rows[row].cells[rowAge].textContent < 18) rows[row].style.textDecoration = 'line-through';
	      }
      }
}

const FIRST_COLUMN = 1;
const SECOND_COLUMN = 2;
const THIRD_COLUMN = 3;

function highlight(table) {
  const actions = {
    [THIRD_COLUMN]: (root, td) => {
      if (td.dataset.available === 'true') {
        root.classList.toggle('available', true);
      } else if (td.dataset.available === 'false') {
        root.classList.toggle('unavailable', true);
      } else if (!td.hasAttribute('data-available')) {
        root.hidden = true;
      }
    },
    [SECOND_COLUMN]: (root, td) => {
      if (td.textContent === 'm') {
        root.classList.toggle('male', true);
      } else if (td.textContent === 'f') {
        root.classList.toggle('female', true);
      }
    },
    [FIRST_COLUMN]: (root, td) => {
      const age = parseInt(td.textContent, 10);

      if (age < 18) {
        root.style.textDecoration = 'line-through';
      }
    },
  };

  for (const tr of table.rows) {
    Array.from(tr.cells).forEach((td, index) => {
      const fn = actions[index];

      if (typeof fn === 'function') {
        fn(tr, td);
      }
    });
  }
}