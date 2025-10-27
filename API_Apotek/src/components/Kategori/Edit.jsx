/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsiKategori, setDeskripsiKategori] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://tugas-api-apotek.vercel.app/api/api/kategori/${id}`)
      .then((response) => {
        const data = response.data;
        console.log(response);
        setNamaKategori(data.nama_kategori || "");
        setDeskripsiKategori(data.deskripsi || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "namaKategori":
        setNamaKategori(value);
        break;
      case "deskripsiKategori":
        setDeskripsiKategori(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.patch(
        `https://tugas-api-apotek.vercel.app/api/api/kategori/${id}`,
        {
          nama_kategori: namaKategori,
          deskripsi: deskripsiKategori,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Kategori updated successfully",
          icon: "success",
        });
        navigate("/kategori");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Kategori cannot be updated",
          icon: "error",
        });
        console.log(error);
        setError("Failed to edit kategori");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Kategori cannot be updated",
        icon: "error",
      });
      console.log({
        nama_kategori: namaKategori,
        deskripsi: deskripsiKategori,
      });
      setError("An error occured while editing kategori");
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1">Edit Kategori</h4>
          <p className="text-muted mb-0">Untuk edit kategori</p>
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
            id="namaKategori"
            className="form-control"
            value={namaKategori}
            onChange={handleChange}
            placeholder="Nama Kategori"
          />
        </div>

        {/* Deskripsi Kategori */}
        <div className="mb-4">
          <label htmlFor="deskripsiKategori" className="form-label">
            <strong>Deskripsi Kategori</strong>
          </label>
          <textarea
            id="deskripsiKategori"
            className="form-control"
            rows="3"
            value={deskripsiKategori}
            onChange={handleChange}
            placeholder="Deskripsi Kategori"></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="d-grid">
          <center>
            <button
              type="submit"
              className="btn btn-outline-primary btn-md w-25">
              Simpan
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}