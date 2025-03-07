import { colors, typography, spacing } from '../../tokens';

class DSTabs extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this._activeTab = 0;
	}

	static get observedAttributes() {
		return ['active'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'active' && oldValue !== newValue) {
			this._activeTab = parseInt(newValue, 10) || 0;
			this._updateActiveTab();
		}
	}

	connectedCallback() {
		this.render();
		this._setupEventListeners();
		this._updateActiveTab();
	}

	disconnectedCallback() {
		this._removeEventListeners();
	}

	_setupEventListeners() {
		const tabList = this.shadowRoot.querySelector('.tab-list');
		if (tabList) {
			tabList.addEventListener('click', this._handleTabClick.bind(this));
		}
	}

	_removeEventListeners() {
		const tabList = this.shadowRoot.querySelector('.tab-list');
		if (tabList) {
			tabList.removeEventListener('click', this._handleTabClick.bind(this));
		}
	}

	_handleTabClick(e) {
		const tab = e.target.closest('.tab');
		if (tab) {
			const index = Array.from(tab.parentNode.children).indexOf(tab);
			this.setActiveTab(index);
		}
	}

	setActiveTab(index) {
		this._activeTab = index;
		this.setAttribute('active', index);
		this._updateActiveTab();

		this.dispatchEvent(
			new CustomEvent('ds-tab-change', {
				bubbles: true,
				composed: true,
				detail: {
					index: index,
				},
			}),
		);
	}

	_updateActiveTab() {
		const tabs = this.shadowRoot.querySelectorAll('.tab');
		const tabPanels = this.shadowRoot.querySelector('slot').assignedElements();

		tabs.forEach((tab, index) => {
			tab.setAttribute('aria-selected', index === this._activeTab ? 'true' : 'false');
			tab.setAttribute('tabindex', index === this._activeTab ? '0' : '-1');
			tab.classList.toggle('active', index === this._activeTab);
		});

		tabPanels.forEach((panel, index) => {
			panel.hidden = index !== this._activeTab;
			panel.setAttribute('role', 'tabpanel');
			panel.setAttribute('tabindex', '0');
			panel.setAttribute('aria-labelledby', `tab-${index}`);
		});
	}

	render() {
		// Get tab labels from the attributes or slots
		const tabPanels = Array.from(this.children);
		const tabLabels = tabPanels.map((panel, index) => {
			return panel.getAttribute('label') || `Tab ${index + 1}`;
		});

		this.shadowRoot.innerHTML = `
            <style>
                :host {
                display: block;
                --tabs-color: var(--ds-tabs-color, ${colors.gray900});
                --tabs-color-hover: var(--ds-tabs-color-hover, ${colors.primary});
                --tabs-active-color: var(--ds-tabs-active-color, ${colors.primary});
                --tabs-active-border-color: var(--ds-tabs-active-border-color, ${
					colors.primary
				});
                --tabs-border-color: var(--ds-tabs-border-color, ${colors.gray300});
                }
                
                .tabs-container {
                display: flex;
                flex-direction: column;
                }
                
                .tab-list {
                display: flex;
                border-bottom: 1px solid var(--tabs-border-color);
                margin-bottom: ${spacing.md};
                }
                
                .tab {
                padding: ${spacing.sm} ${spacing.md};
                cursor: pointer;
                font-family: ${typography.fontFamily};
                font-size: ${typography.fontSize.base};
                font-weight: ${typography.fontWeight.medium};
                color: var(--tabs-color);
                background: transparent;
                border: none;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
                transition: color 0.2s, border-color 0.2s;
                }
                
                .tab:hover {
                color: var(--tabs-color-hover);
                }
                
                .tab.active {
                color: var(--tabs-active-color);
                border-bottom: 2px solid var(--tabs-active-border-color);
                }
                
                .tab-panel {
                display: none;
                }
                
                .tab-panel.active {
                display: block;
                }
            </style>
            
            <div class="tabs-container">
                <div class="tab-list" role="tablist">
                ${tabLabels
					.map(
						(label, index) => `
                    <button 
                    class="tab ${index === this._activeTab ? 'active' : ''}" 
                    role="tab" 
                    id="tab-${index}" 
                    aria-selected="${index === this._activeTab}" 
                    tabindex="${index === this._activeTab ? '0' : '-1'}"
                    >
                    ${label}
                    </button>
                `,
					)
					.join('')}
                </div>
                <div class="tab-content">
                <slot></slot>
                </div>
            </div>
        `;
	}
}

customElements.define('ds-tabs', DSTabs);

// We also need a tab panel component
class DSTabPanel extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['label'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'label' && this.parentElement && oldValue !== newValue) {
			// Force parent tabs to re-render when label changes
			this.parentElement.render();
		}
	}

	connectedCallback() {
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'tabpanel');
		}
	}
}

customElements.define('ds-tab-panel', DSTabPanel);
