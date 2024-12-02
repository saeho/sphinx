'use client';

import { useQuery, useMutation } from './apiClient';

/**
 * Compose; assay plates API
 */

export function composeAssayPlates(Cmp: React.FC<any>) {
  return function AssayPlatesCmp(p: any) {

    const { onCompleted } = p;
    const [{ data, loading }, refetch] = useQuery('assay_plates', {
      onCompleted,
    });

    return <Cmp
      {...p}
      assayPlates={data}
      loading={loading}
      refetch={refetch}
    />;
  }
}

/**
 * Compose create assay plate API
 */

export function composeCreateDeleteAssayPlate(Cmp: React.FC<any>) {
  return function CreateDeleteAssayPlateCmp(p: any) {

    const { onCompleted } = p;
    const [createAssayPlate, { mutating: creating }] = useMutation('assay_plates', {
      onCompleted,
    });

    const [deleteAssayPlate, { mutating: deleting }] = useMutation('assay_plates', {
      onCompleted,
    }, 'DELETE');

    return <Cmp
      {...p}
      createAssayPlate={createAssayPlate}
      deleteAssayPlate={deleteAssayPlate}
      creating={creating}
      deleting={deleting}
    />;
  }
}
