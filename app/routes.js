import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("events/new", "routes/novaUdalost.jsx"),
  route("events/:id", "routes/editaceUdalosti.jsx"),
];
