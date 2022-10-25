import { OutgoingHttpHeaders } from 'http2';
import * as https from 'https';

export async function request<T>(
  url: string,
  method: string,
  data?: any,
  headers?: OutgoingHttpHeaders
) {
  return new Promise<T>((resolve, reject) => {
    const req = https.request(
      url,
      {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          console.log(typeof chunk);
          body += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', (e) => {
      reject(e);
    });
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}
