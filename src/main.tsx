import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Day from "./pages/day/Day";
import Level from "./pages/level/Level";
import Levels from "./pages/levels/Levels";
import Quiz from "./pages/quiz/Quiz";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="levels">
            <Route index element={<Levels />} />
            <Route path=":level" element={<Level />} />
            <Route path=":level/days/:day" element={<Day />} />
            <Route path=":level/days/:day/quiz" element={<Quiz />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
