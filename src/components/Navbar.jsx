const daftarMenu = [
  { id: "dashboard", label: "Dashboard" },
  { id: "riwayat", label: "Riwayat Transaksi" },
  { id: "tambah", label: "Tambah Transaksi" },
];

function Navbar({ halamanAktif, onPindah }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-fintrack sticky-top">
      <div className="container-fluid px-4">
        <button
          type="button"
          className="navbar-brand fw-bold fs-4 btn btn-link text-decoration-none"
          onClick={() => onPindah("dashboard")}
        >
          <img src="/logo-fintrack.png" alt="Logo FinTrack" className="me-2" />
          Fin<span>Track</span>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuFintrack"
          aria-controls="menuFintrack"
          aria-expanded="false"
          aria-label="Buka menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuFintrack">
          <ul className="navbar-nav ms-auto gap-1 mt-2 mt-md-0">
            {daftarMenu.map((menu) => (
              <li key={menu.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${halamanAktif === menu.id ? "active" : ""}`}
                  onClick={() => onPindah(menu.id)}
                >
                  {menu.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
