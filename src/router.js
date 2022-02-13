import DetaiList from "./pages/home/DetaiList";
import DetailMovie from "./pages/home/DetailMovie";
import Home from "./pages/home/Home";

const router = [
  { path: "/*", component: <Home /> },
  { path: "/home/list", component: <DetaiList /> },
  { path: "/home/list/detail", component: <DetailMovie /> },
];
export default router;
