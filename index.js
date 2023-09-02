require('./lib/corner-picker')

document.querySelector('#cornerPicker').addEventListener('change', (e) => {
  const value = e.target.value
  const cornerName = e.target.cornerName
  document.querySelector('#selectValue').innerHTML = `${cornerName} (${value})` 
})

document.querySelector('#btnTest').addEventListener('click', () => {
  document.querySelector('corner-picker').value = 0;
})