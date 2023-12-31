import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CalculatorView } from "./views/calculator.view";
import { FrontPageView } from "./views/front-page.view";
import { PlantsView } from "./views/plants.view";
import { ContaminantsView } from "./views/contaminants.view";
import { MaterialsView } from "./views/materials.view";
import { TopMenu } from "./components/top-menu";
import { PlantDetailView } from "./views/detail-views/plant-detail-view";
import { ContaminantDetailView } from "./views/detail-views/contaminant-detail-view";
import { MaterialDetailView } from "./views/detail-views/material-detail-view";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TopMenu />
        <Routes>
          <Route index element={<FrontPageView />} />
          <Route path="/plants" element={<PlantsView />} />
          <Route path="/plants/:id" element={<PlantDetailView />} />
          <Route path="/contaminants" element={<ContaminantsView />} />
          <Route path="/contaminants/:id" element={<ContaminantDetailView />} />
          <Route path="/materials" element={<MaterialsView />} />
          <Route path="/materials/:id" element={<MaterialDetailView />} />
          <Route path="/calculator" element={<CalculatorView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
