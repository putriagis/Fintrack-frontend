export function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

export function formatTanggal(tanggal) {
  const [tahun, bulan, hari] = tanggal.split("-");
  return `${hari}-${bulan}-${tahun}`;
}

export function formatTanggalPanjang(tanggal) {
  return new Date(tanggal + "T00:00:00").toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
