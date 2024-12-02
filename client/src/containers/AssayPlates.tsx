'use client';

import { useEffect } from 'react';
import { AssayPlatesContainer, AssayPlatesNavigation, AssayPlateWells } from '@/components/AssayPlateElements';
import { composeAssayPlates, composeCreateDeleteAssayPlate } from '@/platform-agnostic/data-api/AssayPlatesCmp.tsx';
import i18n from '@/platform-agnostic/i18n/index';
import type { AssayPlateObj, AssayPlateWellObj } from '@/typescript/assayPlateTypes';
import { memo, useMemo, useState } from 'react';

/**
 * Types
 */

interface AssayPlatesAppProps {
  assayPlates: AssayPlateObj[];
  refetch: () => void;
}

interface AssayPlateBodyProps {
  wells: AssayPlateWellObj[];
}

/**
 * Navigation
 */

const AssayPlatesNavigationWithData = composeCreateDeleteAssayPlate((p: any) => {
  const { createAssayPlate, deleteAssayPlate } = p;

  const onCreateNew = () => {
    createAssayPlate();
  };

  const onDelete = (assayPlateId: string) => {
    deleteAssayPlate({
      assayPlateId
    });
  };

  return <AssayPlatesNavigation
    {...p}
    onDelete={onDelete}
    onCreateNew={onCreateNew}
  />;
});

/**
 * Assay plates; Main body of the app
 */

const AssayPlateBody = memo((p: AssayPlateBodyProps) => {
  const { wells } = p;
  const [data, setData] = useState<AssayPlateWellObj[]>([]);
  // assayPlate

  useEffect(() => {
    setData(wells || []);
  }, [wells]);

  return <AssayPlateWells
    data={data}
    setData={setData}
  />;
});

AssayPlateBody.displayName = 'AssayPlateBody';

/**
 * Assay plates; App
 */

const AssayPlatesApp = memo((p: AssayPlatesAppProps) => {
  const { assayPlates, refetch } = p;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navItems = useMemo(() => {
    return [{
      id: 'title',
      text: i18n.t('assay_plates.assay_plates'),
      isTitle: true,
    }].concat((assayPlates || []).map((ap) => ({
      id: ap.id,
      text: `ID: ${ap.id}`,
      isTitle: false
    })));
  }, [assayPlates]);

  const selectedPlate = assayPlates?.find((ap) => ap.id === selectedId);

  return (
    <AssayPlatesContainer notReady={!assayPlates}>
      <AssayPlatesNavigationWithData
        navItems={navItems}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onCompleted={refetch}
      />
      {!selectedPlate ? null
      : <AssayPlateBody
        key={selectedPlate.id}
        wells={selectedPlate.wells}
      />}
    </AssayPlatesContainer>
  );
});

AssayPlatesApp.displayName = 'AssayPlatesApp';

export default composeAssayPlates(AssayPlatesApp);
