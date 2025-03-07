#!/usr/bin/env python3
import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    parser = argparse.ArgumentParser(description='Start a simple HTTP server with CORS enabled.')
    parser.add_argument('-p', '--port', type=int, default=8000, help='Port number to listen on.')
    args = parser.parse_args()

    try:
        httpd = HTTPServer(('0.0.0.0', args.port), CORSRequestHandler)
        print(f'Serving HTTP on port {args.port}...')
        httpd.serve_forever()
    except OSError as e:
        print(f"Error: Could not start server on port {args.port}: {e}")
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    main()