let Navbar = {
  render: async () => {
    let view = /*html*/ `
             <nav class="navbar">
              <h1>Robo News</h1>
            </nav>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
