export class Modal {
    constructor({ content = "", className = "", outsideClick = true, outsideContains = "", whereAdd = "document", handleToggle} = {},) {
        this.content = content;
        this.className = className;
        this.outsideClick = outsideClick
        this.whereAdd = whereAdd
        this.modalElement = null
        this.outsideContains = outsideContains
        this.isOpen = false;
        this.eventClose = this.handleOutsideClick.bind(this);
        this.handleToggle = handleToggle
    }
    
    render() {
        const modal = document.createElement('div');
        modal.classList.add("modal");
        
        if(this.className){
            modal.classList.add(`modal__${this.className}`)
        }
        
        modal.innerHTML = `
        <div class="modal__content ${this.className ? `modal__content-${this.className}`: ""}">
            <div class="modal__body ${this.className ? `modal__body-${this.className}`: ""}">${this.content}</div>
        </div>
        `;
        
        if (this.whereAdd === "document"){
            document.body.appendChild(modal);
        } else {
            const parent = document.querySelector(this.whereAdd);
            parent.insertBefore(modal, parent.childNodes[0]);
        }
        
        this.modalElement = modal
    }
    
    open() {
        this.render();
        this.init();
        this.isOpen = true;
        if (this.outsideClick) document.body.style.overflow = "hidden"
        this.handleToggle && this.handleToggle()
    }
    
    close() {
        this.isOpen = false;
        this.eventClose && this.outsideClick && window.removeEventListener("click", this.eventClose);
        if (this.outsideClick) document.body.style.overflow = "visible"
        
        if (this.modalElement) {
            this.modalElement.remove();
            this.modalElement = null;
        }
        
        this.handleToggle && this.handleToggle()
    }

    init() {
        const closeButtons = document.querySelectorAll('.close__modal');
        if (closeButtons){
            closeButtons.forEach(button => {
                button.addEventListener('click', () => this.close());
            });
        }
        
        this.outsideClick && window.addEventListener('click', this.eventClose);
    }
    
    handleOutsideClick(event) {
        if (event.target.classList.contains("modal") || event.target.classList.contains("modal__content") || event.target.classList.contains(this.outsideContains)) {
            this.close()
        }
    }
}