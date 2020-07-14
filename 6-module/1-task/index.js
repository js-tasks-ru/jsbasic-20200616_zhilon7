/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {

  constructor(rows) {
    this.elem = this.rowsElement(rows);
  }
  rowsElement(rows) {
    let table = document.createElement('table')
    table.insertAdjacentHTML('afterbegin', `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>`)
    rows.forEach(element => {
      table.insertAdjacentHTML('beforeend', `
      <tr>
        <td> ${element.name}</td>
        <td>${element.age}</td> 
        <td>${element.salary}</td>
        <td>${element.city}</td>
        <td><button>X</button></td>
        </tr>`)
    });
    document.addEventListener('click', function (e) {
      if (e.target.tagName == table.querySelector('button').tagName) {
        e.target.closest('tbody').remove()
      }
    })
    return table
  };
}
