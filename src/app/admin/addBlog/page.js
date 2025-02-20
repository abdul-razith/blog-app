"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, X, ImagePlus, Upload } from "lucide-react";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    tags: "",
    blogContent: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setThumbnail({ file, preview });
    }
  };

  const handleRelatedImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newImages = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setRelatedImages([...relatedImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setRelatedImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleRemoveThumbnail = () => {
    if (thumbnail) {
      URL.revokeObjectURL(thumbnail.preview);
      setThumbnail(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("author", formData.author);
    formPayload.append("tags", formData.tags);
    formPayload.append("blogcontent", formData.blogContent);
    formPayload.append("createdat", new Date().toISOString()); // Ensure consistency

    relatedImages.forEach((image) => {
      formPayload.append("relatedImages", image.file); // Use 'relatedImages' to match backend
    });

    if (thumbnail) {
      formPayload.append("image", thumbnail.file); // Change key from 'thumbnail' to 'image'
    }

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        toast.success("Blog uploaded successfully! 🎉");

        // Reset form fields after successful submission
        setFormData({
          title: "",
          description: "",
          author: "",
          tags: "",
          blogContent: "",
        });
        setThumbnail(null);
        setRelatedImages([]);
        
      } else {
        toast.error("Failed to upload blog ❌");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (thumbnail) {
        URL.revokeObjectURL(thumbnail.preview);
      }
      relatedImages.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [thumbnail, JSON.stringify(relatedImages)]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className=" w-full mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main blog details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail Image
              </label>
              <div className="mt-1 flex flex-col items-center space-y-2">
                {thumbnail ? (
                  <div className="relative w-full">
                    <img
                      src={thumbnail.preview}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload thumbnail
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                required
                placeholder="web3, freelance, technology"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blog Content (HTML)
              </label>
              <textarea
                name="blogContent"
                required
                rows={6}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.blogContent}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Related Images Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <ImagePlus size={20} />
              Related Images (Optional)
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {relatedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`Related ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32">
                <PlusCircle size={24} className="text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Add image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleRelatedImagesChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700"
          >
            Create Blog Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
