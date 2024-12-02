import Polyglot from 'node-polyglot';
import assay_plates from './assay_plates.ts';

const i18n = new Polyglot();

const en = {
  assay_plates: assay_plates.en,
};

i18n.extend(en);

export default i18n;
