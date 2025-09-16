import { Outlet } from "react-router";

export const ClientLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { token } = useAuthStore();
//   const { user } = useAuthStore();
//   const queryClient = useQueryClient();
//   const { initializeMQTT } = useMqttStore();
//   useEffect(() => {
//     if (!user) return;

//     if (user.role === "business") {
//       NiceModal.hide(BusinessModal);

//       if (location.pathname === "/profile/register-business") {
//         navigate("/profile");
//       }
//     }

//     if (user.rank === "none") {
//       if (location.pathname.startsWith("/profile/exam/")) {
//         navigate("/profile");
//       }
//     }
//   }, [user, location.pathname, navigate]);

//   useEffect(() => {
//     initializeMQTT(queryClient);
//   }, [user, queryClient, initializeMQTT]);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token, navigate]);

  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default ClientLayout;
