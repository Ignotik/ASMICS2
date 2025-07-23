import React from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

interface ChangeModalProps {
  handleChangeSubmit: (e: React.FormEvent, id: number) => void;
  formData: {
    name: string;
    icon_path: File | null;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  isLoading: boolean;
  teamId: number | null;
  onClose: () => void;
}

const ChangeTeamModal: React.FC<ChangeModalProps> = ({
  handleChangeSubmit,
  formData,
  handleInputChange,
  handleFileChange,
  preview,
  isLoading,
  teamId,
  onClose,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    if (teamId) {
      handleChangeSubmit(e, teamId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#075985] rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl  font-bold mb-4">Изменить команду</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Название команды
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Изображение
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-100 p-2 rounded flex items-center gap-2 text-sm">
                <FaUpload />
                <span>Выберите файл</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-white hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeTeamModal;
