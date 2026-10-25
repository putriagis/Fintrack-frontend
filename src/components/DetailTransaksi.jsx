import { formatRupiah, formatTanggal, formatTanggalPanjang } from "../utils/format";

function DetailTransaksi({ transaksi, onKembali }) {
  const isPemasukan = transaksi.jenis === "pemasukan";

  return (
    <>
      <p className="mb-3">
        <button type="button" className="btn btn-link p-0" onClick={onKembali}>
          &larr; Kembali ke Riwayat Transaksi
        </button>
      </p>

      <article className="card shadow-sm">
        <div className="card-body p-4">
          <div className="mb-4">
            <h1 className="h3 fw-bold mb-1">{transaksi.keterangan}</h1>
            <p className="text-muted mb-0">
              Dicatat pada{" "}
              <time dateTime={transaksi.tanggal}>{formatTanggalPanjang(transaksi.tanggal)}</time>
            </p>
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-4 text-center">
              {transaksi.foto ? (
                <img
                  src={transaksi.foto}
                  alt={`Bukti transaksi ${transaksi.keterangan}`}
                  className="img-fluid rounded border"
                />
              ) : (
                <div className="bg-light border rounded text-muted py-5">Tidak ada foto struk</div>
              )}
            </div>
            <div className="col-12 col-md-8">
              <h2 className="h6 fw-bold">Informasi Transaksi</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row" className="text-muted fw-normal w-25">Jenis</th>
                    <td>
                      <span
                        className={`badge ${isPemasukan ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
                      >
                        {isPemasukan ? "Pemasukan" : "Pengeluaran"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted fw-normal">Kategori</th>
                    <td>{transaksi.kategori}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted fw-normal">Nominal</th>
                    <td className={`fw-bold ${isPemasukan ? "text-success" : "text-danger"}`}>
                      {formatRupiah(transaksi.nominal)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted fw-normal">Tanggal</th>
                    <td>{formatTanggal(transaksi.tanggal)}</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="h6 fw-bold">Catatan</h2>
              <p className="bg-light rounded p-3 mb-0">{transaksi.catatan || "Tidak ada catatan."}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default DetailTransaksi;
