
export interface AssayPlateWellObj {
  reagent: string;
  antibody: string[];
  concentration: number;
}

export interface AssayPlateObj {
  id: string;
  position: string; // A1, A2, A3, etc.
  wells: AssayPlateWellObj[];
}
