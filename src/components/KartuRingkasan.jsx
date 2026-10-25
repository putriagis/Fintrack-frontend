function KartuRingkasan({ judul, nilai, keterangan, warna = "secondary" }) {
  return (
    <div className="col-6 col-xl-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <p className="text-muted small mb-3">{judul}</p>
          <p className="fs-5 fw-bold mb-2">{nilai}</p>
          <span className={`badge bg-${warna}-subtle text-${warna}`}>
            {keterangan}
          </span>
        </div>
      </div>
    </div>
  );
}

export default KartuRingkasan;
