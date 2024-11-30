export const NavbarDashboard = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow flex justify-end p-4 h-[60px]">
      <div className="flex space-x-4">
        <a href="#" className="text-black">
          <i className="fas fa-home"></i>
        </a>
        <a href="#" className="text-black">
          <i className="fas fa-user"></i> Hola admin
        </a>
        <a href="#" className="text-black">
          <i className="fas fa-cog"></i>
        </a>
      </div>
    </nav>
  )
}