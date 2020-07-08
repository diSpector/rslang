export default class View {
  constructor(config) {
    this.config = config;
  }

  hidePage(page) { // скрыть одну страницу
    const pageSelector = document.querySelector(`.${page}`);
    if (pageSelector) {
      pageSelector.classList.add('hidden');
    }
  }

  hideAllPages(pages) { // скрыть все "страницы"
    pages.forEach((e) => {
      this.hidePage(e);
    });
  }

  showPage(page) { // скрыть все страницы, показать нужную
    this.hideAllPages(this.config.pages);

    const container = document.querySelector(`.${page}`);
    container.classList.remove('hidden');
  }

  showLoader(div) {
    const container = div;
    container.innerHTML = `
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5" 
                begin="0s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="10" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5" 
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5" 
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
          </svg>`;
  }
}