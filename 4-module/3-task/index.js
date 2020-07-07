/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    let tableList = table.querySelectorAll('[data-available]');
    let tableList2 = table.querySelectorAll('tbody tr')
    tableList.forEach(td => {
        if (td.getAttribute('data-available') == 'true') {
            td.parentElement.classList.add('available')
        } else {
            td.parentElement.classList.add('unavailable')
        }
    })
    tableList2.forEach(td => {
        if (!(td.classList.contains('unavailable') || td.classList.contains('available'))) {
            td.hidden = true
        }
    })
    tableList2.forEach(tr => {
        if (tr.cells[2].textContent == 'm') {
            tr.classList.add('male')
        } else {
            if (tr.cells[2].textContent == 'f') {
                tr.classList.add('female')

            }
        }
    })
    tableList2.forEach(tr => {
        if (tr.cells[1].textContent < 18) {
            tr.setAttribute('style', 'text-decoration: line-through')
        }
    })



}
