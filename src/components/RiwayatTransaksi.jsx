const daftarFilter = [
  { id: "semua", label: "Semua" },
  { id: "pemasukan", label: "Pemasukan" },
  { id: "pengeluaran", label: "Pengeluaran" },
];

function RiwayatTransaksi({ filterAktif, onFilter, jumlahTampil, onReset, onPindah, children }) {
  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Riwayat Transaksi</h1>
          <p className="text-muted mb-0">Daftar seluruh pemasukan dan pengeluaranmu</p>
        </div>
        <button type="button" className="btn btn-fintrack" onClick={() => onPindah("tambah")}>
          + Tambah Transaksi
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
            <div className="btn-group" role="group" aria-label="Filter jenis transaksi">
              {daftarFilter.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`btn btn-outline-secondary ${filterAktif === f.id ? "active" : ""}`}
                  onClick={() => onFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="d-flex align-items-center gap-3">
              <small className="text-muted">Menampilkan {jumlahTampil} transaksi</small>
              <button
                type="button"
                className="btn btn-sm btn-light border text-nowrap"
                onClick={onReset}
              >
                Kembalikan Data Awal
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 table-fintrack text-nowrap">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jenis</th>
                  <th scope="col">Kategori</th>
                  <th scope="col" className="text-end">Nominal</th>
                  <th scope="col" className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default RiwayatTransaksi;
