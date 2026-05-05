import { parse, print } from 'graphql';

export const formatJSON = (input: string, spacing: string | number = 2): string => {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, spacing);
  } catch (err) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }
};

export const formatGraphQL = (input: string): string => {
  try {
    const ast = parse(input);
    return print(ast);
  } catch (err) {
    throw new Error('Invalid GraphQL: ' + (err instanceof Error ? err.message : String(err)));
  }
};

export interface JWTData {
  header: any;
  payload: any;
  signature: string;
}

export const decodeJWT = (token: string): JWTData => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format: Token must have 3 parts separated by dots.');
    }

    const [headerB64, payloadB64, signature] = parts;

    const decode = (b64: string) => {
      try {
        const json = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
      } catch (e) {
        return { error: 'Failed to decode base64' };
      }
    };

    return {
      header: decode(headerB64),
      payload: decode(payloadB64),
      signature,
    };
  } catch (err) {
    throw new Error('Invalid JWT: ' + (err instanceof Error ? err.message : String(err)));
  }
};
