import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function BookElectrician() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [electricians, setElectricians] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/public/verified-electricians`)
      .then((res) => res.json())
      .then((data) => {
        setElectricians(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBookNow = (id) => {
    if (!isLoggedIn) navigate("/login");
    else navigate(`/book/${id}`);
  };

  const filtered = electricians.filter((e) =>
    e.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <section className="home-header">
        <h1>
          {t("findVerified")}{" "}
          <span className="highlight">{t("electricians")}</span>{" "}
          {t("nearYou")} ⚡
        </h1>

        <p>{t("homeSubtitle")}</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="electrician-grid">
        {loading && <p style={{ color: "#fff" }}>Loading...</p>}

        {!loading && filtered.length === 0 && (
          <p style={{ color: "#fff" }}>No verified electricians available</p>
        )}

        {filtered.map((e) => (
            <div key={e.electrician_id} className="electrician-card">
          
              {/* IMAGE */}
              <div
                className="electrician-image-wrapper"
                style={{
                  backgroundImage: `url(${
                    e.profile_image
                      ? `${process.env.REACT_APP_API_URL}${e.profile_image}`
                      : "/default-user.png"
                  })`,
                }}
              >
                <img
                  src={
                    e.profile_image
                      ? `${process.env.REACT_APP_API_URL}${e.profile_image}`
                      : "/default-user.png"
                  }
                  alt={e.fullname}
                />
              </div>
          
              {/* BODY */}
              <div className="card-body">
                <h3>{e.fullname}</h3>
                <span className="type">{t("electrician")}</span>
          
                <p><strong>{t("shop")}:</strong> {e.shop_name}</p>
                <p><strong>{t("address")}:</strong> {e.shop_city || e.location}</p>
                <p><strong>{t("mobile")}:</strong> {e.mobile}</p>
          
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(e.electrician_id)}
                >
                  {t("bookNow")}
                </button>
              </div>
          
            </div>
          ))}
          
      </section>
    </div>
  );
}

export default BookElectrician;
