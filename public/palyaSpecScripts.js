async function handleDelete(event, id) {
  if (!window.confirm('Sure you want to delete?')) {
    // ha veletlenul kattintottunk a gomra
    return;
  }
  try {
    // ha biztosan torolni akarjuk es nme csak veletlenul kattintottunk a gomra
    const response = await fetch(`api/delete/${id}`, {
      // kitorlom az adatbazik=sbol szerver oldalon
      method: 'DELETE',
    });
    // console.log(response.status);
    if (response.status < 400) {
      const sibling = event.previousElementSibling; // a ketre (img) hivatkozva torlok
      console.log(sibling);
      sibling.remove();
      event.remove(); // a gombot is torlom
    } else {
      const body = await response.json();
      alert(body.message);
    }
  } catch (err) {
    console.alert(`Delete error: ${err}`);
    window.alert('Delete error');
  }
}

const deleteButton = document.querySelectorAll('.delete-button');
deleteButton.forEach((button) => {
  console.log(button.id);
  button.addEventListener('click', () => {
    // ha egy adott gombra rakattintottam
    handleDelete(button, button.id); // meghivom az asszinkron fuggvenyt
  });
});
