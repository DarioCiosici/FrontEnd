import json
from http.server import BaseHTTPRequestHandler, HTTPServer #importo le librerie 
from Product import Product

class RequestHandler(BaseHTTPRequestHandler):
    
    def _set_response(self, status_code=200, content_type='application/json'):
        self.send_response(status_code)
        self.send_header('Content-type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods','HEAD, GET, POST, PUT, PATCH, DELETE')
        self.end_headers()

    def do_GET(self):
        if self.path == '/products':
            self.get_products()
        elif self.path.startswith('/products/'):
            parts = self.path.split('/')
            product_id = int(parts[2])
            self.get_product(product_id)
        else:
            self.send_error(404, 'Not Found')

    def get_products(self):
        products = Product.fetchAll()
        json_temp2 = []
        i = 0
        for r in products:
            json_temp = {"type":"products", "id": str(r[0]), "attributes":{"nome": r[1], "marca":r[3], "prezzo":r[2]}}
            json_temp2.append(json_temp)
        jsondata = {"data":json_temp2}
        jsondata = json.dumps(jsondata)
        print(jsondata)
        self._set_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.wfile.write(jsondata.encode('utf-8'))

    def get_product(self, product_id):
        product = Product.find(product_id)
        if product is not None:
            jsondata={"data": {"type": "products", "id": product[0], "attributes":{"nome": product[1], "marca":product[3], "prezzo":product[2]}}}
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(jsondata).encode('utf-8'))
            print(jsondata)
        else:
            self.send_error(404, 'Product Not Found')
            
    def do_POST(self):
        if self.path == '/products':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            self.create_product(post_data)
        else:
            self.send_error(404, 'Not Found')

    def create_product(self, post_data):
        try:
            data = json.loads(post_data)
            if 'marca' not in data or 'nome' not in data or 'prezzo' not in data:
                self.send_error(400, 'Bad Request - Incomplete Data')
                return
            
            new_product = {
                'marca': data['marca'],
                'nome': data['nome'],
                'prezzo': data['prezzo']
            }
            product = Product.create(new_product)
            self._set_response(status_code=201)
            self.wfile.write(product)
        except json.JSONDecodeError:
            self.send_error(400, 'Bad Request - Invalid JSON')
      
    def do_DELETE(self):
        if self.path.startswith('/products/'):
            parts = self.path.split('/')
            product_id = int(parts[2])
            product = Product.find(product_id)
            if product:
                self.delete_product(product)
            else:
                self.send_error(404, 'Product Not Found')
        else:
            self.send_error(404, 'Not Found')
            
    def do_OPTIONS(self):
        self.send_response(200,"ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE,OPTION')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With')
        self.end_headers()
    
    def delete_product(self, product):
        try:
            product = Product.delete(product)
            self.send_response(204)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()  
        except Exception as e:
            self.send_error(500, f'Internal Server Error: {str(e)}')


    def do_PATCH(self):
        if self.path.startswith('/products/'):
            parts = self.path.split('/')
            product_id = int(parts[2])
            product = Product.find(product_id)
            if product:
                self.update_product(product)
            else:
                self.send_error(404, 'Product Not Found')
        else:
            self.send_error(404, 'Not Found')


            
    def update_product(self, product):
        try:
            parts = self.path.split('/')
            product_id = int(parts[2])
            content_length = int(self.headers['Content-Length'])
            patch_data = self.rfile.read(content_length)
            data = json.loads(patch_data.decode())
            print(data)
            if 'marca' not in data:
                self.send_error(400, 'Bad Request - Incomplete Data')
                return
            new_product = {
                'marca': data['marca']
            }
            new_product = {'id':product_id, 'marca': data['marca'], "prezzo": data["prezzo"], "nome": data["nome"]}
            product = Product.update(new_product)
            product = Product.find(product_id)
            jsondata = json.dumps({"data": {"type": "products", "id": product[0], "attributes":{"nome": product[1], "marca":product[2], "prezzo":product[3]}}})
            self._set_response(status_code=200)
            self.wfile.write(jsondata.encode('utf-8'))
        except Exception as e:
            self.send_error(500, f'Internal Server Error: {str(e)}')
        
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8081):
    server_address = ('localhost', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
