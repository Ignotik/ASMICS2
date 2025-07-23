import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useCardPackStore } from "../../utils/store/CardPackStore";
import type { CardCollection } from "../../utils/types/cards";
import axios from "axios";
import { baseUrl } from "../../utils/consts/url-backend";

interface FormData {
  name: string;
  price: string;
  description: string;
  icon: File | null;
}

const CardPackPanel: React.FC = () => {
  const { createCardCollection, isLoading } = useCardPackStore();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    icon: null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const GetAllCollections = () => {
    const responce = axios.get(`${baseUrl}/card-collections`);
    console.log(responce);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, icon: file });

      // Создаем превью изображения
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.icon) {
      formDataToSend.append("icon", formData.icon);
    }

    try {
      await createCardCollection(formDataToSend as unknown as CardCollection);
      setFormData({
        name: "",
        price: "",
        description: "",
        icon: null,
      });
      setPreview(null);
      alert("Набор успешно создан!");
    } catch (error) {
      alert("Ошибка при создании карточки" + error);
    }
  };

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Создание набора карточек</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Название набора</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Цена</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Изображение</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-100 p-2 rounded flex items-center gap-2">
              <FaUpload />
              <span>Выберите файл</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
            {preview && (
              <div className="w-20 h-20 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Создание..." : "Создать набор"}
        </button>
      </form>
      <button
        type="submit"
        onClick={GetAllCollections}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
      >
        Получить все наборы
      </button>
    </section>
  );
};

export default CardPackPanel;
