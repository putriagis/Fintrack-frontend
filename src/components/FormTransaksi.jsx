import { useState } from "react";
import { formatRupiah } from "../utils/format";

const daftarKategori = [
  "Uang Saku",
  "Makanan",
  "Transportasi",
  "Kebutuhan Bulanan",
  "Tabungan",
  "Hiburan",
];

function FormTransaksi({ onTambah, onPindah }) {
  const [tanggal, setTanggal] = useState("");
  const [nominal, setNominal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState("");
  const [kategori, setKategori] = useState("");
  const [foto, setFoto] = useState(null);
  const [catatan, setCatatan] = useState("");
  const [kolomKosong, setKolomKosong] = useState([]);
  const [transaksiTersimpan, setTransaksiTersimpan] = useState(null);

  const kosongkanForm = () => {
    setTanggal("");
    setNominal("");
    setKeterangan("");
    setJenis("");
    setKategori("");
    setFoto(null);
    setCatatan("");
    setKolomKosong([]);
  };

  const simpan = (e) => {
    e.preventDefault();

    const kosong = [];
    if (tanggal === "") kosong.push("Tanggal");
    if (nominal === "" || Number(nominal) <= 0) kosong.push("Nominal");
    if (keterangan.trim() === "") kosong.push("Keterangan");
    if (jenis === "") kosong.push("Jenis Transaksi");
    if (kategori === "") kosong.push("Kategori");

    setKolomKosong(kosong);
    setTransaksiTersimpan(null);
    if (kosong.length > 0) return;

    const transaksiBaru = {
      id: Date.now(),
      tanggal,
      keterangan: keterangan.trim(),
      jenis,
      kategori,
      nominal: Number(nominal),
      foto: foto ? URL.createObjectURL(foto) : null,
      catatan: catatan.trim(),
    };

    onTambah(transaksiBaru);
    e.target.reset();
    setTransaksiTersimpan(transaksiBaru);
  };

  const reset = () => {
    kosongkanForm();
    setTransaksiTersimpan(null);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <h1 className="h3 fw-bold mb-1">Tambah Transaksi</h1>
        <p className="text-muted mb-4">Catat pemasukan atau pengeluaran baru</p>

        <div className="card shadow-sm">
          <div className="card-body p-4">
            {kolomKosong.length > 0 && (
              <div className="alert alert-danger">
                <strong>Data belum lengkap.</strong> Mohon isi: {kolomKosong.join(", ")}
              </div>
            )}

            {transaksiTersimpan && (
              <div className="alert alert-success">
                <strong>Transaksi berhasil disimpan:</strong> {transaksiTersimpan.keterangan} (
                {formatRupiah(transaksiTersimpan.nominal)}).{" "}
                <button
                  type="button"
                  className="btn btn-link alert-link p-0 align-baseline"
                  onClick={() => onPindah("riwayat")}
                >
                  Lihat di Riwayat Transaksi
                </button>
              </div>
            )}

            <form onSubmit={simpan} onReset={reset} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="tanggal" className="form-label fw-semibold">Tanggal</label>
                  <input
                    type="date"
                    id="tanggal"
                    className="form-control"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="nominal" className="form-label fw-semibold">Nominal</label>
                  <div className="input-group">
                    <span className="input-group-text">Rp</span>
                    <input
                      type="number"
                      id="nominal"
                      className="form-control"
                      placeholder="10000"
                      min="0"
                      value={nominal}
                      onChange={(e) => setNominal(e.target.value)}
                    />
                  </div>
                  <div className="form-text">Tulis tanpa titik, contoh: 10000</div>
                </div>

                <div className="col-12">
                  <label htmlFor="keterangan" className="form-label fw-semibold">Keterangan</label>
                  <input
                    type="text"
                    id="keterangan"
                    className="form-control"
                    placeholder="Contoh: Sarapan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold d-block">Jenis Transaksi</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="pemasukan"
                      value="pemasukan"
                      checked={jenis === "pemasukan"}
                      onChange={(e) => setJenis(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="pemasukan">Pemasukan</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="pengeluaran"
                      value="pengeluaran"
                      checked={jenis === "pengeluaran"}
                      onChange={(e) => setJenis(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="pengeluaran">Pengeluaran</label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="kategori" className="form-label fw-semibold">Kategori</label>
                  <select
                    id="kategori"
                    className="form-select"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {daftarKategori.map((nama) => (
                      <option key={nama} value={nama}>
                        {nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="struk" className="form-label fw-semibold">
                    Foto Struk (opsional)
                  </label>
                  <input
                    type="file"
                    id="struk"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files[0] || null)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="catatan" className="form-label fw-semibold">Catatan</label>
                  <textarea
                    id="catatan"
                    className="form-control"
                    rows="3"
                    placeholder="Tambahkan catatan jika diperlukan"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                <button type="reset" className="btn btn-light border">
                  Reset
                </button>
                <button type="submit" className="btn btn-fintrack">
                  Tambah Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-3 mb-0">
          <button type="button" className="btn btn-link p-0" onClick={() => onPindah("riwayat")}>
            &larr; Kembali ke Riwayat Transaksi
          </button>
        </p>
      </div>
    </div>
  );
}

export default FormTransaksi;
