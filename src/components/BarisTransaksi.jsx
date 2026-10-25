import { formatRupiah, formatTanggal } from "../utils/format";

function BarisTransaksi({ nomor, tanggal, keterangan, jenis, kategori, nominal, onDetail, onHapus }) {
  const isPemasukan = jenis === "pemasukan";

  return (
    <tr>
      <td>{nomor}</td>
      <td>{formatTanggal(tanggal)}</td>
      <td className="fw-semibold">{keterangan}</td>
      <td>
        <span
          className={`badge ${isPemasukan ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
        >
          {isPemasukan ? "Pemasukan" : "Pengeluaran"}
        </span>
      </td>
      <td>{kategori}</td>
      <td className="text-end fw-semibold">{formatRupiah(nominal)}</td>
      <td className="text-center">
        <button type="button" className="btn btn-sm btn-light border me-1" onClick={onDetail}>
          Detail
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onHapus}>
          Hapus
        </button>
      </td>
    </tr>
  );
}

export default BarisTransaksi;
