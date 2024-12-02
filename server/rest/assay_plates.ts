import type { AssayPlateObj } from '../typescript/assayPlateTypes.ts';

/**
 * In-memory data
 */

let PRIMARY_KEY = 1;
let MEMORY_ARR: AssayPlateObj[] = [];

/**
 * Types
 */

interface ListAssayPlatesArgs {
  limit: number;
}

interface DeleteAssayPlateArgs {
  assayPlateId: string;
}

/**
 * List Assay Plates
 */

export function listAssayPlates(args: ListAssayPlatesArgs): AssayPlateObj[] {

  return MEMORY_ARR;
}

/**
 * Create an Assay Plate
 */

export function createAssayPlate(): AssayPlateObj {

  const newPlate = {
    id: (PRIMARY_KEY++).toString(),
    wells: []
  };

  MEMORY_ARR.push(newPlate);

  return newPlate;
}

/**
 * Delete an Assay Plate
 */

export function deleteAssayPlate(args: DeleteAssayPlateArgs, xyz): boolean {

  const { assayPlateId } = args;
  MEMORY_ARR = MEMORY_ARR.filter((plate) => plate.id !== assayPlateId);

  return true;
}