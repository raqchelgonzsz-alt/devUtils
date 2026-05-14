import { parse, print } from 'graphql';

export const formatJSON = (input: string, spacing: string | number = 2): string => {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, spacing);
  } catch (err) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }
};

export const minifyJSON = (input: string): string => {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
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

export const minifyGraphQL = (input: string): string => {
  try {
    const ast = parse(input);
    // basic minification by removing extra whitespace but keeping it valid
    return print(ast).replace(/\s+/g, ' ').replace(/\s*([\{\}\(\)\:\[\]\,])\s*/g, '$1').trim();
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
      const base64 = b64.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json);
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
