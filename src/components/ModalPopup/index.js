// modal-popup.js
class ModalPopup extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		// Create the modal structure
		this.shadowRoot.innerHTML = `
            <style>
            :host {
                --modal-bg-color: rgba(0, 0, 0, 0.5);
                --modal-content-bg: white;
                --modal-content-color: black;
                --modal-border-radius: 8px;
                --modal-padding: 20px;
                --modal-max-width: 500px;
                --modal-z-index: 1000;
                --header-color: #333;
                --close-btn-color: #777;
                --close-btn-hover-color: #000;
            }
            
            .modal-container {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--modal-bg-color);
                z-index: var(--modal-z-index);
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-container.active {
                display: flex;
                opacity: 1;
            }
            
            .modal-content {
                background-color: var(--modal-content-bg);
                color: var(--modal-content-color);
                border-radius: var(--modal-border-radius);
                padding: var(--modal-padding);
                max-width: var(--modal-max-width);
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transform: translateY(-20px);
                transition: transform 0.3s ease;
            }
            
            .modal-container.active .modal-content {
                transform: translateY(0);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.25rem;
                color: var(--header-color);
            }
            
            .close-button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--close-btn-color);
                transition: color 0.2s;
            }
            
            .close-button:hover {
                color: var(--close-btn-hover-color);
            }
            
            .modal-body {
                margin-bottom: 15px;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                border-top: 1px solid #eee;
                padding-top: 10px;
            }
            
            /* Hide scrollbar for Chrome, Safari and Opera */
            .modal-content::-webkit-scrollbar {
                display: none;
            }
            
            /* Hide scrollbar for IE, Edge and Firefox */
            .modal-content {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            </style>
            
            <div class="modal-container" part="backdrop">
            <div class="modal-content" part="content">
                <div class="modal-header" part="header">
                <h3 class="modal-title" part="title"></h3>
                <button class="close-button" part="close-btn">&times;</button>
                </div>
                <div class="modal-body" part="body">
                <slot></slot>
                </div>
                <div class="modal-footer" part="footer">
                <slot name="footer"></slot>
                </div>
            </div>
            </div>
        `;

		// Get elements
		this.modal = this.shadowRoot.querySelector('.modal-container');
		this.closeBtn = this.shadowRoot.querySelector('.close-button');
		this.titleElement = this.shadowRoot.querySelector('.modal-title');

		// Bind methods
		this._handleClose = this._handleClose.bind(this);
		this._handleBackdropClick = this._handleBackdropClick.bind(this);
		this._handleKeyDown = this._handleKeyDown.bind(this);

		// Add event listeners
		this.closeBtn.addEventListener('click', this._handleClose);
		this.modal.addEventListener('click', this._handleBackdropClick);
	}

	static get observedAttributes() {
		return ['title', 'open'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title') {
			this.titleElement.textContent = newValue;
		} else if (name === 'open') {
			if (newValue === null) {
				this.close();
			} else {
				this.open();
			}
		}
	}

	connectedCallback() {
		// Set initial title if attribute exists
		if (this.hasAttribute('title')) {
			this.titleElement.textContent = this.getAttribute('title');
		}

		// Open modal if open attribute is present
		if (this.hasAttribute('open')) {
			this.open();
		}
	}

	disconnectedCallback() {
		// Remove event listeners
		this.closeBtn.removeEventListener('click', this._handleClose);
		this.modal.removeEventListener('click', this._handleBackdropClick);
		document.removeEventListener('keydown', this._handleKeyDown);
	}

	open() {
		this.modal.classList.add('active');
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
		document.addEventListener('keydown', this._handleKeyDown);

		// Dispatch open event
		this.dispatchEvent(
			new CustomEvent('modal-open', {
				bubbles: true,
				composed: true,
			})
		);
	}

	close() {
		this.modal.classList.remove('active');
		document.body.style.overflow = ''; // Restore scrolling
		document.removeEventListener('keydown', this._handleKeyDown);

		// Dispatch close event
		this.dispatchEvent(
			new CustomEvent('modal-close', {
				bubbles: true,
				composed: true,
			})
		);
	}

	_handleClose() {
		this.close();
		this.removeAttribute('open');
	}

	_handleBackdropClick(event) {
		if (event.target === this.modal) {
			this._handleClose();
		}
	}

	_handleKeyDown(event) {
		if (event.key === 'Escape') {
			this._handleClose();
		}
	}
}

// Register the custom element
customElements.define('modal-popup', ModalPopup);
