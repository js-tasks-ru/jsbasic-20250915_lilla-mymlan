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
