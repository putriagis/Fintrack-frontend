import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import RiwayatTransaksi from "./components/RiwayatTransaksi";
import BarisTransaksi from "./components/BarisTransaksi";
import DetailTransaksi from "./components/DetailTransaksi";
import FormTransaksi from "./components/FormTransaksi";
import Footer from "./components/Footer";

const dataAwal = [
  {
    id: 1,
    tanggal: "2026-09-01",
    keterangan: "Uang saku bulanan",
    jenis: "pemasukan",
    kategori: "Uang Saku",
    nominal: 1000000,
    foto: "/pemasukan.jpg",
    catatan: "Uang saku bulan September.",
  },
  {
    id: 2,
    tanggal: "2026-09-05",
    keterangan: "Sarapan",
    jenis: "pengeluaran",
    kategori: "Makanan",
    nominal: 21000,
    foto: "/struk.png",
    catatan: "Sarapan di kantin",
  },
  {
    id: 3,
    tanggal: "2026-09-26",
    keterangan: "Gojek",
    jenis: "pengeluaran",
    kategori: "Transportasi",
    nominal: 42000,
    foto: "/transportasi.png",
    catatan: "Gojek ke kampus",
  },
];

function App() {
  const [daftarTransaksi, setDaftarTransaksi] = useState(dataAwal);
  const [halamanAktif, setHalamanAktif] = useState("dashboard");
  const [filterAktif, setFilterAktif] = useState("semua");
  const [idDetail, setIdDetail] = useState(null);

  const tambahTransaksi = (transaksiBaru) => {
    setDaftarTransaksi([transaksiBaru, ...daftarTransaksi]);
  };

  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((t) => t.id !== id));
  };

  const bukaDetail = (id) => {
    setIdDetail(id);
    setHalamanAktif("detail");
  };

  const transaksiTerurut = [...daftarTransaksi].sort((a, b) =>
    b.tanggal.localeCompare(a.tanggal),
  );

  const transaksiTampil =
    filterAktif === "semua"
      ? transaksiTerurut
      : transaksiTerurut.filter((t) => t.jenis === filterAktif);

  const transaksiDetail = daftarTransaksi.find((t) => t.id === idDetail);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        halamanAktif={halamanAktif === "detail" ? "riwayat" : halamanAktif}
        onPindah={setHalamanAktif}
      />

      <main className="container-fluid px-4 my-4 flex-grow-1">
        {halamanAktif === "dashboard" && (
          <Dashboard
            daftarTransaksi={transaksiTerurut}
            onPindah={setHalamanAktif}
          />
        )}

        {halamanAktif === "riwayat" && (
          <RiwayatTransaksi
            filterAktif={filterAktif}
            onFilter={setFilterAktif}
            jumlahTampil={transaksiTampil.length}
            onReset={() => setDaftarTransaksi(dataAwal)}
            onPindah={setHalamanAktif}
          >
            {transaksiTampil.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  Belum ada data transaksi
                </td>
              </tr>
            ) : (
              transaksiTampil.map((t, index) => (
                <BarisTransaksi
                  key={t.id}
                  nomor={index + 1}
                  tanggal={t.tanggal}
                  keterangan={t.keterangan}
                  jenis={t.jenis}
                  kategori={t.kategori}
                  nominal={t.nominal}
                  onDetail={() => bukaDetail(t.id)}
                  onHapus={() => hapusTransaksi(t.id)}
                />
              ))
            )}
          </RiwayatTransaksi>
        )}

        {halamanAktif === "detail" && transaksiDetail && (
          <DetailTransaksi
            transaksi={transaksiDetail}
            onKembali={() => setHalamanAktif("riwayat")}
          />
        )}

        {halamanAktif === "tambah" && (
          <FormTransaksi
            onTambah={tambahTransaksi}
            onPindah={setHalamanAktif}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
