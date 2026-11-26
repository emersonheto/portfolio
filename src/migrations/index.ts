import * as migration_20261020_012733_initial from './20261020_012733_initial';
import * as migration_20261020_021817_localization from './20261020_021817_localization';
import * as migration_20261020_042319_add_portuguese_locale from './20261020_042319_add_portuguese_locale';
import * as migration_20261126_021725_reset_password_requested_at_and_locale_indexes from './20261126_021725_reset_password_requested_at_and_locale_indexes';

export const migrations = [
  {
    up: migration_20261020_012733_initial.up,
    down: migration_20261020_012733_initial.down,
    name: '20261020_012733_initial',
  },
  {
    up: migration_20261020_021817_localization.up,
    down: migration_20261020_021817_localization.down,
    name: '20261020_021817_localization',
  },
  {
    up: migration_20261020_042319_add_portuguese_locale.up,
    down: migration_20261020_042319_add_portuguese_locale.down,
    name: '20261020_042319_add_portuguese_locale',
  },
  {
    up: migration_20261126_021725_reset_password_requested_at_and_locale_indexes.up,
    down: migration_20261126_021725_reset_password_requested_at_and_locale_indexes.down,
    name: '20261126_021725_reset_password_requested_at_and_locale_indexes'
  },
];
