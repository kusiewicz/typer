import { useAuth } from "~/features/auth/hooks/useAuth";

export const LogoutButton = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      onClick={handleLogout}
      className="text-white hover:text-gray-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Logout
    </button>
  );
};
