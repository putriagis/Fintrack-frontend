import { useState } from "react";
import KartuRingkasan from "./KartuRingkasan";
import { formatRupiah, formatTanggal } from "../utils/format";

function Dashboard({ daftarTransaksi, onPindah }) {
  const [saldoTampil, setSaldoTampil] = useState(true);

  const pemasukan = daftarTransaksi.filter((t) => t.jenis === "pemasukan");
  const pengeluaran = daftarTransaksi.filter((t) => t.jenis === "pengeluaran");

  const totalPemasukan = pemasukan.reduce((total, t) => total + t.nominal, 0);
  const totalPengeluaran = pengeluaran.reduce(
    (total, t) => total + t.nominal,
    0,
  );
  const sisaSaldo = totalPemasukan - totalPengeluaran;

  const tampilkan = (angka) => (saldoTampil ? formatRupiah(angka) : "Rp••••••");

  const infoSaldo =
    totalPemasukan === 0
      ? "belum ada pemasukan"
      : `${Math.round((sisaSaldo / totalPemasukan) * 100)}% tersisa`;

  const perKategori = {};
  pengeluaran.forEach((t) => {
    perKategori[t.kategori] = (perKategori[t.kategori] || 0) + t.nominal;
  });
  const daftarKategori = Object.keys(perKategori);

  const transaksiTerbaru = daftarTransaksi.slice(0, 3);

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Ringkasan seluruh transaksi keuanganmu
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light border text-nowrap"
            onClick={() => setSaldoTampil(!saldoTampil)}
          >
            {saldoTampil ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
          </button>
          <button
            type="button"
            className="btn btn-fintrack text-nowrap"
            onClick={() => onPindah("tambah")}
          >
            + Tambah Transaksi
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <KartuRingkasan
          judul="Total Pemasukan"
          nilai={tampilkan(totalPemasukan)}
          keterangan={`${pemasukan.length} transaksi`}
          warna="success"
        />
        <KartuRingkasan
          judul="Total Pengeluaran"
          nilai={tampilkan(totalPengeluaran)}
          keterangan={`${pengeluaran.length} transaksi`}
          warna="danger"
        />
        <KartuRingkasan
          judul="Sisa Saldo"
          nilai={tampilkan(sisaSaldo)}
          keterangan={infoSaldo}
          warna={sisaSaldo < 0 ? "danger" : "success"}
        />
        <KartuRingkasan
          judul="Jumlah Transaksi"
          nilai={daftarTransaksi.length}
          keterangan="semua transaksi"
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 fw-bold mb-3">Pengeluaran per Kategori</h2>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 table-fintrack">
                  <thead>
                    <tr>
                      <th scope="col">Kategori</th>
                      <th scope="col" className="text-end">
                        Jumlah
                      </th>
                      <th scope="col" className="text-end">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarKategori.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center text-muted">
                          Belum ada pengeluaran
                        </td>
                      </tr>
                    ) : (
                      daftarKategori.map((kategori) => (
                        <tr key={kategori}>
                          <td>{kategori}</td>
                          <td className="text-end">
                            {formatRupiah(perKategori[kategori])}
                          </td>
                          <td className="text-end">
                            {Math.round(
                              (perKategori[kategori] / totalPengeluaran) * 100,
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h6 fw-bold mb-0">Transaksi Terakhir</h2>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0"
                  onClick={() => onPindah("riwayat")}
                >
                  Lihat semua
                </button>
              </div>

              {transaksiTerbaru.length === 0 ? (
                <p className="text-center text-muted py-3 mb-0">
                  Belum ada data transaksi
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {transaksiTerbaru.map((t) => (
                    <li
                      key={t.id}
                      className="list-group-item px-0 d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="fw-semibold">{t.keterangan}</div>
                        <small className="text-muted">
                          {formatTanggal(t.tanggal)} &middot; {t.kategori}
                        </small>
                      </div>
                      <span
                        className={`fw-semibold ${t.jenis === "pemasukan" ? "text-success" : "text-danger"}`}
                      >
                        {t.jenis === "pemasukan" ? "+" : "-"}
                        {formatRupiah(t.nominal)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
