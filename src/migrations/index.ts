import * as migration_20261020_012733_initial from './20261020_012733_initial';
import * as migration_20261020_021817_localization from './20261020_021817_localization';

export const migrations = [
  {
    up: migration_20261020_012733_initial.up,
    down: migration_20261020_012733_initial.down,
    name: '20261020_012733_initial',
  },
  {
    up: migration_20261020_021817_localization.up,
    down: migration_20261020_021817_localization.down,
    name: '20261020_021817_localization'
  },
];
