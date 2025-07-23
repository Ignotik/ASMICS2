import axios from "axios";
import React from "react";
import { baseUrl } from "../../utils/consts/url-backend";
import { useUserStore } from "../../utils/store/UserStore";
import { FaBan } from "react-icons/fa";
import type { User } from "../../utils/types/user";

const UserPanel: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const { users, setUsers } = useUserStore();
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      setError("User not found");
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const banUser = async (id: number) => {
    try {
      await axios.post(
        `${baseUrl}/users/${id}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Обновляем данные после бана
      if (user?.id === id) {
        fetchUserById(id);
      }
      fetchAllUsers();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  return (
    <section className="p-2 space-y-4">
      <article className="flex gap-2 items-center">
        <input
          className="bg-[#0ea5e9] p-2 w-full rounded-xl focus:outline-none"
          type="text"
          placeholder="Поиск пользователя по айди"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => fetchUserById(Number(search))}
          className="bg-[#10b981] p-2 px-4 rounded-[5px] hover:bg-[#059669] transition-colors"
        >
          Найти
        </button>
      </article>

      {user ? (
        <article className="p-2 rounded-xl flex justify-between items-center bg-[#075985]">
          <div className="flex gap-4 items-center">
            <p>ID: {user.id}</p>
            <p>NAME: {user.first_name}</p>
            <p>BALANCE: {user.balance}Р</p>
          </div>
          <FaBan
            onClick={() => banUser(user.id)}
            color="red"
            size={30}
            className="cursor-pointer hover:opacity-80"
          />
        </article>
      ) : (
        <p>{error}</p>
      )}

      <article>
        <button
          className="bg-[#10b981] rounded-[5px] mb-4 p-2 hover:bg-[#059669] transition-colors"
          onClick={fetchAllUsers}
        >
          Получить всех пользователей
        </button>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              className="p-2 rounded-xl flex justify-between items-center bg-[#075985]"
              key={user.id}
            >
              <div className="flex gap-4 items-center">
                <p>ID: {user.id}</p>
                <p>NAME: {user.first_name}</p>
                <p>BALANCE: {user.balance}Р</p>
              </div>
              <FaBan
                onClick={() => banUser(user.id)}
                color="red"
                size={30}
                className="cursor-pointer hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default UserPanel;
