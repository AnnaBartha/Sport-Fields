async function expandRow(row, id) {
  const leiras = await fetch(`api/getLeiras/${id}`); // elkuldok egy get kerest
  const response = await leiras.json();
  const hidden = row.getElementsByClassName('hiddenInfo')[0];
  const content = row.getElementsByClassName('expanded-content')[0];
  const beszu = response[0][0].leiras; // megkapom  a lekert informaciot es eltarolom
  content.textContent = beszu;
  hidden.classList.toggle('expanded');
  content.classList.toggle(beszu); // kirajzolom
}
// console.log('ben vaggy');
document.addEventListener('DOMContentLoaded', () => {
  // hogyha rakattintottam egy adott sor barmely elemere
  const sorok = document.getElementsByClassName('palyakTablazat')[0].rows; // lekerem a tablazatot class name alapjan
  Array.from(sorok).forEach((sor) => {
    // minden sorra megnezem hogy tortent e kattintas
    sor.addEventListener('click', () => {
      expandRow(sor, sor.id); // ha igen meghivok egy asszinkron fuggvenyt
    });
  });
});
