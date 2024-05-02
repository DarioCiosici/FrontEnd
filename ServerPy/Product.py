from DBManager import connect
import mysql.connector
class Product:
    def __init__(self, id, nome, prezzo, marca):
        self.id = id
        self.nome = nome
        self.prezzo = prezzo
        self.marca = marca
    
    @property
    def id(self):
        return self._id
    @property
    def nome(self):
        return self._nome
    @nome.setter
    def nome(self, value):
        self._nome = value
    @property
    def prezzo(self):
        return self._prezzo
    @prezzo.setter
    def prezzo(self, value):
        self._prezzo = value
    @property
    def marca(self):
        return self._marca
    @marca.setter
    def marca(self, value):
        self._marca = value

    def fetchAll(): #metodo per la fetch di ogni prodotto
        try: 
            db_manager = connect("192.168.2.200", 3306, "ciosici_dario", "Scythians.lutes.gregariousnesss.", "ciosici_dario_ecommerce5E") 
            conn = db_manager.connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products") #query 
            records = cursor.fetchall()
            conn.close()
            return records
        except mysql.connector.Error as e:
            print("Errore durante la ricerca dei prodotti:", str(e))
            
    def find(id): #metodo per ricerca di un prodotto con l'id
        try:
            #creo la connessione con il database
            db_manager = connect("192.168.2.200", 3306, "ciosici_dario", "Scythians.lutes.gregariousnesss.", "ciosici_dario_ecommerce5E") 
            conn = db_manager.connection()
            #creo un cursore e eseguo la query
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products WHERE id = %s", (id,)) 
            product = cursor.fetchone()
            conn.close()
            if product:
                """
                print(row)
                return Product(row[0], row[1], row[2], row[3])
                """
                return product
            else:
                return None
        except mysql.connector.Error as e:
            print("Errore durante la ricerca del prodotto:", str(e))
            
    def create(product_data): #metodo per la creazione di un prodotto 
        try:
            db_manager = connect("192.168.2.200", 3306, "ciosici_dario", "Scythians.lutes.gregariousnesss.", "ciosici_dario_ecommerce5E") 
            conn = db_manager.connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO products (nome, prezzo, marca) VALUES (%s, %s, %s)", (product_data['nome'], product_data['prezzo'], product_data['marca']))
            conn.commit()
            product_id = cursor.lastrowid
            conn.close()
            new_product = {
                'id':product_id,
                'attributes':{
                'marca': product_data['marca'],
                'nome': product_data['nome'],
                'prezzo': product_data['prezzo']
                }
            }
            
            return new_product
        except mysql.connector.Error as e:
            print("Errore durante la creazione del prodotto:", str(e))

    def update(product_data): #metodo per la patch di un prodotto
        try:
            db_manager = connect("192.168.2.200", 3306, "ciosici_dario", "Scythians.lutes.gregariousnesss.", "ciosici_dario_ecommerce5E") 
            conn = db_manager.connection()
            cursor = conn.cursor()
            bind = (product_data["marca"], product_data["prezzo"], product_data["nome"], product_data["id"])
            cursor.execute("UPDATE products SET marca = %s, prezzo = %s, nome = %s WHERE id = %s", bind)
            conn.commit()
            conn.close()
        except mysql.connector.Error as e:
            print("Errore durante l'aggiornamento del prodotto:", str(e))
            
    def delete(product): #metodo per la delete i un prodotto
        try:
            db_manager = connect("192.168.2.200", 3306, "ciosici_dario", "Scythians.lutes.gregariousnesss.", "ciosici_dario_ecommerce5E") 
            conn = db_manager.connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM products WHERE id = %s", (product[0], ))
            conn.commit()
            conn.close()
        except mysql.connector.Error as e:
            print("Errore durante l'eliminazione del prodotto:", str(e))
