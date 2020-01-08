let Navbar = {
  render: async () => {
    let view = /*html*/ `
             <nav class="navbar">
              <h1 class="heading-logo"><a href="#/">Robo News</a></h1>
            </nav>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
