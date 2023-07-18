import { IPlatformConfig } from '@common/interfaces';
import {
  AppleConfigType,
  FacebookConfigType,
  GitHubConfigType,
  GoogleConfigType,
} from '@common/types';
import { ConfigCore } from '@core';

class PlatformConfig extends ConfigCore implements IPlatformConfig {
  apple!: AppleConfigType;
  facebook!: FacebookConfigType;
  github!: GitHubConfigType;
  google!: GoogleConfigType;

  init() {
    this.apple = {
      url: this.set<string>('APPLE_URL', this.schema.string().required()),
    };

    this.facebook = {
      url: this.set<string>('FACEBOOK_URL', this.schema.string().required()),
      fields: this.set<string>(
        'FACEBOOK_FIELDS',
        this.schema.string().required(),
      ),
    };

    this.github = {
      url: this.set<string>('GITHUB_URL', this.schema.string().required()),
    };

    this.google = {
      clientId: this.set<string>(
        'GOOGLE_CLIENT_ID',
        this.schema.string().required(),
      ),
    };
  }
}

export default new PlatformConfig();
