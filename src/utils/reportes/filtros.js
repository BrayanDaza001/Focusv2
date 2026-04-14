const optionYears = document.createElement('option')
const meses = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE'
]
const months = document.getElementById('month-filter')
const projects = document.getElementById('project-filter')
const anio = document.getElementById('year-filter')
const anioStart = 2025
const anioActual = new Date().getFullYear()

const mes = document.createElement('option')
    mes.innerHTML=''
    mes.value=''
    mes.textContent= 'Selecccione un mes'
    mes.selected = true;
    mes.disabled = true;

    months.appendChild(mes)
meses.forEach(element => {
    const mes = document.createElement('option')
    mes.innerHTML=''
    mes.textContent= element

    months.appendChild(mes)
});

for (let i = anioStart; i <= anioActual; i++) {
  const optionYears = document.createElement('option')
  optionYears.value = i
  optionYears.textContent = i
  anio.appendChild(optionYears)
}
