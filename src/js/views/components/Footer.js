const Footer = {
  render: async () => {
    const view = /* html */`
        <footer class="footer">
            <div class="footer__content">
                <p>
                    This is footer
                </p>
            </div>
        </footer>
        `;
    return view;
  },
  afterRender: async () => { },

};

export default Footer;
