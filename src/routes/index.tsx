import { BrowserRouter } from "react-router";
import RenderRouter from "./RenderRouter.tsx";
import NiceModal from "@ebay/nice-modal-react";

const Routes = () => {
  return (
    <BrowserRouter>
      <NiceModal.Provider>
        <RenderRouter />
      </NiceModal.Provider>
    </BrowserRouter>
  );
};

export default Routes;