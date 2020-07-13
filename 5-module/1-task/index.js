function hideSelf() {
  let hideSelfButton = document.querySelector('.hide-self-button')
  hideSelfButton.addEventListener('click', function (e) {
    this.hidden = true
  })
}
