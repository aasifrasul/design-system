#!/usr/bin/env python3
import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import mimetypes

class CORSRequestHandler(SimpleHTTPRequestHandler):
	routes = {
		'/ProgressBars': 'progressBars.html',
		'/ModalPopup': 'ModalPopup.html',
		'/CustomButton': 'CustomButton.html',
		'/Slider': 'slider.html',
		'/': 'index.html',
		# Add more routes here...
	}

	def end_headers(self):
		mime, _ = mimetypes.guess_type(filename)
		self.send_header('Content-type', mime or 'application/octet-stream')
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
		self.send_header('Access-Control-Allow-Headers', '*')
		super().end_headers()

	def do_GET(self):
		if self.path in self.routes:
			self.serve_specific_html(self.routes[self.path])
		else:
			super().do_GET()

	def do_OPTIONS(self):
	    self.send_response(200)
	    self.send_header('Access-Control-Allow-Origin', '*')
	    self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
	    self.send_header('Access-Control-Allow-Headers', '*')
	    self.end_headers()

	def serve_specific_html(self, filename):
		try:
			with open(filename, 'rb') as f:
				self.send_response(200)
				self.send_header('Content-type', 'text/html')
				self.end_headers()
				self.wfile.write(f.read())
		except FileNotFoundError:
			self.send_response(404)
			self.send_header('Content-type', 'text/plain')
			self.end_headers()
			self.wfile.write(b'File not found')
		except Exception as e:
			self.send_response(500)
			self.send_header('Content-type', 'text/plain')
			self.end_headers()
			self.wfile.write(f'Internal server error: {e}'.encode())

	def log_message(self, format, *args):
		print("%s - - [%s] %s" %
			(self.client_address[0],
			self.log_date_time_string(),
			format%args))

def main():
	parser = argparse.ArgumentParser(description='Start a simple HTTP server with CORS enabled.')
	parser.add_argument('-p', '--port', type=int, default=8000, help='Port number to listen on.')
	args = parser.parse_args()

	try:
		httpd = HTTPServer(('127.0.0.1', args.port), CORSRequestHandler)
		print(f'Serving HTTP on port {args.port}...')
		httpd.serve_forever()
	except OSError as e:
		print(f"Error: Could not start server on port {args.port}: {e}")
	except KeyboardInterrupt:
		print("\nServer stopped.")

if __name__ == '__main__':
	main()