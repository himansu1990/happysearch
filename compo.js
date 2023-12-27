const template = document.createElement('template')
template.innerHTML = `
<style>
@import url('style.css');
</style>

<div class="happyslot">
<h3><slot name="title">This is a default h3</slot></h3>
</div>
`
class myText extends HTMLElement {
    constructor(){
        super();
        const happyText = this.attachShadow({mode: 'closed'})
        let happyClone = template.content.cloneNode(true)
        happyText.append(happyClone)
    }
}
customElements.define('my-text', myText)

