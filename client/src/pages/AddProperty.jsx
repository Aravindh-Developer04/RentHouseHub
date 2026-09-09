import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    location: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Text / select fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Select images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setImages((prevImages) => [
      ...prevImages,
      ...selectedFiles,
    ]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // --------------------------------
      // STEP 1: ADD PROPERTY
      // --------------------------------

      const propertyResponse = await fetch(
        "http://localhost/RentHouseHub/api/add-property.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner_id: user.id,
            ...formData,
          }),
        }
      );

      const propertyData = await propertyResponse.json();

      console.log("Property Response:", propertyData);

      if (!propertyData.success) {
        alert(propertyData.message || "Failed to add property");
        return;
      }

      const propertyId = propertyData.property_id;

      // --------------------------------
      // STEP 2: UPLOAD IMAGES
      // --------------------------------

      if (images.length > 0) {
        const imageFormData = new FormData();

        imageFormData.append("property_id", propertyId);

        images.forEach((image) => {
          imageFormData.append("images[]", image);
        });

        const imageResponse = await fetch(
          "http://localhost/RentHouseHub/api/upload-property-images.php",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imageData = await imageResponse.json();

        console.log("Image Response:", imageData);

        if (!imageData.success) {
          alert(
            "Property added, but image upload failed: " +
              imageData.message
          );

          navigate("/dashboard/owner");
          return;
        }
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      alert("Property and images added successfully!");

      navigate("/dashboard/owner");

    } catch (error) {
      console.error("Add Property Error:", error);
      alert("Unable to connect to server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "40px 20px",
        background: "#f7f9fc",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1>Add Rental Property</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Add your property so tenants can find it.
        </p>

        <form onSubmit={handleSubmit}>

          {/* PROPERTY TITLE */}
          <div style={groupStyle}>
            <label>Property Title</label>

            <input
              type="text"
              name="title"
              placeholder="Example: 2BHK House"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* PROPERTY TYPE */}
          <div style={groupStyle}>
            <label>Property Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="PG">PG</option>
            </select>
          </div>

          {/* PRICE */}
          <div style={groupStyle}>
            <label>Monthly Rent</label>

            <input
              type="number"
              name="price"
              placeholder="Example: 15000"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* BEDROOMS */}
          <div style={groupStyle}>
            <label>Bedrooms</label>

            <input
              type="number"
              name="bedrooms"
              placeholder="Example: 2"
              value={formData.bedrooms}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* BATHROOMS */}
          <div style={groupStyle}>
            <label>Bathrooms</label>

            <input
              type="number"
              name="bathrooms"
              placeholder="Example: 2"
              value={formData.bathrooms}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* AREA */}
          <div style={groupStyle}>
            <label>Area</label>

            <input
              type="text"
              name="area"
              placeholder="Example: 1200 sq.ft"
              value={formData.area}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* LOCATION */}
          <div style={groupStyle}>
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Example: Anna Nagar, Chennai"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

         
        

          {/* DESCRIPTION */}
          <div style={groupStyle}>
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe your property"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div style={groupStyle}>
            <label>Property Images</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageChange}
              style={{
                ...inputStyle,
                padding: "10px",
              }}
            />

            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginTop: "6px",
              }}
            >
              You can select multiple images. Maximum 5 MB per image.
            </p>
          </div>

          {/* IMAGE PREVIEW */}
          {images.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    background: "#f5f5f5",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Property ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      width: "28px",
                      height: "28px",
                      border: "none",
                      borderRadius: "50%",
                      background: "#ef4444",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Adding Property..."
              : "Add Property"}
          </button>

        </form>
      </div>
    </div>
  );
}

const groupStyle = {
  marginBottom: "18px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "7px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxSizing: "border-box",
};

export default AddProperty;
