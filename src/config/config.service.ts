import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string = `${process.env.NODE_ENV || 'development'}.env`) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      MONGODB_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      IDS_AUTH_URL: Joi.string().required(),
      IDS_VALIDATE_URL: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`❌配置验证出错，请检查配置文件: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get mongodbUri(): string {
    return String(this.envConfig.MONGODB_URI);
  }

  get idsAuthUrl(): string {
    return String(this.envConfig.IDS_AUTH_URL);
  }

  get idsValidatedUrl(): string {
    return String(this.envConfig.IDS_VALIDATE_URL);
  }

  get jwtSecret(): string {
    return String(this.envConfig.JWT_SECRET);
  }
}