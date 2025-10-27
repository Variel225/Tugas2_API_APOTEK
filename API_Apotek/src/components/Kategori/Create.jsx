import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateKategori() {
  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsiKategori, setDeskripsiKategori] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaKategori.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Nama kategori tidak bisa kosong",
        icon: "error",
      });
      setError("Nama Kategori is required");
      return;
    }

    try {
      const response = await axios
        .post("https://tugas-api-apotek.vercel.app/api/api/kategori", {
          nama_kategori: namaKategori,
          deskripsi: deskripsiKategori,
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Tidak bisa menambah kategori!",
            icon: "error",
          });
          setError(error.response.data.message);
        });
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambah kategori!",
          icon: "success",
        });
        setSuccess("Kategori created successfully!");
        setNamaKategori("");
        setDeskripsiKategori("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Tidak bisa menambah kategori!",
          icon: "error",
        });
        setError("Failed to create kategori");
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Tambah Kategori</h4>
          <p className="text-muted mb-0">Untuk menambahkan kategori</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nama Kategori */}
        <div className="mb-3">
          <label htmlFor="namaKategori" className="form-label">
            <strong>Nama Kategori</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="namaKategori"
            placeholder="Nama Kategori"
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
          />
        </div>
    
        {/* Deskripsi Kategori */}
        <div className="mb-4">
          <label htmlFor="deskripsiKategori" className="form-label">
            <strong>Deskripsi Kategori</strong>
          </label>
          <textarea
            className="form-control"
            id="deskripsiKategori"
            rows="3"
            placeholder="Deskripsi Kategori"
            value={deskripsiKategori}
            onChange={(e) => setDeskripsiKategori(e.target.value)}></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="d-grid">
          <center>
            <button
              type="submit"
              className="btn btn-outline-primary btn-md w-25">
              Create
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}