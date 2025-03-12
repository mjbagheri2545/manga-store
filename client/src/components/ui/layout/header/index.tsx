import NavbarItems from "./navbarItems";

function Header() {
  return (
    <header className="bg-dark fixed w-full top-0 right-0 z-50 shadow-lg shadow-slate-900">
      <nav className="flex relative px-[10px] py-4 w-full mx-auto max-w-[1400px]">
        <img
          src="/logo.svg"
          className="max-w-[120px] mr-4 ml-6 object-contain max-h-12"
          alt="logo"
        />
        <NavbarItems />
      </nav>
    </header>
  );
}

export default Header;
