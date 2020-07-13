function toggleText() {
  let toggleTextButton = document.querySelector('.toggle-text-button')
  let text = document.querySelector('#text');
  toggleTextButton.addEventListener('click', function (e) {
    if (text.hidden) {
      text.hidden = false
      return
    }
    text.hidden = true




  })
}
