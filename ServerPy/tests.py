import pytest
from Product import Product
def sample_product_data():
    return {'nome': 'TestProduct', 'prezzo': 100, 'marca': 'TestBrand'}

def test_create_product(sample_product_data):#Create return a DICT
    created_product = Product.create(sample_product_data)
    assert isinstance(created_product, dict)
    assert 'id' in created_product
    assert isinstance(created_product['id'], int)

def test_find_product():
    found_product = Product.find(1)
    assert found_product is not None
    assert isinstance(found_product, tuple)#return a tuple

def test_fetch_all_products():
    all_products = Product.fetchAll()
    assert isinstance(all_products, list)
    for product in all_products:
        assert isinstance(product, tuple)#return a list of tuples

def test_update_product(sample_product_data):
    created_product = Product.create(sample_product_data)
    created_product['prezzo'] = 200 
    Product.update(created_product)
    
    updated_product = Product.find(created_product['id'])
    assert updated_product is not None
    assert isinstance(updated_product, tuple)
    assert updated_product[2] == 200  #price is 2

def test_delete_product(sample_product_data):
    created_product = Product.create(sample_product_data)
    Product.delete(created_product['id'])
    deleted_product = Product.find(created_product['id'])
    assert deleted_product is None
