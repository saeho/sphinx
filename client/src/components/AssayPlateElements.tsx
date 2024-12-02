import { cn } from '@/platform-agnostic/utils/string';
import { memo } from 'react';
import { Icon } from '@/components/Icon';
import './AssayPlateElements.css';
import i18n from '@/platform-agnostic/i18n/index';
import type { AssayPlateWellObj } from '@/typescript/assayPlateTypes';

/**
 * Types
 */

interface AssayPlatesContainerProps {
  notReady: boolean;
  children: React.ReactNode;
  className?: string;
}

interface APNavItemObj {
  id: string;
  isTitle?: boolean;
  text: string
}

interface APNavItemProps extends APNavItemObj {
  selected: boolean;
  setSelectedId: (id: string | null) => void;
  onDelete?: (id: string) => void;
}

interface AssayPlatesNavigationProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  navItems: APNavItemObj[];
  onCreateNew?: () => void;
  onDelete?: (id: string) => void;
}

interface AssayPlateWellsHeaderProps {
  columns: number;
}

interface AssayPlateWellsProps {
  data: AssayPlateWellObj[];
  setData: (data: AssayPlateWellObj[]) => void;
  x: number;
  y: number;
}

interface AssayPlateWellRowProps {
  data: AssayPlateWellObj[];
  setData: (data: AssayPlateWellObj[]) => void;
  row: number;
  columns: number;
}

/**
 * Navigation item
 */

const APNavItem = memo((p: APNavItemProps) => {
  const { id, selected, setSelectedId, text, isTitle, onDelete } = p;

  if (isTitle) {
    return <div className='ap_nav_item p_t'>
      <strong className='ap_nav_title ellip'>
        {text}
      </strong>
    </div>;
  }

  return <div
    role='button'
    className={cn('ap_nav_item h_item p_t_h', selected ? 'sel' : '')}
    onClick={() => setSelectedId(id)}
  >
    <span className='ellip'>
      {text}
    </span>

    {!onDelete ? null
    : <button onClick={() => onDelete(id)}>
      <Icon name='trash-x' />
    </button>}
  </div>;
});

APNavItem.displayName = 'APNavItem';

/**
 * Navigation
 */

export const AssayPlatesNavigation = memo((p: AssayPlatesNavigationProps) => {
  const { selectedId, setSelectedId, navItems, onCreateNew, onDelete } = p;

  return <nav className='ap_nav p_s'>
    {navItems.map((item) =>
      <APNavItem
        key={item.id}
        {...item}
        selected={item.id === selectedId}
        setSelectedId={setSelectedId}
        onDelete={onDelete}
      />
    )}
    {!onCreateNew ? null
    : <div
      role='button'
      className='ap_nav_item p_t'
      onClick={onCreateNew}
    >
      + {i18n.t('assay_plates.new_plate')}
    </div>}
  </nav>;
});

AssayPlatesNavigation.displayName = 'AssayPlatesNavigation';

/**
 * Container
 */

export function AssayPlatesContainer(p: AssayPlatesContainerProps) {
  const { children, className, notReady } = p;

  if (notReady) {
    return <div className='p_l'>
      Loading...
    </div>;
  }

  return <main className={cn('ap_container', className)}>
    {children}
  </main>;
}

/**
 * Assay plate wells header
 */

const AssayPlateWellsHeader = memo((p: AssayPlateWellsHeaderProps) => {
  const { columns } = p;

  return [...Array(columns + 1)].map((_, x) => (
    <div className='ap_well' key={x}>
      {x ? x : ''}
    </div>
  ));
});

AssayPlateWellsHeader.displayName = 'AssayPlateWellsHeader';

/**
 * Assay plate well; row
 */

const AssayPlateWellRow = memo((p: AssayPlateWellRowProps) => {
  const { row, columns, data, setData } = p;
  const rowLetter = String.fromCharCode(65 + row);

  return [...Array(columns + 1)].map((_, x) => (
    <div
      key={x}
      className='ap_well'
    >
      {x
      ? rowLetter + x
      : <strong>
        {rowLetter}
      </strong>}
    </div>
  ));
});

AssayPlateWellRow.displayName = 'AssayPlateWellRow';

/**
 * Assay plate wells
 */

export const AssayPlateWells = memo((p: AssayPlateWellsProps) => {
  const { data, setData } = p;
  const x = p.x || 12;
  const y = p.y || 8;

  return <section className='ap_wells_cnt'>
    <AssayPlateWellsHeader
      columns={x}
    />
    {[...Array(y)].map((_, y) => (
      <AssayPlateWellRow
        key={y}
        row={y}
        columns={x}
        data={data}
        setData={setData}
      />
    ))}
  </section>;
});

AssayPlateWells.displayName = 'AssayPlateWells';
