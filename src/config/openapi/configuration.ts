import { registerAs } from '@nestjs/config';

export default registerAs('openapi', () => ({
  name: process.env.OPENAPI_NAME,
  description: process.env.OPENAPI_DESCRIPTION,
  prefix: process.env.OPENAPI_PREFIX,
}));
